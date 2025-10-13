"use client";

import { type Account } from "@/types/account";
import { UserProfile } from "@/types/user-profile";
import { useTransition } from "react";
import { useSettingsReducer } from "../hooks/use-settings-reducer";
import SettingsProvider from "../providers/settings";
import { SettingsBody } from "./settings-body";
import { SettingsHeader } from "./settings-header";

interface Props {
  user: UserProfile;
  accounts: Account[];
}

const SettingsContent = ({ user, accounts }: Props) => {
  const [isPending, startTransition] = useTransition();
  const { state, dispatch } = useSettingsReducer();

  return (
    <SettingsProvider
      user={user}
      accounts={accounts}
      state={state}
      dispatch={dispatch}
      isLoading={isPending}
      startTransition={startTransition}
    >
      <SettingsHeader />
      <SettingsBody />
    </SettingsProvider>
  );
};

export default SettingsContent;
