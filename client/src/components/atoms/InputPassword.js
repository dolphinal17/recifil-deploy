import React, { useState, useRef } from "react";
import {InputGeneral, LabelInputError} from "../atoms/atoms.js"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark, faCircleNotch} from "@fortawesome/free-solid-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

const preventFn = (e) => {
    e.preventDefault();
    return false;
};
const preventSpaceFn = (e) => {
    if (e.key === ' ') {
        e.preventDefault();
        return false;
    }
};
const preventFocusFn = (e) => {
    if (e.relatedTarget) {
        e.relatedTarget.focus();
    } else {
        e.currentTarget.blur();
    }
};

const inputValidationStyle = (props, inputRef) => {
    let validationBorderColor, validationTextColor, validationIcon;

    if (props.error) {
        validationBorderColor = "border-red-600";
        validationTextColor = "text-red-600";
        validationIcon = faXmark;
    } else if (props.value && document.activeElement !== inputRef.current) {
        validationBorderColor = "border-lime-500";
        validationTextColor = "text-lime-500";
        validationIcon = faCheck;
    } else {
        validationBorderColor = "border-zinc-200";
        validationTextColor = "text-figma-slate";
        // validationIcon = faCircleNotch;
    }

    return {
        validationBorderColor: validationBorderColor,
        validationTextColor: validationTextColor,
        validationIcon: validationIcon
    };
};


export default function InputPassword(props) {
  // State Variables
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isToggleHidden, setIsToggleHidden] = useState(true);
  // Input Variables
  const inputRef = useRef();
  const { validationBorderColor, validationTextColor, validationIcon } = inputValidationStyle(props, inputRef);
  // Password Variables
  const isDisabledCopyPaste = (props.type === 'password' || props.disableCopyPaste);
  const togglePassword = () => {
      setIsPasswordHidden(!isPasswordHidden);
  };
  const state = (isToggleHidden) ? "hidden" : "flex";
  const icon = (isPasswordHidden) ? (
      <FontAwesomeIcon icon={faEye} size="lg" className="text-zinc-400"/>
  ) : (
      <FontAwesomeIcon icon={faEyeSlash} size="lg" className="text-zinc-400"/>
  );
  // onFocus Event
  const onFocusFn = () => {
      setIsToggleHidden(false);
  };
  // onBlur Event
  const onBlurFn = ({ currentTarget, relatedTarget }) => {
      if (currentTarget.contains(relatedTarget)) return;
      setIsPasswordHidden(true);
      setIsToggleHidden(true);
  };

  return (
      <div className="input-password w-full relative flex flex-row items-center" onFocus={onFocusFn} onBlur={onBlurFn}>
          <input
              name={props.name}
              ref={inputRef}
              type={isPasswordHidden ? 'password' : 'text'}
              value={props.value}
              placeholder={props.placeholder ?? 'Placeholder'}
              className={`block w-full p-3 rounded-md border focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 placeholder:text-figma-gray text-base font-light tablet:font-normal placeholder:font-normal tablet:placeholder:font-meduim ${validationBorderColor}`}
              onChange={props.onChange}
              onBlur={props.onBlur}
              onCopy={(isDisabledCopyPaste || props.disableCopy) ? preventFn : props.onCopy}
              onPaste={(isDisabledCopyPaste || props.disablePaste) ? preventFn : props.onPaste}
              onKeyDown={preventSpaceFn}
          />
          <div className="absolute right-0 mr-3 gap-4 flex flex-row bg-white">
              <button
                  name="toggle-password"
                  type="button"
                  tabIndex={-1}
                  className={`items-center justify-center ${state}`}
                  onClick={togglePassword}
              >
                  {icon}
              </button>
              {props.hasIcon &&
                  <i className={validationTextColor} onFocus={preventFocusFn}>
                      <FontAwesomeIcon icon={validationIcon} size="lg" />
                  </i>
              }
          </div>
      </div>
  );
}