import { RiCloseCircleLine } from "react-icons/ri";
import styles from "./styles.module.scss";
import { IconType } from "react-icons/lib";
import { HTMLInputTypeAttribute } from "react";
import clsx from "clsx";

type GoogleInputBoxProps = {
  value: string;
  onChange: (value: string) => void;
  onOk?: (value: string) => void;
  placeholder?: string;
  buttonTitle?: string;
  classname?: string;
  showClear?: boolean;
  type?: HTMLInputTypeAttribute;
  AdditionalButton?: IconType;
  IconStart?: IconType;
  IconEnd?: IconType;
};

const GoogleInputBox = ({
  value,
  onChange,
  onOk,
  placeholder = "",
  buttonTitle = "Button",
  classname = "",
  showClear = false,
  type = "text",
  AdditionalButton,
  IconStart,
  IconEnd,
}: GoogleInputBoxProps) => {
  return (
    <div className={clsx(styles.inputContainer, classname)}>
      {IconStart && <IconStart />}
      <input
        type={type}
        name={placeholder}
        className={"textbox"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        title={placeholder}
        id={placeholder.replace(" ", "_")}
      />
      <label htmlFor={placeholder.replace(" ", "_")} className={"label"}>
        {placeholder}
      </label>
      {showClear && value && (
        <span className={"clear"} onClick={() => onChange("")} title="Clear">
          <RiCloseCircleLine />
        </span>
      )}
      {AdditionalButton ? (
        <button
          title={"Submit " + buttonTitle}
          type="button"
          className="inputButton"
          onClick={() => onOk && onOk(value)} // Call `onOk` only if it's defined
        >
          <AdditionalButton />
        </button>
      ) : null}

      {IconEnd && <IconEnd />}
    </div>
  );
};

export default GoogleInputBox;