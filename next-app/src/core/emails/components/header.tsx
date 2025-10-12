import { Heading } from "@react-email/components";

const HeaderEmail = ({ title }: { title: string }) => {
  return (
    <Heading as="h1" className="text-center font-bold text-gray-900">
      {title}
    </Heading>
  );
};

export default HeaderEmail;
