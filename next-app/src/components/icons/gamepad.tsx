import { Gamepad2, LucideProps } from "lucide-react";

type Props = Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>;

export const GamepadIcon = ({ ...props }: Props) => {
  return <Gamepad2 {...props} />;
};
