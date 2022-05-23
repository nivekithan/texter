export type TexterInputProps = {
  label: string;
  name: string;
  type: React.HTMLInputTypeAttribute;
  placeholder: string;
  autoFocus?: boolean;
  error?: boolean;
  errorMessage?: string;
};

export const TexterInput = ({
  label,
  name,
  type,
  placeholder,
  autoFocus,
  error,
  errorMessage,
}: TexterInputProps) => {
  return (
    <div className="flex flex-col w-full gap-y-6">
      <label htmlFor={name} className="text-xl font-bold">
        {label}
      </label>
      <div className="flex flex-col">
        <input
          type={type}
          id={name}
          name={name}
          className={`bg-inherit border-2  py-4 px-2 rounded focus:outline-none mb-3 ${
            error
              ? "border-red-error"
              : "border-gray-700 focus:border-texter-blue"
          }`}
          placeholder={placeholder}
          autoFocus={autoFocus}
        />
        {errorMessage ? (
          <p className="text-red-error text-sm">{errorMessage}</p>
        ) : null}
      </div>
    </div>
  );
};
