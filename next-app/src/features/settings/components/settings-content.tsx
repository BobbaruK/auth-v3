"use client";

import { UserProfile } from "@/types/user-profile";
import { useState, useTransition } from "react";
import SettingsProvider from "../providers/settings";
import { SettingsBody } from "./settings-body";
import { SettingsHeader } from "./settings-header";

interface Props {
  user: UserProfile;
}

const SettingsContent = ({ user }: Props) => {
  const [totpURI, setTotpURI] = useState("");
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const [openChangeEmailDialog, setopenChangeEmailDialog] = useState(false);
  const [openDeleteAccountDialog, setOpenDeleteAccountDialog] = useState(false);
  const [openChangePasswordDialog, setOpenChangePasswordDialog] =
    useState(false);
  const [openActivate2faDialog, setOpenActivate2faDialog] = useState(false);
  const [openScanQRCodeDialog, setOpenScanQRCodeDialog] = useState(false);
  const [openBackupCodesDialog, setOpenBackupCodesDialog] = useState(false);

  return (
    <SettingsProvider
      user={user}
      totpURI={totpURI}
      setTotpURI={setTotpURI}
      backupCodes={backupCodes}
      setBackupCodes={setBackupCodes}
      isLoading={isPending}
      startTransition={startTransition}
      openChangeEmailDialog={openChangeEmailDialog}
      setOpenChangeEmailDialog={setopenChangeEmailDialog}
      openDeleteAccountDialog={openDeleteAccountDialog}
      setOpenDeleteAccountDialog={setOpenDeleteAccountDialog}
      openChangePasswordDialog={openChangePasswordDialog}
      setOpenChangePasswordDialog={setOpenChangePasswordDialog}
      openActivate2faDialog={openActivate2faDialog}
      setOpenActivate2faDialog={setOpenActivate2faDialog}
      openScanQRCodeDialog={openScanQRCodeDialog}
      setOpenScanQRCodeDialog={setOpenScanQRCodeDialog}
      openBackupCodesDialog={openBackupCodesDialog}
      setOpenBackupCodesDialog={setOpenBackupCodesDialog}
    >
      <SettingsHeader />
      <SettingsBody />
    </SettingsProvider>
  );
};

export default SettingsContent;
