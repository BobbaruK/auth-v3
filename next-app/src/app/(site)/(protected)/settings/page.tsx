import { PageStructure } from "@/components/page-structure";
import { SettingsForm } from "@/features/settings/components/settings-form";

const ProfilePage = () => {
  return (
    <PageStructure>
      <h1 className="text-3xl font-bold">Settings</h1>

      <SettingsForm />
    </PageStructure>
  );
};

export default ProfilePage;
