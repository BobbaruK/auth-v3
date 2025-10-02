import { IconBaseProps } from "react-icons/lib";
import { MdErrorOutline } from "react-icons/md";

export const ErrorIcon = ({ ...props }: IconBaseProps) => {
  return <MdErrorOutline {...props} />;
};
