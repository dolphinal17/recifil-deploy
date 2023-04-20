import React, { useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faCheck, faCircleNotch } from '@fortawesome/free-solid-svg-icons';

const preventFn = (e) => {
    e.preventDefault();
    return false;
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


export default function InputGeneral(props) {
    const inputRef = useRef();
    const { validationBorderColor, validationTextColor, validationIcon } = inputValidationStyle(props, inputRef);

    return (
        <div className="input-general w-full relative flex flex-row items-center">
            <input
                name={props.name}
                ref={inputRef}
                type={props.type ?? 'text'}
                value={props.value}
                placeholder={props.placeholder ?? 'Placeholder'}
                className={`block w-full p-3 rounded-md border focus:outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 placeholder:text-figma-gray text-base font-light tablet:font-normal placeholder:font-normal tablet:placeholder:font-meduim ${validationBorderColor}`}
                onChange={props.onChange}
                onBlur={props.onBlur}
                onCopy={props.disableCopyPaste ? preventFn : props.onCopy}
                onPaste={props.disableCopyPaste ? preventFn : props.onPaste}
            />
            <div className="absolute right-0 ml-auto mr-3">
                {props.hasIcon &&
                    <i className={validationTextColor}>
                        <FontAwesomeIcon icon={validationIcon} size="lg" />
                    </i>
                }
            </div>
        </div>
    );
}