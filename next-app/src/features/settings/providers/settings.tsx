"use client";

import { UserProfile } from "@/types/user-profile";
import {
  createContext,
  Dispatch,
  SetStateAction,
  TransitionStartFunction,
  useContext,
} from "react";

type SettingsContextType = {
  user: UserProfile;

  totpURI: string;
  setTotpURI: Dispatch<SetStateAction<string>>;
  backupCodes: string[];
  setBackupCodes: Dispatch<SetStateAction<string[]>>;
  isLoading: boolean;
  startTransition: TransitionStartFunction;

  openChangeEmailDialog: boolean;
  setOpenChangeEmailDialog: Dispatch<SetStateAction<boolean>>;
  openDeleteAccountDialog: boolean;
  setOpenDeleteAccountDialog: Dispatch<SetStateAction<boolean>>;
  openChangePasswordDialog: boolean;
  setOpenChangePasswordDialog: Dispatch<SetStateAction<boolean>>;
  openActivate2faDialog: boolean;
  setOpenActivate2faDialog: Dispatch<SetStateAction<boolean>>;
  openScanQRCodeDialog: boolean;
  setOpenScanQRCodeDialog: Dispatch<SetStateAction<boolean>>;
  openBackupCodesDialog: boolean;
  setOpenBackupCodesDialog: Dispatch<SetStateAction<boolean>>;
  openSessionsDialog: boolean;
  setOpenSessionsDialog: Dispatch<SetStateAction<boolean>>;
};

const SettingsContext = createContext<SettingsContextType>({
  user: {} as UserProfile,

  totpURI: "",
  setTotpURI: () => {},
  backupCodes: [],
  setBackupCodes: () => {},
  isLoading: false,
  startTransition: () => {},

  openChangeEmailDialog: false,
  setOpenChangeEmailDialog: () => {},
  openDeleteAccountDialog: false,
  setOpenDeleteAccountDialog: () => {},
  openChangePasswordDialog: false,
  setOpenChangePasswordDialog: () => {},
  openActivate2faDialog: false,
  setOpenActivate2faDialog: () => {},
  openScanQRCodeDialog: false,
  setOpenScanQRCodeDialog: () => {},
  openBackupCodesDialog: false,
  setOpenBackupCodesDialog: () => {},
  openSessionsDialog: false,
  setOpenSessionsDialog: () => {},
});

export const useSettingsContext = () => {
  return useContext(SettingsContext);
};

interface Props extends SettingsContextType {
  children: React.ReactNode;
}

export default function SettingsProvider({
  children,
  user,
  totpURI,
  setTotpURI,
  backupCodes,
  setBackupCodes,
  isLoading,
  startTransition,
  openChangeEmailDialog,
  setOpenChangeEmailDialog,
  openDeleteAccountDialog,
  setOpenDeleteAccountDialog,
  openChangePasswordDialog,
  setOpenChangePasswordDialog,
  openActivate2faDialog,
  setOpenActivate2faDialog,
  openScanQRCodeDialog,
  setOpenScanQRCodeDialog,
  openBackupCodesDialog,
  setOpenBackupCodesDialog,
  openSessionsDialog,
  setOpenSessionsDialog,
}: Props) {
  return (
    <SettingsContext.Provider
      value={{
        user,
        totpURI,
        setTotpURI,
        backupCodes,
        setBackupCodes,
        isLoading,
        startTransition,
        openChangeEmailDialog,
        setOpenChangeEmailDialog,
        openDeleteAccountDialog,
        setOpenDeleteAccountDialog,
        openChangePasswordDialog,
        setOpenChangePasswordDialog,
        openActivate2faDialog,
        setOpenActivate2faDialog,
        openScanQRCodeDialog,
        setOpenScanQRCodeDialog,
        openBackupCodesDialog,
        setOpenBackupCodesDialog,
        openSessionsDialog,
        setOpenSessionsDialog,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
