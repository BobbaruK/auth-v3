import { Section, Text } from "@react-email/components";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const SecurityNotice = ({ children }: Props) => {
  return (
    <Section className="mb-[24px] rounded-[6px] border-l-[4px] border-red-500 bg-red-50 p-[16px]">
      <Text className="m-0 mb-[8px] text-[14px] leading-[20px] font-bold text-gray-700">
        Security Notice
      </Text>

      {children}
    </Section>
  );
};

export default SecurityNotice;
