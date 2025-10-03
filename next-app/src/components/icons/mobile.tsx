import { LucideProps, Smartphone } from "lucide-react";

type Props = Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>;

export const MobileIcon = ({ ...props }: Props) => {
  return <Smartphone {...props} />;
};
