import { LucideProps, Watch } from "lucide-react";

type Props = Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>;

export const WatchIcon = ({ ...props }: Props) => {
  return <Watch {...props} />;
};
