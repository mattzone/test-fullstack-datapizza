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

    await fetch("http://127.0.0.1:5000/generate", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: text,
      }),
    })
      .then((res) => {
        res.json().then((json) => {
          setResponse(json["response"]);
          setQuery(text);
          setText("");
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

  return (
    <div className="h-screen flex justify-evenly flex-col">
      <div className="h-5/6 flex text-white">
        {query ? (
          <div className="sm:w-2/3 sm:p-0 xl:w-2xl sm:mx-auto sm:text-base text-sm font-medium max-h-full overflow-auto overflow-x-hidden w-full">
            <div className="px-5 pt-20">
              <div className="flex justify-end">
                <div className="bg-teal-900 rounded-3xl px-5 py-3 break-words sm:max-w-2/3 max-w-3/4">
                  {query}
                </div>
              </div>

              <div className="w-fit py-10">
                {response && (
                  <div className="">
                    <TypeAnimation
                      sequence={[response, 1000]}
                      speed={85}
                      wrapper="span"
                      cursor={false}
                    />
                    {/* <div className="flex justify-end"> */}
                    <div
                      onClick={fetchDocuments}
                      className="bg-teal-500 text-teal-950 p-2 rounded-full hover:bg-teal-800 cursor-pointer hover:text-teal-500 items-center justify-center flex text-sm w-fit mt-5"
                    >
                      <FaRegFileAlt />
                    </div>
                    {/* </div> */}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="px-10 sm:w-2/3 sm:p-0 xl:w-2xl sm:mx-auto md:text-4xl font-light text-center pt-10 h-full">
            <div className="font-extrabold md:text-5xl text-2xl">
              Test tecnico Full Stack Developer
            </div>
            <div className="flex items-center justify-center h-full">
              <p>
                <span className="font-bold">Benvenuto!</span> Come posso
                aiutarti?
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="px-10 sm:w-2/3 sm:p-0 xl:w-2xl sm:mx-auto">
        <div className="flex sm:px-5 sm:py-3 px-2 py-1.5 rounded-full bg-teal-900 sm:text-base text-sm">
          <input
            type="text"
            className="w-full rounded-full px-2 py-1 sm:px-4 sm:py-2 bg-teal-950 border-0 text-white"
            placeholder="Inserisci la domanda qui..."
            onChange={(e) => setText(e.target.value)}
            value={text}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendQuery();
            }}
          />
          <button
            className={`sm:ml-3 ml-2 bg-teal-500 text-teal-950 sm:px-8 px-1.5 rounded-full items-center justify-center flex ${
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

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-20">
          <div
            className="fixed inset-0 bg-teal-950 opacity-70"
            onClick={closeModal}
          />

          <div className="flex flex-col gap-6 bg-teal-800 text-white p-10 rounded-4xl shadow-lg z-50 relative max-h-5/6 overflow-auto">
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
