import * as React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
  Tailwind,
  Link,
  Preview,
} from "@react-email/components";

interface Props {
  name: string;
  oldMail: string;
  newMail: string;
  url: string;
}

const ChangeEmailTemplate = ({ name, newMail, oldMail, url }: Props) => {
  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Preview>Confirm your new email address - Action required</Preview>
        <Body className="bg-gray-100 py-[40px] font-sans">
          <Container className="mx-auto max-w-[600px] rounded-[8px] bg-white p-[32px]">
            <Section>
              <Text className="mb-[24px] text-center text-[24px] font-bold text-gray-900">
                Confirm Your New Email Address
              </Text>

              <Text className="mb-[24px] text-[16px] leading-[24px] text-gray-700">
                Hello {name},
              </Text>

              <Text className="mb-[24px] text-[16px] leading-[24px] text-gray-700">
                You recently requested to change your email address from{" "}
                <strong>{oldMail}</strong> to <strong>{newMail}</strong>. To
                complete this change and ensure the security of your account,
                please confirm your new email address by clicking the button
                below.
              </Text>

              <Section className="mb-[32px] text-center">
                <Button
                  href={url}
                  className="box-border rounded-[8px] bg-blue-600 px-[32px] py-[12px] text-[16px] font-semibold text-white no-underline"
                >
                  Confirm New Email Address
                </Button>
              </Section>

              <Text className="mb-[24px] text-[14px] leading-[20px] text-gray-600">
                If the button above doesn&apos;t work, you can also copy and
                paste the following link into your browser:
              </Text>

              <Text className="mb-[32px] text-[14px] break-all text-blue-600">
                <Link href={url} className="text-blue-600 no-underline">
                  {url}
                </Link>
              </Text>

              {/* Security Notice */}
              <Section className="mb-[24px] rounded-[6px] bg-gray-50 p-[16px]">
                <Text className="m-0 mb-[8px] text-[14px] leading-[20px] font-semibold text-gray-700">
                  🔒 Important Security Information
                </Text>
                <Text className="m-0 mb-[8px] text-[14px] leading-[20px] text-gray-600">
                  • This confirmation link will expire in 24 hours for security
                  reasons
                </Text>
                <Text className="m-0 mb-[8px] text-[14px] leading-[20px] text-gray-600">
                  • Your old email address will remain active until you confirm
                  the new one
                </Text>
                <Text className="m-0 text-[14px] leading-[20px] text-gray-600">
                  • If you didn&apos;t request this change, please contact
                  support immediately
                </Text>
              </Section>

              <Text className="mb-[32px] text-[16px] leading-[24px] text-gray-700">
                Best regards,
                <br />
                Admin
              </Text>
            </Section>

            <Hr className="mb-[24px] border-gray-300" />

            <Section>
              <Text className="m-0 text-center text-[12px] leading-[16px] text-gray-500">
                This email was sent to {newMail}. If you have any questions,
                please contact our support team.
              </Text>
              <Text className="m-0 mb-[8px] text-center text-[12px] text-gray-500">
                Pablo SCSSescobar, In the Cloud.
              </Text>
              <Text className="m-0 text-center text-[12px] text-gray-500">
                © {new Date().getFullYear()} Pablo SCSSescobar. All rights
                reserved. |
                <Link href="#" className="ml-[4px] text-gray-500 underline">
                  Unsubscribe
                </Link>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ChangeEmailTemplate;
