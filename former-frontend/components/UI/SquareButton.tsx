import { PropsWithChildren } from "react";
interface SquareButtonProps extends PropsWithChildren {
  color: string;
}
const SquareButton = function ({ color, className, ...props }: any) {
  return (
    <button {...props} className="squareBtn" style={{ backgroundColor: color }}>
      {props.children}
    </button>
  );
};
export default SquareButton;
