import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledButton = styled.button`
  position: relative;
  font-weight: 400;
  font-size: 1rem;
  line-height: 2;
  padding: 0.2rem;
  transition: all 200ms linear;
  border-radius: 4px;
  width: 18.75;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  align-self: center;
  border: none;
  cursor: pointer;
  outline: 0;
  &:hover {
    background-color: darken(0.2, ${({ theme }) => theme.colors.label});
  }

  svg {
    margin-right: 0.25rem;
  }
`;

const ButtonLoginModal = ({
  children,
  onClick,
  btnColor = "#B04AFF",
  labelColor,
  disabled,
  variant,
  style,
  ...props
}) => {
  const [hover, setHover] = useState(false);
  const toggleHover = () => {
    setHover(!hover);
  };

  const commonStyles = {
    backgroundColor: btnColor,
    color: labelColor || "white",
  };

  const loginStyle = {
    border: `1px solid ${btnColor}`,
    color: btnColor,
    backgroundColor: "white",
    width: "50%",
  };

  const loginHoverStyle = {
    border: `1px solid ${labelColor || "white"}`,
    color: labelColor || "white",
    width: "50%",
  };

  const disabledStyle = {
    cursor: "default",
    backgroundColor: btnColor,
    color: labelColor || "white",
    opacity: 0.4,
  };

  let btnStyle;

  switch (variant) {
    case "login":
      if (hover) {
        btnStyle = loginHoverStyle;
      } else {
        btnStyle = loginStyle;
      }
      break;
    default:
      btnStyle = {
        backgroundColor: btnColor,
        color: labelColor || "white",
        width: "90%",
      };
      break;
  }

  return (
    <StyledButton
      style={
        disabled
          ? { ...commonStyles, ...btnStyle, ...disabledStyle, ...style }
          : { ...commonStyles, ...btnStyle, ...style }
      }
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
      {...props}
      type="submit"
      onClick={!disabled ? onClick : () => {}}
    >
      {children || "button"}
    </StyledButton>
  );
};

ButtonLoginModal.propTypes = {
  btnColor: PropTypes.string,
  children: PropTypes.string,
  disabled: PropTypes.bool,
  labelColor: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.object,
  variant: PropTypes.string,
};

ButtonLoginModal.defaultProps = {
  btnColor: null,
  children: null,
  disabled: false,
  labelColor: null,
  onClick: null,
  style: {},
  variant: null,
};

export default ButtonLoginModal;
