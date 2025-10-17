"use client";

import { CustomAvatar } from "@/components/custom-avatar";
import { Badge } from "@/components/ui/badge";
import { SelectCell } from "@/core/table/components/select-column/cell";
import { SelectHeader } from "@/core/table/components/select-column/header";
import { THeadDropdown } from "@/core/table/components/thead-dropdown";
import { capitalizeFirstLetter } from "@/lib/utils/capitalize-first-letter";
import { columnId } from "@/lib/utils/column-id";
import { dateFormatter } from "@/lib/utils/format-date";
import { UserSession } from "@/types/session";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { TransitionStartFunction } from "react";
import AdminActions from "./admin-actions";

export const userColumns = ({
  isLoading,
  startTransition,
  visibleUsers,
}: {
  isLoading: boolean;
  startTransition: TransitionStartFunction;
  visibleUsers: UserSession[];
}): ColumnDef<UserSession>[] => [
  // Select
  {
    ...columnId({ id: "select" }),
    enableHiding: false,
    header: () => {
      return (
        <SelectHeader
          data={visibleUsers}
          isLoading={isLoading}
          startTransition={startTransition}
        />
      );
    },
    cell: ({ row }) => {
      const id = row.original.id;

      return (
        <SelectCell
          id={id}
          isLoading={isLoading}
          startTransition={startTransition}
        />
      );
    },
  },
  // Avatar
  {
    ...columnId({ id: "avatar" }),
    accessorFn: (originalRow) => originalRow.name.toLowerCase(),
    enableSorting: false,
    enableHiding: false,
    header: "Avatar",
    cell: ({ row }) => {
      const image = row.original.image;
      const userId = row.original.id;

      return (
        <div className="flex flex-col gap-2">
          <Link
            className="flex h-auto items-center justify-start gap-2 p-0 hover:cursor-pointer"
            href={`/profile/${userId}`}
          >
            <CustomAvatar image={image} />
          </Link>
        </div>
      );
    },
  },
  // First Name
  {
    ...columnId({ id: "firstName" }),
    accessorFn: (originalRow) => originalRow.firstName.toLowerCase(),
    enableHiding: false,
    header: () => {
      return (
        <THeadDropdown
          id="firstName"
          label={"First name"}
          isLoading={isLoading}
          startTransition={startTransition}
        />
      );
    },

    cell: ({ row }) => {
      const firstName = row.original.firstName;
      const userId = row.original.id;

      return (
        <div className="flex flex-col gap-2">
          <Link
            className="flex h-auto items-center justify-start gap-2 p-0 hover:cursor-pointer"
            href={`/profile/${userId}`}
          >
            {firstName}
          </Link>
        </div>
      );
    },
  },
  // Last Name
  {
    ...columnId({ id: "lastName" }),
    accessorFn: (originalRow) => originalRow.lastName.toLowerCase(),
    enableHiding: false,
    header: () => {
      return (
        <THeadDropdown
          id="lastName"
          label={"Last name"}
          isLoading={isLoading}
          startTransition={startTransition}
        />
      );
    },

    cell: ({ row }) => {
      const lastName = row.original.lastName;
      const userId = row.original.id;

      return (
        <div className="flex flex-col gap-2">
          <Link
            className="flex h-auto items-center justify-start gap-2 p-0 hover:cursor-pointer"
            href={`/profile/${userId}`}
          >
            {lastName}
          </Link>
        </div>
      );
    },
  },
  // Username
  {
    ...columnId({ id: "username" }),
    accessorFn: (originalRow) => originalRow.username,
    header: () => {
      return (
        <THeadDropdown
          id="username"
          label={"Username"}
          isLoading={isLoading}
          startTransition={startTransition}
        />
      );
    },

    cell: ({ row }) => {
      const displayUsername = row.original.displayUsername;
      const userId = row.original.id;

      return (
        <Link
          className="flex h-auto items-center justify-start gap-2 p-0 hover:cursor-pointer"
          href={`/profile/${userId}`}
        >
          {displayUsername || "-"}
        </Link>
      );
    },
  },
  // Email
  {
    ...columnId({ id: "email" }),
    accessorFn: (originalRow) => originalRow.email,
    enableHiding: false,
    header: () => {
      return (
        <THeadDropdown
          id="email"
          label={"Email"}
          isLoading={isLoading}
          startTransition={startTransition}
        />
      );
    },

    cell: ({ row }) => {
      const email = row.original.email;

      return (
        <Link
          className="flex h-auto items-center justify-start gap-2 p-0 hover:cursor-pointer"
          href={`mailto:${email}`}
        >
          {email || "-"}
        </Link>
      );
    },
  },
  // Role
  {
    ...columnId({ id: "role" }),
    accessorFn: (originalRow) => originalRow.role,
    header: () => {
      return (
        <THeadDropdown
          id="role"
          label={"Role"}
          isLoading={isLoading}
          startTransition={startTransition}
        />
      );
    },

    cell: ({ row }) => {
      const role = row.original.role;

      return role ? <Badge variant="info">{role}</Badge> : "-";
    },
  },
  // 2FA Enabled
  {
    ...columnId({ id: "twoFaEnabled" }),
    accessorFn: (originalRow) => originalRow.twoFactorEnabled,
    header: () => {
      return (
        <THeadDropdown
          id="twoFaEnabled"
          label={"2FA Enabled"}
          isLoading={isLoading}
          startTransition={startTransition}
        />
      );
    },

    cell: ({ row }) => {
      const twoFaEnabled = row.original.twoFactorEnabled;

      return (
        <Badge variant={twoFaEnabled ? "success" : "danger"}>
          {twoFaEnabled ? "YES" : "NO"}
        </Badge>
      );
    },
  },
  // Email Verified
  {
    ...columnId({ id: "emailVerified" }),
    accessorFn: (originalRow) => originalRow.emailVerified,
    header: () => {
      return (
        <THeadDropdown
          id="emailVerified"
          label={"Email Verified"}
          isLoading={isLoading}
          startTransition={startTransition}
        />
      );
    },

    cell: ({ row }) => {
      const emailVerified = row.original.emailVerified;

      return (
        <Badge variant={emailVerified ? "success" : "warning"}>
          {emailVerified ? "Verified" : "Unverified"}
        </Badge>
      );
    },
  },
  // Banned
  {
    ...columnId({ id: "banned" }),
    accessorFn: (originalRow) => originalRow.banned,
    header: () => {
      return (
        <THeadDropdown
          id="banned"
          label={"Banned"}
          isLoading={isLoading}
          startTransition={startTransition}
        />
      );
    },

    cell: ({ row }) => {
      const banned = row.original.banned;

      return (
        <Badge variant={banned ? "danger" : "success"}>
          {banned ? "YES" : "NO"}
        </Badge>
      );
    },
  },
  // Ban reason
  {
    ...columnId({ id: "banReason" }),
    accessorFn: (originalRow) => originalRow.banReason,
    header: () => {
      return (
        <THeadDropdown
          id="banReason"
          label={"Ban reason"}
          isLoading={isLoading}
          startTransition={startTransition}
        />
      );
    },

    cell: ({ row }) => {
      const banReason = row.original.banReason;

      return (
        <div className="flex h-auto items-center justify-start gap-2 p-0">
          {banReason || "-"}
        </div>
      );
    },
  },
  // Ban expires
  {
    ...columnId({ id: "banExpires" }),
    accessorFn: (originalRow) => originalRow.banExpires,
    sortingFn: "datetime",
    sortDescFirst: false,
    header: () => {
      return (
        <THeadDropdown
          id="banExpires"
          label={"Ban expires"}
          isLoading={isLoading}
          startTransition={startTransition}
        />
      );
    },
    cell: ({ getValue }) => {
      const date = getValue() as Date | null;
      return date
        ? dateFormatter({
            date,
            options: {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            },
          })
        : "-";
    },
  },
  // Created At
  {
    ...columnId({ id: "createdAt" }),
    accessorFn: (originalRow) => originalRow.createdAt,
    sortingFn: "datetime",
    sortDescFirst: false,
    header: () => {
      return (
        <THeadDropdown
          id="createdAt"
          label={"Created At"}
          isLoading={isLoading}
          startTransition={startTransition}
        />
      );
    },
    cell: ({ getValue }) => {
      const date = getValue() as Date | null;
      return date
        ? dateFormatter({
            date,
            options: {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            },
          })
        : "-";
    },
  },
  // Last login at
  {
    ...columnId({ id: "lastLoginAt" }),
    accessorFn: (originalRow) => originalRow.lastLoginAt,
    sortingFn: "datetime",
    sortDescFirst: false,
    header: () => {
      return (
        <THeadDropdown
          id="lastLoginAt"
          label={"Last login at"}
          isLoading={isLoading}
          startTransition={startTransition}
        />
      );
    },
    cell: ({ getValue }) => {
      const date = getValue() as Date | null;
      return date
        ? dateFormatter({
            date,
            options: {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            },
          })
        : "-";
    },
  },
  // Last login method
  {
    ...columnId({ id: "lastLoginMethod" }),
    accessorFn: (originalRow) => originalRow.lastLoginMethod,
    header: () => {
      return (
        <THeadDropdown
          id="lastLoginMethod"
          label={"Last login method"}
          isLoading={isLoading}
          startTransition={startTransition}
        />
      );
    },
    cell: ({ row }) => {
      return capitalizeFirstLetter(row.original.lastLoginMethod || "");
    },
  },
  // Actions
  {
    ...columnId({ id: "actions" }),
    enableHiding: false,
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="grid place-items-center p-2">
          <AdminActions user={user} />
        </div>
      );
    },
  },
];
