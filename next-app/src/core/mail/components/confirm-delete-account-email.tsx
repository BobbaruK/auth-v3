import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface Props {
  name: string;
  email: string;
  url: string;
}

const DeleteAccountConfirmationEmail = ({ email, name, url }: Props) => {
  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Preview>Confirm account deletion - Action required</Preview>
        <Body className="bg-gray-100 py-[40px] font-sans">
          <Container className="mx-auto max-w-[600px] rounded-[8px] bg-white p-[40px] shadow-sm">
            {/* Header */}
            <Section className="mb-[32px] text-center">
              <Heading className="m-0 mb-[8px] text-[28px] font-bold text-gray-900">
                Confirm Account Deletion
              </Heading>
              <Text className="m-0 text-[16px] text-gray-600">
                We received a request to delete your account
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="mb-[32px]">
              <Text className="m-0 mb-[16px] text-[16px] leading-[24px] text-gray-700">
                Hello {name},
              </Text>
              <Text className="m-0 mb-[16px] text-[16px] leading-[24px] text-gray-700">
                We received a request to permanently delete your account
                associated with <strong>{email}</strong>. This action cannot be
                undone and will remove all your data, settings, and content.
              </Text>
              <Text className="m-0 mb-[24px] text-[16px] leading-[24px] text-gray-700">
                If you&apos;re sure you want to proceed, click the confirmation
                button below. This link will expire in 24 hours for security
                reasons.
              </Text>

              {/* Action Buttons */}
              <Section className="mb-[24px] text-center">
                <Button
                  href={url}
                  className="mr-[16px] box-border inline-block rounded-[6px] bg-red-600 px-[24px] py-[12px] text-[16px] font-semibold text-white no-underline"
                >
                  Yes, Delete My Account
                </Button>
              </Section>

              <Text className="m-0 mb-[16px] text-[16px] leading-[24px] text-gray-700">
                If the buttons do not work, copy these links in your browser:
              </Text>
              <Text className="m-0 mb-[8px] text-[14px] leading-[20px]">
                <strong>Confirm deletion:</strong>
              </Text>
              <Text className="m-0 mb-[16px] text-[14px] leading-[20px] break-all text-red-600">
                <Link href={url} className="text-red-600 no-underline">
                  {url}
                </Link>
              </Text>
              <Text className="m-0 mb-[8px] text-[14px] leading-[20px]">
                <strong>Cancel deletion:</strong>
              </Text>

              {/* Warning Notice */}
              <Section className="mb-[24px] rounded-[6px] border-l-[4px] border-red-500 bg-red-50 p-[16px]">
                <Text className="m-0 mb-[8px] text-[14px] leading-[20px] font-semibold text-red-700">
                  ⚠️ Important Warning
                </Text>
                <Text className="m-0 mb-[8px] text-[14px] leading-[20px] text-red-600">
                  Account deletion is permanent and cannot be reversed. You will
                  lose:
                </Text>
                <Text className="m-0 ml-[16px] text-[14px] leading-[20px] text-red-600">
                  • All your personal data and settings
                  <br />
                  • Your content and files
                  <br />
                  • Access to all services
                  <br />• Your account history
                </Text>
              </Section>

              {/* Security Notice */}
              <Section className="mb-[24px] rounded-[6px] bg-gray-50 p-[16px]">
                <Text className="m-0 mb-[8px] text-[14px] leading-[20px] font-semibold text-gray-700">
                  🔒 Security Notice
                </Text>
                <Text className="m-0 text-[14px] leading-[20px] text-gray-600">
                  If you didn&apos;t request this account deletion, please
                  contact our support team immediately. Someone may have
                  unauthorized access to your account.
                </Text>
              </Section>

              <Text className="m-0 text-[16px] leading-[24px] text-gray-700">
                We&apos;re sorry to see you go. If you have any feedback about
                your experience, we&apos;d love to hear from you.
              </Text>
              <Text className="m-0 mt-[16px] text-[16px] leading-[24px] text-gray-700">
                Best regards,
                <br />
                Admin
              </Text>
            </Section>

            <Hr className="mb-[24px] border-gray-300" />

            {/* Footer */}
            <Section className="border-t border-gray-200 pt-[24px]">
              <Text className="m-0 text-center text-[12px] leading-[16px] text-gray-500">
                This email was sent to {email}. If you have any questions,
                please contact our support team.
              </Text>
              <Text className="m-0 mt-[8px] text-center text-[12px] leading-[16px] text-gray-500">
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

export default DeleteAccountConfirmationEmail;
