import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Accounts from "./accounts";

const AccountLinkingTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Linking accounts</CardTitle>
        <CardDescription>
          Here you can link your 3rd party accounts.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Accounts />
      </CardContent>
    </Card>
  );
};

export default AccountLinkingTab;
