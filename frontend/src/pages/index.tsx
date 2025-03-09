import Chat from "@/components/chat/chat";
import CloseBtn from "@/components/close_btn";
import Input from "@/components/input";
import Navbar from "@/components/navbar";
import Welcome from "@/components/welcome";
import { History } from "@/interfaces/history";
import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function Home() {
  const [query, setQuery] = useState("");
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");
  const [height, setHeight] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);
  const [finishPrint, setFinishPrint] = useState(true);
  const [isFirst, setIsFirst] = useState(true);
  const [history, setHistory] = useState<Array<History>>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [clientWidth, setClientWidth] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);

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

  useEffect(() => {
    setHeightForPadding();
  }, [clientWidth, clientHeight]);

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

          let response = json["response"];
          setResponse(response);
          setText("");

          if (isFirst) setIsFirst(false);
          else {
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
        showError(
          "Errore durante la generazione della risposta. Riprova più tardi."
        );
      });
  }

  useEffect(() => {
    setHeightForPadding();
  }, [text]);

  function setHeightForPadding() {
    setHeight(0);
    const container = containerRef.current;
    if (container) setHeight(container.clientHeight);
  }

  const showError = (error: string) => {
    toast.error(error, {
      className: "toast-error-container",
    });
  };

  const CloseButton = ({ closeToast }: { closeToast: () => void }) => (
    <CloseBtn closeToast={closeToast} />
  );

  return (
    <div
      className={`flex flex-col h-screen max-h-screen bg-teal-950`}
      style={{ paddingBottom: `calc(${height}px + 1vh)` }}
    >
      <Navbar />

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
        sendQuery={sendQuery}
        containerRef={containerRef}
        finishPrint={finishPrint}
      />

      <ToastContainer closeButton={CloseButton} />
    </div>
  );
}
