import { UserRole } from "@/generated/prisma";
import { createAccessControl } from "better-auth/plugins/access";
import { adminAc, defaultStatements } from "better-auth/plugins/admin/access";

const statement = {
  ...defaultStatements,
  users: [
    "create",
    "read",
    "update",
    "delete",
    "update:own",
    "delete:own",
    "delete:admin",
  ],
} as const;

export const ac = createAccessControl(statement);

export const roles = {
  [UserRole.USER]: ac.newRole({
    users: ["create", "read", "update:own", "delete:own"],
  }),
  [UserRole.ADMIN]: ac.newRole({
    ...adminAc.statements,
    users: ["create", "read", "update", "delete", "update:own", "delete:own"],
  }),
  [UserRole.OWNER]: ac.newRole({
    ...adminAc.statements,
    users: [
      "create",
      "read",
      "update",
      "delete",
      "update:own",
      "delete:own",
      "delete:admin",
    ],
  }),
};
