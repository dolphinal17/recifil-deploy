import React from "react";
import {InputGeneral, InputPassword, LabelInputError} from "../atoms/atoms.js"

export default function InputGroup(props) {
    const className = props.className ?? "";
    const errorString = (props.error) ? (props.placeholder ?? 'Input') + ' ' + props.error + '.' : '';
    const inputComponent = (props.type === 'password')
        ? (
            <InputPassword
                name={props.name}
                type={props.type}
                value={props.value}
                placeholder={props.placeholder}
                hasIcon={props.hasIcon}
                disableCopyPaste={props.disableCopyPaste}
                onChange={props.onChange}
                onBlur={props.onBlur}
                error={errorString}
            />
        ) : (
            <InputGeneral
                name={props.name}
                type={props.type}
                value={props.value}
                placeholder={props.placeholder}
                hasIcon={props.hasIcon}
                disableCopyPaste={props.disableCopyPaste}
                onChange={props.onChange}
                onBlur={props.onBlur}
                error={errorString}
            />
        );

    return (
        <div className={className}>
            {props.hasLabel && <></>}
            {inputComponent}
            <LabelInputError>{errorString}</LabelInputError>
        </div>
    );
}