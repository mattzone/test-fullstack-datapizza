import { Document } from "@/interfaces/document";
import { RefObject, useEffect, useRef, useState } from "react";
import { FaRegFileAlt, FaRegPaperPlane } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";

export default function Home() {
  const [query, setQuery] = useState("");
  const [text, setText] = useState("");
  const [answer, setAnswer] = useState("");
  const [documents, setDocuments] = useState<Array<Document>>([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);
  const [showBtnDoc, setShowBtnDoc] = useState(false);
  const containerRef = useRef(null);
  const textareaRef = useRef(null);

  // Effetto per fare lo scroll dinamico man mano che il div si riempie
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [text]); // Lo scroll viene aggiornato quando il testo cambia

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  async function sendQuery() {
    setShowWelcome(false);
    setText("");
    setIsLoading(true);
    setAnswer("");
    setShowBtnDoc(false);
    setQuery(text);

    await fetch("http://127.0.0.1:5000/generate", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: text,
      }),
    })
      .then((res) => {
        res.json().then((json) => {
          setText("");
          setIsLoading(false);

          let response = json["response"];
          let index = -1;

          const interval = setInterval(() => {
            if (index < response.length - 1) {
              setAnswer((prev) => prev + response[index]);

              index++;
            } else {
              setShowBtnDoc(true);
              clearInterval(interval);
            }
          }, 10);
        });
      })
      .catch((error) => {
        console.log("erroror");
        console.log(error);
      });
  }

  async function fetchDocuments() {
    await fetch("http://127.0.0.1:5000/documents")
      .then((res) => {
        res.json().then((json) => {
          setDocuments(json["documents"]);
          openModal();
        });
      })
      .catch((error) => {
        console.log("erroror");
        console.log(error);
      });
  }

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

      // Calcola l'altezza basata sul numero di righe e il padding
      let height = Math.max(
        textarea.scrollHeight,
        textarea.clientHeight,
        lineHeight + padding
      );

      if (!text) height = 36;

      textarea.style.height = `${height}px`;
    }
  }, [text]);

  return (
    <div className="flex flex-col h-screen max-h-screen bg-teal-950 xl:pb-30 md:pb-28 pb-20">
      {/* navabr */}
      <div className="w-full text-slate-400 ">
        <div className="sm:w-2/3 w-5/6  xl:w-2xl mx-auto font-extrabold flex py-3 sm:text-2xl text-sm">
          Test tecnico Full Stack Developer
        </div>
      </div>
      {/* navbar */}

      {!showWelcome ? (
        // chat
        <div
          className="w-full text-slate-300 md:text-xl/9 text-sm/6 xl:pt-20 md:pt-10 pt-5 max-h-full h-full overflow-auto scroll-smooth"
          ref={containerRef}
        >
          <div className="w-full">
            <div className=" sm:w-2/3 w-5/6 xl:w-2xl mx-auto">
              <div className="flex justify-end">
                <div className="bg-teal-900 rounded-3xl px-5 py-4 break-words sm:max-w-2/3 max-w-3/4 md:text-lg/7 text-xs/5">
                  {query}
                </div>
              </div>

              {answer && !isLoading ? (
                <div className="pt-5">
                  {answer}
                  {/* { && ( */}
                  <div
                    onClick={fetchDocuments}
                    className={`${
                      showBtnDoc ? "opacity-100" : "opacity-0"
                    } duration-500 transition-all bg-teal-500 text-teal-950 p-2 rounded-full hover:bg-teal-800 cursor-pointer hover:text-teal-500 items-center justify-center flex text-sm w-fit mt-5`}
                  >
                    <FaRegFileAlt />
                  </div>
                  {/* ) */}
                  {/* } */}
                </div>
              ) : (
                <div className="flex justify-center items-center pt-60 w-full">
                  <div className="w-16 h-16 border-5 border-teal-800 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
          </div>
        </div> // chat
      ) : (
        <div className="flex items-center justify-center h-full text-slate-400 sm:px-0 px-10">
          <p className="sm:text-4xl text-lg">
            <span className="font-bold">Benvenuto!</span> Come posso aiutarti?
          </p>
        </div>
      )}

      {/* input */}
      <div className="sm:w-2/3 w-5/6 xl:w-2xl mx-auto fixed left-0 right-0 py-5 bottom-0 h-fit">
        <div className="flex sm:px-5 sm:py-5 px-2 py-1.5 rounded-4xl bg-teal-900 sm:text-base text-sm h-fit items-center">
          <textarea
            className="w-full text-slate-400 px-5 resize-none py-1.5 max-h-72 outline-0 h-auto"
            placeholder="Inserisci la domanda qui..."
            onChange={(e) => setText(e.target.value)}
            value={text}
            ref={textareaRef}
            onKeyDown={(e) => {
              // if (e.key === "Enter") sendQuery();
            }}
          />
          <button
            className={`sm:ml-3 ml-2 bg-teal-500 text-teal-950 sm:px-8 p-3 rounded-full items-center justify-center flex ${
              text
                ? "hover:bg-teal-950 cursor-pointer hover:text-teal-800"
                : "opacity-30"
            }`}
            onClick={sendQuery}
            disabled={!text}
          >
            <FaRegPaperPlane />
          </button>
        </div>
      </div>
      {/* input */}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-20">
          <div
            className="fixed inset-0 bg-teal-950 opacity-70"
            onClick={closeModal}
          />

          <div className="flex flex-col gap-6 bg-teal-800 text-slate-400 p-10 rounded-4xl shadow-lg z-50 relative max-h-5/6 overflow-auto">
            {documents.map(function (object) {
              return (
                <div key={object.title} className="text-lg border-b pb-3">
                  <p className="font-bold text-xl">{object.title}</p>
                  <p className="break-words">{object.content}</p>
                </div>
              );
            })}

            <FaXmark
              className="absolute top-5 right-5 text-3xl cursor-pointer"
              onClick={closeModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}
