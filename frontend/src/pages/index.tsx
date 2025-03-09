import Chat from "@/components/chat/chat";
import CloseBtn from "@/components/close_btn";
import Input from "@/components/input";
import Navbar from "@/components/navbar";
import Welcome from "@/components/welcome";
import { History } from "@/interfaces/history";
import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function Home() {
  const [query, setQuery] = useState("");
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);
  const [finishPrint, setFinishPrint] = useState(true);
  const [isFirst, setIsFirst] = useState(true);
  const [history, setHistory] = useState<Array<History>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  /**
   * sendQuery
   *
   * Sends a query to the server that generate a response.
   */
  async function sendQuery() {
    setQuery("");
    setResponse("");
    setShowWelcome(false);
    setIsLoading(true);
    setQuery(text);

    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/generate`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: text.trim(),
      }),
    })
      .then((res) => {
        res.json().then((json) => {
          setIsLoading(false);

          // save the response
          let response = json["response"];
          setResponse(response);
          setText("");

          // isFirst is used to avoid adding the firstquery and the response to the history
          if (isFirst) setIsFirst(false);
          else {
            // if is not the first query Add the query and the response to the history
            let newHistory = history;
            newHistory.push({
              query: query,
              response: response,
            });

            setHistory(newHistory);
          }
        });
      })
      .catch((error) => {
        // print the error in a toast
        showError(
          "Errore durante la generazione della risposta. Riprova più tardi."
        );
      });
  }

  /**
   * showError
   *
   * Shows an error in a toast.
   * @param {string} error The error to show.
   */
  const showError = (error: string) => {
    toast.error(error, {
      className: "toast-error-container",
    });
  };

  /**
   * CloseButton
   *
   * A function that return React component that is used to close a toast.
   * @param {{ closeToast: () => void }} props The props of the component.
   * @returns {CloseBtn} The component.
   */
  const CloseButton = ({ closeToast }: { closeToast: () => void }) => (
    <CloseBtn closeToast={closeToast} />
  );

  return (
    <div
      className={`flex flex-col h-screen max-h-screen bg-teal-950`}
      style={{ paddingBottom: `calc(${height}px + 1vh)` }}
    >
      <Navbar />

      {/* when you enter in the page show welcome, insted of the chat */}
      {!showWelcome ? (
        <Chat
          query={query}
          response={response}
          isLoading={isLoading}
          history={history}
          setFinishPrint={setFinishPrint}
        />
      ) : (
        <Welcome />
      )}

      <Input
        text={text}
        setText={setText}
        setHeight={setHeight}
        sendQuery={sendQuery}
        containerRef={containerRef}
        finishPrint={finishPrint}
      />

      <ToastContainer closeButton={CloseButton} />
    </div>
  );
}
