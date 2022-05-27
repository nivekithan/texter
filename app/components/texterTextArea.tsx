import { Link } from "@remix-run/react";
import React from "react";

export type TexterTextAreaProps = {
  placeholder: string;
  name: string;
  label: string;
  errorMessage?: string;
  autoFocus?: boolean;
  userUrl: string;
};

export const TexterTextArea = React.forwardRef<
  HTMLTextAreaElement,
  TexterTextAreaProps
>(({ placeholder, name, label, errorMessage, autoFocus, userUrl }, ref) => {
  return (
    <div className="flex flex-col px-3">
      <label htmlFor={name} hidden>
        {label}
      </label>
      <div className="flex gap-x-2">
        <Link to={userUrl}>
          <div className="w-[50px] h-[50px] rounded-full bg-texter-blue">
            {/* Profile Picture */}
          </div>
        </Link>
        <textarea
          name={name}
          id={name}
          placeholder={placeholder}
          className="bg-inherit w-full py-4 focus:outline-none text-xl mb-2"
          autoFocus={autoFocus}
          ref={ref}
        />
      </div>
      {typeof errorMessage === "string" ? (
        <p className="text-red-error text-sm">{errorMessage}</p>
      ) : null}
    </div>
  );
});

TexterTextArea.displayName = "TexterTextArea";
