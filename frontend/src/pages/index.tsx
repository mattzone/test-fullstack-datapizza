import { useState } from "react";
import { FaRegFileAlt, FaRegPaperPlane } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { TypeAnimation } from "react-type-animation";

type Document = {
  title: string;
  content: string;
};

export default function Home() {
  const [query, setQuery] = useState("");
  const [text, setText] = useState("");
  const [response, setResponse] = useState("");
  const [documents, setDocuments] = useState<Array<Document>>([]);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  async function sendQuery() {
    setResponse("");
    setText("");

    let res = await fetch("http://127.0.0.1:5000/generate", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: text,
      }),
    });

    res.json().then((json) => {
      setResponse(json["response"]);
      setQuery(text);
      setText("");
    });
  }

  async function fetchDocuments() {
    let res = await fetch("http://127.0.0.1:5000/documents");

    res.json().then((json) => {
      setDocuments(json["documents"]);
    });
  }

  return (
    <div className="h-screen flex justify-evenly flex-col">
      <div className="pt-10 h-5/6 flex justify-center text-white">
        {query ? (
          <div className="w-4xl text-xl font-medium flex items-center">
            <div className="w-full">
              <div className="flex w-full justify-end items-center gap-5">
                <div
                  onClick={fetchDocuments}
                  className="bg-teal-500 text-teal-950 p-2 rounded-full hover:bg-teal-800 cursor-pointer hover:text-teal-500 items-center justify-center flex text-xl"
                >
                  <FaRegFileAlt onClick={openModal} />
                </div>
                <div className="bg-teal-900 rounded-3xl p-10 py-5 break-words max-w-1/2">
                  {query}
                </div>
              </div>

              <div className="w-fit py-10">
                {response && (
                  <TypeAnimation
                    sequence={[response, 1000]}
                    speed={70}
                    wrapper="span"
                    cursor={false}
                  />
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="w-4xl text-4xl font-light flex items-center gap-2">
            <span className="font-extrabold">Benvenuto!</span> Come posso
            aiutarti?
          </div>
        )}
      </div>
      <div className="px-5 py-3 rounded-full bg-teal-900 w-4xl mx-auto flex">
        <input
          type="text"
          className="w-full rounded-full px-4 py-2 bg-teal-950 border-0 text-white"
          placeholder="Inserisci la domanda qui..."
          onChange={(e) => setText(e.target.value)}
          value={text}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendQuery();
          }}
        />
        <button
          className={`ml-3 bg-teal-500 text-teal-950 px-8 rounded-full gap-2 items-center justify-center flex text-xl ${
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

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-20">
          <div
            className="fixed inset-0 bg-teal-950 opacity-70"
            onClick={closeModal}
          />

          <div className="flex flex-col gap-6 bg-teal-800 text-white p-6 rounded-4xl shadow-lg z-50 relative max-h-5/6 overflow-auto">
            {documents.map(function (object) {
              return (
                <div key={object.title} className="text-lg border-b pb-3">
                  <p className="font-bold text-xl">{object.title}</p>
                  <p className="break-words">{object.content}</p>
                </div>
              );
            })}

            <FaXmark
              className="absolute top-5 right-5 text-2xl cursor-pointer"
              onClick={closeModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}
