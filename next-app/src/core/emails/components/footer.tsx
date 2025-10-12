import { Hr, Section, Text } from "@react-email/components";
import React from "react";

interface Props {
  email: string;
}

const FooterEmail = ({ email }: Props) => {
  return (
    <>
      <Hr className="mb-[24px] border-gray-300" />
      <Section>
        <Text className="m-0 text-center text-[12px] leading-[16px] text-gray-500">
          If you have any questions, please contact our support team.
        </Text>
        <Text className="m-0 mb-[8px] text-center text-[12px] text-gray-500">
          This email was sent to <strong>{email}</strong>.
        </Text>
        <Text className="m-0 text-center text-[12px] text-gray-500">
          © {new Date().getFullYear()} Auth v3. All rights reserved.
        </Text>
      </Section>
    </>
  );
};

export default FooterEmail;
