import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
  pixelBasedPreset,
} from "@react-email/components";

interface EmailTemplateProps {
  name: string;
  url: string;
}

export function ConfirmEmail({ name, url }: EmailTemplateProps) {
  return (
    <Tailwind
      config={{
        presets: [pixelBasedPreset],
      }}>
      <Html>
        <Head />
        <Body>
          <Preview>Confirm your email address</Preview>
          <Container className="mx-auto">
            <Section className="mt-[30px]">
              {/* <Img
                src={`${baseUrl}/static/slack-logo.png`}
                width="120"
                height="36"
                alt="Slack"
              /> */}
            </Section>
            <Heading className="text-[36px] font-bold my-[30px] p-[0px] leading-[42px]">
              Welcome, {name}!
            </Heading>
            <Text className="text-[20px] leading-[28px] mb-8">
              Thank you for creating an account. To complete your registration
              and activate your account, please confirm your email address by
              clicking the button below:
            </Text>
            <Button
              className="box-border w-full rounded-[8px] bg-indigo-600 px-[12px] py-[12px] text-center font-semibold text-white mx-auto"
              href={url}>
              Confirm Email
            </Button>
            <Text className="mt-[30px]">
              If you didn&apos;t create this account, you can safely ignore this
              message.
            </Text>
            <Text className="mt-[30px]">
              Best regards, <br />
              Admin
            </Text>

            <Section>
              <Text className="text-[12px] leading-[15px] text-start mb-[50px]">
                ${new Date().getFullYear()} Pablo SCSSescobar. <br />
                In the cloud. <br />
                <br />
                All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
}
