import { LucideProps, Tablet } from "lucide-react";

type Props = Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>;

export const TabletIcon = ({ ...props }: Props) => {
  return <Tablet {...props} />;
};
