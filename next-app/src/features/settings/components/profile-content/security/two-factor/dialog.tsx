"use client";

import { Prisma } from "@/generated/prisma";
import { useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import TwoFactorActivation from "./activation";
import TwoFactorBackupCodes from "./backup-codes";
import TwoFactorScanQR from "./scan-qr";

interface Props {
  user: Prisma.auth_userGetPayload<{
    include: {
      accounts: {
        select: {
          providerId: true;
        };
      };
    };
  }>;
}

export const TwoFactorDialog = ({ user }: Props) => {
  const [openActivate2faDialog, setOpenActivate2faDialog] = useState(false);
  const [openScanQR, setOpenScanQR] = useState(false);
  const [openBackupCodes, setOpenBackupCodes] = useState(false);
  const [totpURI, setTotpURI] = useState("");
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <>
      <TwoFactorActivation
        isDesktop={isDesktop}
        openActivate2faDialog={openActivate2faDialog}
        setOpenActivate2faDialog={setOpenActivate2faDialog}
        setOpenScanQR={setOpenScanQR}
        setTotpURI={setTotpURI}
        emitBackupCodes={setBackupCodes}
        user={user}
      />

      <TwoFactorScanQR
        totpURI={totpURI}
        isDesktop={isDesktop}
        openScanQR={openScanQR}
        setOpenScanQR={setOpenScanQR}
        setOpenBackupCodes={setOpenBackupCodes}
        user={user}
      />

      <TwoFactorBackupCodes
        backupCodes={backupCodes}
        openBackupCodes={openBackupCodes}
        setOpenBackupCodes={setOpenBackupCodes}
      />
    </>
  );
};
