"use client";

import { CustomButton } from "@/components/custom-button";
import ResponsiveDialog from "@/components/responsive-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BATCH_ITEMS } from "@/constants/misc";
import { unbanUser } from "@/core/admin/actions/ban-user";
import { chunkArray } from "@/lib/utils/chunk-array";
import { TableRowSelect } from "@/types/table-row-select";
import { lazy, Suspense, TransitionStartFunction, useState } from "react";
import { toast } from "sonner";
import { useCopyToClipboard } from "usehooks-ts";
import DeleteUser from "../../delete-user";
import { BanUserFormSkeleton } from "../../forms/ban-user";
const BanUserForm = lazy(
  () => import("@/core/admin/components/forms/ban-user"),
);

interface Props {
  dataSelected: TableRowSelect;
  isLoading: boolean;
  startTransition: TransitionStartFunction;
}

const PaginationActions = ({
  dataSelected,
  isLoading,
  startTransition,
}: Props) => {
  const [copiedText, copy] = useCopyToClipboard();
  const [openBanDialog, setOpenBanDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const userIdBatches = chunkArray(dataSelected?.data || [], BATCH_ITEMS);

  const handleCopy = (text: string) => () => {
    if (!text) {
      toast.error("Nothing to copy");
      return;
    }

    copy(text)
      .then(() => {
        toast.success("Copied", {
          description: <div className="line-clamp-1">{copiedText || text}</div>,
        });
      })
      .catch((error) => {
        if (error instanceof Error) console.error(error.message);

        toast.error("Failed to copy!");
      });
  };

  const handleUnban = () => {
    startTransition(async () => {
      for (const batch of userIdBatches) {
        const results = (await Promise.allSettled(
          batch.map((user) => unbanUser(user)),
        )) as {
          status: string;
          value: {
            error?: string;
            success?: string;
          };
        }[];

        for (const result of results) {
          // console.log(result.value);

          if (result.value.error) toast.error(result.value.error);
          if (result.value.success) toast.success(result.value.success);
        }

        // console.log("Batch done:", results);
        await new Promise((r) => setTimeout(r, 200));
      }
    });
  };

  return (
    <>
      <ResponsiveDialog
        open={openBanDialog}
        setOpen={setOpenBanDialog}
        trigger={{
          type: "label",
          label: "Ban",
          hidden: true,
        }}
        header={{
          title: {
            label: "Ban user(s)",
          },
        }}
      >
        <Suspense fallback={<BanUserFormSkeleton />}>
          <BanUserForm
            users={dataSelected?.data || []}
            isLoading={isLoading}
            startTransition={startTransition}
            setOpenBanDialog={setOpenBanDialog}
          />
        </Suspense>
      </ResponsiveDialog>

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
              disabled={isLoading}
              onClick={() => setOpenDeleteDialog(true)}
            />
          ),
          hidden: true,
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
          users={dataSelected?.data || []}
          isLoading={isLoading}
          startTransition={startTransition}
          setOpenDeleteDialog={setOpenDeleteDialog}
        />
      </ResponsiveDialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <CustomButton
            buttonLabel="Actions"
            size={"sm"}
            variant={"outline"}
            className="h-8"
            disabled={isLoading}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem
            onClick={handleCopy(
              dataSelected?.data?.map((user) => user.id).join("\n") || "",
            )}
          >
            Copy id(s)
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="danger"
            onClick={() => setOpenBanDialog(true)}
          >
            Ban
          </DropdownMenuItem>
          <DropdownMenuItem variant="warning" onClick={handleUnban}>
            Unban
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            onClick={() => setOpenDeleteDialog(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default PaginationActions;
