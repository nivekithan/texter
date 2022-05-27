import { Form, useFetcher } from "@remix-run/react";
import React from "react";

export type FormButtonProps = {
  action?: string;
  method?: "get" | "post";
  navigate?: boolean;

  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * Renders a button inside a remix `<Form>`
 * ```tsx
 * <Form action={...} method={...}>
 *      <button {...}> {children} </button>
 * </Form>
 * ```
 *
 * @param action - used to set the url of request, same as `action` in `<Form></Form>`
 * @param method - used to set the method of request, same as `method` in `<Form></Form>`
 */
export const FormButton = ({
  children,
  action,
  method,
  navigate,
  ...props
}: FormButtonProps) => {
  const fetcher = useFetcher();

  return (
    <>
      {navigate ? (
        <Form className="contents" action={action} method={method}>
          <button {...props}>{children} </button>
        </Form>
      ) : (
        <fetcher.Form className="contents" action={action} method={method}>
          <button {...props}>{children} </button>
        </fetcher.Form>
      )}
    </>
  );
};
