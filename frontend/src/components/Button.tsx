import React from "react";

const Button = ({
  children,
  variant,
  style,
  onClick,
  noArrow,
  disabled,
}: {
  children: any;
  variant: string;
  style?: object;
  onClick?: Function;
  noArrow?: boolean;
  disabled?: boolean;
}) => {
  return (
    <button
      className={`est-btn ${variant}`}
      style={style}
      onClick={() => onClick && onClick()}
      disabled={disabled}
    >
      {children}
      {!variant.includes("filled-pink") && !noArrow ? (
        <svg
          width="27"
          height="9"
          viewBox="0 0 27 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M26.3536 4.85355C26.5488 4.65829 26.5488 4.34171 26.3536 4.14645L23.1716 0.964466C22.9763 0.769204 22.6597 0.769204 22.4645 0.964466C22.2692 1.15973 22.2692 1.47631 22.4645 1.67157L25.2929 4.5L22.4645 7.32843C22.2692 7.52369 22.2692 7.84027 22.4645 8.03553C22.6597 8.2308 22.9763 8.2308 23.1716 8.03553L26.3536 4.85355ZM0 5H26V4H0V5Z"
            fill={
              variant === "pink"
                ? "#E288A3"
                : variant === "white"
                ? "#fff"
                : undefined
            }
          />
        </svg>
      ) : null}
    </button>
  );
};

export default Button;
