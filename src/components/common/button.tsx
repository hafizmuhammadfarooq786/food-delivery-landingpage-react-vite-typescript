import React from "react";
import { ButtonStatus } from "../../constants/appConstants";
import PlusIcon from "../../assets/plus.svg";

interface buttonProps {
  handleClick?: () => void;
  buttonText: string;
  buttonStatus: string;
  width?: number | string;
  height?: number;
  padding?: number;
  borderRadius?: number;
  buttonRef?: React.RefObject<HTMLButtonElement>;
  icon?: string;
  cursor?: string;
  bgColor?: string;
  border?: boolean;
  borderWidth?: number;
  borderColor?: string;
  borderStyle?: string;
}

const Button: React.FC<buttonProps> = ({
  handleClick,
  buttonText,
  buttonStatus,
  width,
  height,
  padding,
  borderRadius,
  buttonRef,
  icon,
  cursor,
  bgColor,
  border,
  borderWidth,
  borderColor,
  borderStyle,
}) => {
  return (
    <button
      type="button"
      disabled={buttonStatus !== ButtonStatus.Active}
      ref={buttonRef}
      style={{
        backgroundColor: bgColor,
        width: width,
        height: height,
        minHeight: height,
        padding: padding,
        borderRadius: borderRadius,
        cursor: cursor,
        border: border
          ? `${borderWidth}px ${borderStyle} ${borderColor}`
          : "none",
      }}
      onClick={handleClick}
    >
      {icon ? (
        <div className="row justifyCenter">
          <img src={PlusIcon} alt="icon" height={18} width={18} />
          {buttonText}
        </div>
      ) : (
        buttonText
      )}
    </button>
  );
};

export default Button;
