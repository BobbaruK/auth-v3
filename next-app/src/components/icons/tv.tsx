import { LucideProps, Tv } from "lucide-react";

type Props = Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>;

export const TVIcon = ({ ...props }: Props) => {
  return <Tv {...props} />;
};
