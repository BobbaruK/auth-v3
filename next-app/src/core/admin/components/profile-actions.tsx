"use client";

import { CustomButton } from "@/components/custom-button";
import { BanIcon } from "@/components/icons/ban";
import { ImpersonateIcon } from "@/components/icons/impersonate";
import { ShieldBanIcon } from "@/components/icons/shield-ban";
import { TrashIcon } from "@/components/icons/trash";
import { UnbanIcon } from "@/components/icons/unban";
import ResponsiveDialog from "@/components/responsive-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MESSAGES } from "@/constants/messages";
import { unbanUser } from "@/core/admin/actions/ban-user";
import { impersonateUser } from "@/core/admin/actions/impersonate-user";
import DeleteUser from "@/core/admin/components/delete-user";
import { BanUserFormSkeleton } from "@/core/admin/components/forms/ban-user";
import { useSession } from "@/lib/auth-client";
import { Session } from "@/types/session";
import { UserProfile } from "@/types/user-profile";
import { useRouter } from "next/navigation";
import { lazy, ReactNode, Suspense, useState, useTransition } from "react";
import { toast } from "sonner";
import { revokeUserSessions } from "../actions/revoke-sessions";
const BanUserForm = lazy(
  () => import("@/core/admin/components/forms/ban-user"),
);

interface Props {
  user: UserProfile;
  session: Session | null;
}

const ProfileActions = ({ user }: Props) => {
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

  const handleRevokeUserSessions = () => {
    startTransition(async () => {
      revokeUserSessions(user)
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

  return (
    <Card className="@container">
      <CardHeader className="flex flex-col flex-wrap justify-start gap-2">
        <CardTitle className="flex gap-2">Admin</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ProfileAdminRow label={"Impersonate"}>
          <CustomButton
            buttonLabel="Impersonate"
            icon={ImpersonateIcon}
            iconPlacement="left"
            size={"icon"}
            disabled={isPending}
            onClick={handleImpersonate}
          />
        </ProfileAdminRow>

        <ProfileAdminRow label={"Revoke sessions"}>
          <CustomButton
            buttonLabel="Revoke sessions"
            icon={ShieldBanIcon}
            iconPlacement="left"
            size={"icon"}
            variant={"warning"}
            disabled={isPending}
            onClick={handleRevokeUserSessions}
          />
        </ProfileAdminRow>

        <ProfileAdminRow label={user.banned ? "Unban" : "Ban"}>
          {user.banned ? (
            <CustomButton
              buttonLabel="Unban"
              icon={UnbanIcon}
              iconPlacement="left"
              size={"icon"}
              variant={"success"}
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
                      icon={BanIcon}
                      iconPlacement="left"
                      size={"icon"}
                      variant={"danger"}
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
        </ProfileAdminRow>

        <ProfileAdminRow label={"Delete"}>
          <ResponsiveDialog
            open={openDeleteDialog}
            setOpen={setOpenDeleteDialog}
            trigger={{
              type: "element",
              element: (
                <CustomButton
                  buttonLabel="Delete"
                  icon={TrashIcon}
                  iconPlacement="left"
                  size={"icon"}
                  variant={"destructive"}
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
        </ProfileAdminRow>
      </CardContent>
    </Card>
  );
};

export default ProfileActions;

function ProfileAdminRow({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <p>{label}</p>

      {children}
    </div>
  );
}
