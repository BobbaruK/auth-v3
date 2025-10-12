import { Section, Text } from "@react-email/components";
import React from "react";

interface Props {
  time: string;
}

const SecurityNotice = ({ time }: Props) => {
  return (
    <Section className="mb-[24px] rounded-[6px] border-l-[4px] border-red-500 bg-red-50 p-[16px]">
      <Text className="m-0 mb-[8px] text-[14px] leading-[20px] font-bold text-gray-700">
        Security Notice
      </Text>
      <Text className="m-0 text-[14px] leading-[20px] text-gray-600">
        This confirmation link will expire in <strong>{time}</strong> for
        security reasons. If you didn&apos;t create an account with us, you can
        safely ignore this email.
      </Text>
    </Section>
  );
};

export default SecurityNotice;
