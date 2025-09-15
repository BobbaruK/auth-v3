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
  email: string;
  url: string;
}

const ConfirmEmail = ({ name, email, url }: Props) => {
  return (
    <Html lang="en" dir="ltr">
      <Tailwind>
        <Head />
        <Preview>Confirm your email address - Action required</Preview>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] p-[32px] max-w-[600px] mx-auto">
            <Section>
              <Text className="text-[24px] font-bold text-gray-900 mb-[24px] text-center">
                Confirm Your Email Address
              </Text>

              <Text className="text-[16px] text-gray-700 mb-[24px] leading-[24px]">
                Hello {name},
              </Text>

              <Text className="text-[16px] text-gray-700 mb-[24px] leading-[24px]">
                Thank you for signing up! To complete your registration and
                start using your account, please confirm your email address by
                clicking the button below.
              </Text>

              <Section className="text-center mb-[32px]">
                <Button
                  href={url}
                  className="bg-blue-600 text-white px-[32px] py-[12px] rounded-[8px] text-[16px] font-semibold no-underline box-border">
                  Confirm Email Address
                </Button>
              </Section>

              <Text className="text-[14px] text-gray-600 mb-[24px] leading-[20px]">
                If the button above doesn&apos;t work, you can also copy and
                paste the following link into your browser:
              </Text>

              <Text className="text-[14px] text-blue-600 mb-[32px] break-all">
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
                  This confirmation link will expire in 24 hours for security
                  reasons. If you didn&apos;t create an account with us, you can
                  safely ignore this email.
                </Text>
              </Section>

              <Text className="text-[16px] text-gray-700 mb-[32px] leading-[24px]">
                Best regards,
                <br />
                Admin
              </Text>
            </Section>

            <Hr className="border-gray-300 mb-[24px]" />

            <Section>
              <Text className="text-[12px] text-gray-500 leading-[16px] m-0 text-center">
                This email was sent to {email}. If you have any questions,
                please contact our support team.
              </Text>
              <Text className="text-[12px] text-gray-500 text-center m-0 mb-[8px]">
                Pablo SCSSescobar, In the Cloud.
              </Text>
              <Text className="text-[12px] text-gray-500 text-center m-0">
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

export default ConfirmEmail;
