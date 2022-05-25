import React from "react";

export type TexterTextAreaProps = {
  placeholder: string;
  name: string;
  errorMessage?: string;
  autoFocus?: boolean;
};

export const TexterTextArea = React.forwardRef<
  HTMLTextAreaElement,
  TexterTextAreaProps
>(({ placeholder, name, errorMessage, autoFocus }, ref,) => {
  return (
    <div className="flex flex-col px-3">
      <label htmlFor={name}></label>
      <textarea
        name={name}
        id={name}
        placeholder={placeholder}
        className="bg-inherit w-full py-4 focus:outline-none text-xl mb-2"
        autoFocus={autoFocus}
        ref={ref}
      />
      {typeof errorMessage === "string" ? (
        <p className="text-red-error text-sm">{errorMessage}</p>
      ) : null}
    </div>
  );
});

TexterTextArea.displayName = "TexterTextArea";
