import { CustomButton } from "@/components/custom-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { PAGINATION_ARR } from "@/constants/table";
import { banUser, unbanUser } from "@/core/auth/actions/ban-user";
import { useSearchParams } from "@/hooks/use-search-params";
import { chunkArray } from "@/lib/utils/chunk-array";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { toast } from "sonner";
import { useCopyToClipboard } from "usehooks-ts";
import { useTableContext } from "../providers/table-provider";

export function DataTablePagination() {
  const { dataCount, isLoading, startTransition, dataSelected } =
    useTableContext();
  const [{ pageSize, pageIndex, selected }, setSearchParams] =
    useSearchParams(startTransition);
  const [copiedText, copy] = useCopyToClipboard();

  const totalPages = Math.ceil(dataCount / pageSize);

  const userIdBatches = chunkArray(dataSelected?.data || [], 2);

  const handleCopy = (text: string) => () => {
    copy(text);
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

  const handleBan = async () => {
    for (const batch of userIdBatches) {
      const results = (await Promise.allSettled(
        batch.map((user) => banUser(user)),
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
  };

  const handleUnban = async () => {
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
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {isLoading ? (
            <Skeleton className="h-5 w-40" />
          ) : selected.length > 0 ? (
            `${selected.length} of ${dataCount} row(s) selected`
          ) : (
            `${dataCount} row(s)`
          )}
        </div>
        {selected.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <CustomButton
                buttonLabel="Actions"
                size={"sm"}
                variant={"outline"}
                className="h-8"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem
                onClick={handleCopy(selected.map((id) => `${id}`).join("\n"))}
              >
                Copy id(s)
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem variant="destructive" onClick={handleBan}>
                Ban
              </DropdownMenuItem>
              <DropdownMenuItem variant="default" onClick={handleUnban}>
                Unban
              </DropdownMenuItem>
              <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => {
              setSearchParams({
                pageSize: parseInt(value),
                pageIndex: 0,
              });
            }}
            disabled={isLoading}
          >
            <SelectTrigger className="h-8 w-[80px]">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {PAGINATION_ARR.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {pageIndex + 1} of {totalPages}
        </div>
        <div className="flex items-center space-x-2">
          <CustomButton
            buttonLabel="Go to first page"
            variant="outline"
            icon={MdKeyboardDoubleArrowLeft}
            iconPlacement="left"
            size={"icon"}
            className="hidden size-8 h-8 w-8 min-w-fit p-0 lg:flex"
            onClick={() => {
              setSearchParams({ pageIndex: 0 });
            }}
            disabled={isLoading || pageIndex === 0}
          />
          <CustomButton
            buttonLabel="Go to previous page"
            variant="outline"
            icon={FaChevronCircleLeft}
            iconPlacement="left"
            size={"icon"}
            className="hidden size-8 h-8 w-8 min-w-fit p-0 lg:flex"
            onClick={() => {
              setSearchParams({ pageIndex: pageIndex - 1 });
            }}
            disabled={isLoading || pageIndex === 0}
          />
          <CustomButton
            buttonLabel="Go to next page"
            variant="outline"
            icon={FaChevronCircleRight}
            iconPlacement="left"
            size={"icon"}
            className="hidden size-8 h-8 w-8 min-w-fit p-0 lg:flex"
            onClick={() => {
              setSearchParams({ pageIndex: pageIndex + 1 });
            }}
            disabled={isLoading || pageIndex >= totalPages - 1}
          />
          <CustomButton
            buttonLabel="Go to last page"
            variant="outline"
            icon={MdKeyboardDoubleArrowRight}
            iconPlacement="left"
            size={"icon"}
            className="hidden size-8 h-8 w-8 min-w-fit p-0 lg:flex"
            onClick={() => {
              setSearchParams({ pageIndex: totalPages - 1 });
            }}
            disabled={isLoading || pageIndex >= totalPages - 1}
          />
        </div>
      </div>
    </div>
  );
}
