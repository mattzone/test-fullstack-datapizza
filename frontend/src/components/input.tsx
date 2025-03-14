import React, { useEffect, useRef, useState } from "react";
import { FaRegPaperPlane } from "react-icons/fa";

const Input = ({
  text,
  setText,
  setHeight,
  sendQuery,
  containerRef,
  finishPrint,
}: {
  text: string;
  setText: (text: string) => void;
  setHeight: (text: number) => void;
  sendQuery: () => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
  finishPrint: boolean;
}) => {
  const [disableSend, setDisableSend] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [clientWidth, setClientWidth] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);

  // set the height when one of text, clientWidth or clientHeight change
  useEffect(() => {
    setHeightForPadding();
  }, [text, clientWidth, clientHeight]);

  /**
   * setHeightForPadding
   *
   * Adjusts the height state based on the current height of the container.
   *
   */
  function setHeightForPadding() {
    setHeight(0);
    const container = containerRef.current;
    if (container) setHeight(container.clientHeight);
  }

  // Updates the height of the textarea based on the content when the content of the text change
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";

      const lineHeight = parseInt(
        window.getComputedStyle(textarea).lineHeight,
        10
      );

      const padding =
        parseInt(window.getComputedStyle(textarea).paddingTop, 10) +
        parseInt(window.getComputedStyle(textarea).paddingBottom, 10);

      // calculate the height based on the content
      let height = Math.max(
        textarea.scrollHeight,
        textarea.clientHeight,
        lineHeight + padding
      );

      if (!text) height = 36;
      textarea.style.height = `${height}px`;
    }
  }, [text]);

  // Updates the client width and height states when the site is loaded.
  useEffect(() => {
    const handleResize = () => {
      setClientWidth(window.innerWidth);
      setClientHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Updates the disableSend when the finishPrint or the text change
  useEffect(() => {
    setDisableSend(!(text && finishPrint));
  }, [finishPrint, text]);

  return (
    <div
      className="sm:w-2/3 w-5/6 xl:w-2xl mx-auto fixed left-0 right-0 py-5 bottom-0 h-fit"
      ref={containerRef}
    >
      <div className="flex sm:px-5 sm:py-5 px-2 py-1.5 rounded-3xl bg-teal-900 sm:text-base text-sm items-center">
        <textarea
          className="w-full text-slate-400 px-5 resize-none max-h-72 outline-0 pt-1.5"
          placeholder="Inserisci la domanda qui..."
          onChange={(e) => {
            setText(e.target.value);
          }}
          value={text}
          ref={textareaRef}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && !disableSend) sendQuery();
          }}
        />
        <button
          type="button"
          title="send"
          className={`sm:ml-3 ml-2 bg-teal-500 text-teal-950 sm:px-8 p-3 rounded-full items-center justify-center flex ${
            disableSend
              ? "opacity-30"
              : "hover:bg-teal-950 cursor-pointer hover:text-teal-800"
          }`}
          onClick={sendQuery}
          disabled={disableSend}
        >
          <FaRegPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default Input;
