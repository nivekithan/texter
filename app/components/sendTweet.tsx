import { Form, useTransition } from "@remix-run/react";
import { useEffect, useRef } from "react";
import { TexterTextArea } from "./texterTextArea";

export type SendTweetProps = {
  error?: string;
};

export const SendTweet = ({ error }: SendTweetProps) => {
  const transition = useTransition();
  const formRef = useRef<HTMLFormElement | null>(null);
  const isSubmiting = transition.state === "submitting";

  useEffect(() => {
    if (!isSubmiting) {
      formRef?.current?.reset();
    }
  }, [isSubmiting]);

  return (
    <Form method="post" className="flex flex-col gap-y-5 py-5" ref={formRef}>
      <TexterTextArea
        name="message"
        placeholder="Whats Happening?"
        errorMessage={error}
        autoFocus
      />
      <div className="flex justify-end mr-3">
        <button
          type="submit"
          className="bg-texter-blue hover:bg-texter-blue-dark px-5 py-2 rounded-full"
          name="actionType"
          value="tweet"
        >
          Tweet
        </button>
      </div>
    </Form>
  );
};
