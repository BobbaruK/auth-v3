"use client";

import { CustomButton } from "@/components/custom-button";
import ResponsiveDialog from "@/components/responsive-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MESSAGES } from "@/constants/messages";
import DeleteUser from "@/core/admin/components/delete-user";
import { unbanUser } from "@/core/auth/actions/ban-user";
import { impersonateUser } from "@/core/auth/actions/impersonate-user";
import { BanUserFormSkeleton } from "@/core/auth/components/forms/ban-user";
import { UserRole } from "@/generated/prisma";
import { useSession } from "@/lib/auth-client";
import { Session } from "@/types/session";
import { UserProfile } from "@/types/user-profile";
import { useRouter } from "next/navigation";
import { lazy, Suspense, useState, useTransition } from "react";
import { toast } from "sonner";
const BanUserForm = lazy(() => import("@/core/auth/components/forms/ban-user"));

interface Props {
  user: UserProfile;
  session: Session;
}

const AdminActions = ({ user, session }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [openBanDialog, setOpenBanDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const router = useRouter();
  const { refetch } = useSession();

  const handleUnBan = () => {
    startTransition(async () => {
      unbanUser(user)
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          }

          if (data.success) {
            toast.success(data.success);
          }
        })
        .catch(() => {
          toast.error(MESSAGES.SOMETHING_WRONG);
        });
    });
  };

  const handleImpersonate = () => {
    startTransition(async () => {
      impersonateUser(user)
        .then((data) => {
          if (data.error) {
            toast.error(data.error);
          }

          if (data.success) {
            toast.success(data.success);
            router.push("/");
            router.refresh();
            refetch();
          }
        })
        .catch(() => {
          toast.error(MESSAGES.SOMETHING_WRONG);
        });
    });
  };

  return (
    <Card className="@container">
      <CardHeader className="flex flex-col flex-wrap justify-start gap-2">
        <CardTitle className="flex gap-2">Admin</CardTitle>
      </CardHeader>
      <CardContent className="flex columns-3 gap-4 @max-sm:flex-wrap">
        {session?.user.role === UserRole.OWNER && (
          <CustomButton
            buttonLabel="Impersonate"
            variant={"outline"}
            className="w-full"
            disabled={isPending}
            onClick={handleImpersonate}
          />
        )}
        {user.banned ? (
          <CustomButton
            buttonLabel="Unban"
            variant={"warning"}
            className="w-full"
            disabled={isPending}
            onClick={handleUnBan}
          />
        ) : (
          <>
            <ResponsiveDialog
              open={openBanDialog}
              setOpen={setOpenBanDialog}
              trigger={{
                type: "element",
                element: (
                  <CustomButton
                    buttonLabel="Ban"
                    variant={"danger"}
                    className="w-full"
                    disabled={isPending}
                    onClick={() => setOpenBanDialog(true)}
                  />
                ),
                hidden: false,
              }}
              header={{
                title: {
                  label: "Ban user",
                },
              }}
            >
              <Suspense fallback={<BanUserFormSkeleton />}>
                <BanUserForm
                  users={[user]}
                  isLoading={isPending}
                  startTransition={startTransition}
                  setOpenBanDialog={setOpenBanDialog}
                />
              </Suspense>
            </ResponsiveDialog>
          </>
        )}

        <ResponsiveDialog
          open={openDeleteDialog}
          setOpen={setOpenDeleteDialog}
          trigger={{
            type: "element",
            element: (
              <CustomButton
                buttonLabel="Delete"
                variant={"destructive"}
                className="w-full"
                disabled={isPending}
                onClick={() => setOpenDeleteDialog(true)}
              />
            ),
            hidden: false,
          }}
          header={{
            title: {
              label: "Are you absolutely sure?",
            },
            description:
              "This action cannot be undone. This will permanently delete this account and remove it's data from our servers.",
          }}
        >
          <DeleteUser
            users={[user]}
            isLoading={isPending}
            startTransition={startTransition}
            setOpenDeleteDialog={(open) => {
              setOpenDeleteDialog(open);

              router.push("/users");
            }}
          />
        </ResponsiveDialog>
      </CardContent>
    </Card>
  );
};

export default AdminActions;
