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

const ResetPasswordEmail = ({ email, name, url }: Props) => {
  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Preview>Reset your password - Action required</Preview>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] shadow-sm max-w-[600px] mx-auto p-[40px]">
            {/* Header */}
            <Section className="text-center mb-[32px]">
              <Heading className="text-[28px] font-bold text-gray-900 m-0 mb-[8px]">
                Reset Your Password
              </Heading>
              <Text className="text-[16px] text-gray-600 m-0">
                We received a request to reset your password
              </Text>
            </Section>

            {/* Main Content */}
            <Section className="mb-[32px]">
              <Text className="text-[16px] text-gray-700 leading-[24px] m-0 mb-[16px]">
                Hello {name},
              </Text>
              <Text className="text-[16px] text-gray-700 leading-[24px] m-0 mb-[16px]">
                We received a password reset request for your account associated
                with <strong>{email}</strong>. If you made this request, click
                the button below to reset your password.
              </Text>
              <Text className="text-[16px] text-gray-700 leading-[24px] m-0 mb-[24px]">
                This link will expire in 24 hours for security reasons.
              </Text>

              {/* Reset Button */}
              <Section className="text-center mb-[24px]">
                <Button
                  href={url}
                  className="bg-blue-600 text-white font-semibold py-[12px] px-[24px] rounded-[6px] text-[16px] no-underline box-border inline-block">
                  Reset My Password
                </Button>
              </Section>

              <Text className="text-[16px] text-gray-700 leading-[24px] m-0 mb-[16px]">
                If the button does not work, copy this link in your browser:
              </Text>
              <Text className="text-[14px] text-blue-600 leading-[20px] m-0 mb-[24px] break-all">
                <Link href={url} className="text-blue-600 no-underline">
                  {url}
                </Link>
              </Text>

              {/* Security Notice */}
              <Section className="bg-gray-50 p-[16px] rounded-[6px] mb-[24px]">
                <Text className="text-[14px] text-gray-700 leading-[20px] m-0 mb-[8px] font-semibold">
                  🔒 Security Notice
                </Text>
                <Text className="text-[14px] text-gray-600 leading-[20px] m-0">
                  If you didn&apos;t request this password reset, you can safely
                  ignore this email. Your password will remain unchanged, and no
                  action is required.
                </Text>
              </Section>

              <Text className="text-[16px] text-gray-700 leading-[24px] m-0">
                Best regards,
                <br />
                Admin
              </Text>
            </Section>

            <Hr className="border-gray-300 mb-[24px]" />

            {/* Footer */}
            <Section className="border-t border-gray-200 pt-[24px]">
              <Text className="text-[12px] text-gray-500 leading-[16px] m-0 text-center">
                This email was sent to {email}. If you have any questions,
                please contact our support team.
              </Text>
              <Text className="text-[12px] text-gray-500 leading-[16px] m-0 text-center mt-[8px]">
                © {new Date().getFullYear()} Pablo SCSSescobar. All rights
                reserved. |
                <a href="#" className="text-gray-500 underline ml-[4px]">
                  Unsubscribe
                </a>
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ResetPasswordEmail;
