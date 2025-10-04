"use client";

import { UserProfile } from "@/types/user-profile";
import {
  createContext,
  Dispatch,
  SetStateAction,
  TransitionStartFunction,
  useContext,
} from "react";

type ProfileContextType = {
  user: UserProfile;

  totpURI: string;
  setTotpURI: Dispatch<SetStateAction<string>>;
  backupCodes: string[];
  setBackupCodes: Dispatch<SetStateAction<string[]>>;
  isLoading: boolean;
  startTransition: TransitionStartFunction;

  openChangeEmailDialog: boolean;
  setOpenChangeEmailDialog: Dispatch<SetStateAction<boolean>>;
  openChangePasswordDialog: boolean;
  setOpenChangePasswordDialog: Dispatch<SetStateAction<boolean>>;
  openActivate2faDialog: boolean;
  setOpenActivate2faDialog: Dispatch<SetStateAction<boolean>>;
  openScanQRCodeDialog: boolean;
  setOpenScanQRCodeDialog: Dispatch<SetStateAction<boolean>>;
  openBackupCodesDialog: boolean;
  setOpenBackupCodesDialog: Dispatch<SetStateAction<boolean>>;
};

const ProfileContext = createContext<ProfileContextType>({
  user: {} as UserProfile,

  totpURI: "",
  setTotpURI: () => {},
  backupCodes: [],
  setBackupCodes: () => {},
  isLoading: false,
  startTransition: () => {},

  openChangeEmailDialog: false,
  setOpenChangeEmailDialog: () => {},
  openChangePasswordDialog: false,
  setOpenChangePasswordDialog: () => {},
  openActivate2faDialog: false,
  setOpenActivate2faDialog: () => {},
  openScanQRCodeDialog: false,
  setOpenScanQRCodeDialog: () => {},
  openBackupCodesDialog: false,
  setOpenBackupCodesDialog: () => {},
});

export const useProfileContext = () => {
  return useContext(ProfileContext);
};

interface Props extends ProfileContextType {
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
  openChangePasswordDialog,
  setOpenChangePasswordDialog,
  openActivate2faDialog,
  setOpenActivate2faDialog,
  openScanQRCodeDialog,
  setOpenScanQRCodeDialog,
  openBackupCodesDialog,
  setOpenBackupCodesDialog,
}: Props) {
  return (
    <ProfileContext.Provider
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
        openChangePasswordDialog,
        setOpenChangePasswordDialog,
        openActivate2faDialog,
        setOpenActivate2faDialog,
        openScanQRCodeDialog,
        setOpenScanQRCodeDialog,
        openBackupCodesDialog,
        setOpenBackupCodesDialog,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}
