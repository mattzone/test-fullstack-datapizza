import React, { useEffect, useRef, useState } from "react";
import ModalDocuments from "../modal_documents";
import { Document } from "@/interfaces/document";
import { History } from "@/interfaces/history";
import Query from "./query";
import Answer from "./answer";
import { ToastContainer, toast } from "react-toastify";
import CloseBtn from "../close_btn";

const Chat = ({
  query,
  response,
  isLoading,
  history,
  setFinishPrint,
}: {
  query: string;
  response: string;
  isLoading: boolean;
  history: Array<History>;
  setFinishPrint: (finishPRint: boolean) => void;
}) => {
  const [answer, setAnswer] = useState("");
  const [documents, setDocuments] = useState<Array<Document>>([]);
  const [showBtnDoc, setShowBtnDoc] = useState(false);
  const containerRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  useEffect(() => {
    setAnswer("");
    setFinishPrint(false);
    setShowBtnDoc(false);

    let index = 0;
    let answer = "";

    if (response.length > 0) {
      const interval = setInterval(() => {
        if (index < response.length - 1) {
          let char = response[index];
          if (char) answer += char;

          setAnswer(answer);
          index++;
        } else {
          setShowBtnDoc(true);
          setFinishPrint(true);
          clearInterval(interval);
        }
      }, 10);
    }
  }, [response]);

  useEffect(() => {
    if (containerRef.current)
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [answer, query]);

  async function fetchDocuments() {
    await fetch("http://127.0.0.1:5000/documents")
      .then((res) => {
        res.json().then((json) => {
          setDocuments(json["documents"]);
          openModal();
        });
      })
      .catch((error) => {
        showError(
          "Errore durante il recupero dei documenti. Riprova più tardi."
        );
      });
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
    <>
      <div
        className="w-full text-slate-300 md:text-xl/9 text-sm/6 xl:pt-20 md:pt-10 pt-5 max-h-full h-full overflow-auto scroll-smooth"
        ref={containerRef}
      >
        <div className="w-full">
          <div className=" sm:w-2/3 w-5/6 xl:w-2xl mx-auto">
            {history.map(function (object, index) {
              return (
                <div key={object.query + index}>
                  <Query query={object.query} />
                  <Answer
                    answer={object.response}
                    fetchDocuments={fetchDocuments}
                    showBtnDoc={true}
                  />
                </div>
              );
            })}

            {query && <Query query={query} />}

            {!isLoading ? (
              <Answer
                answer={answer}
                fetchDocuments={fetchDocuments}
                showBtnDoc={showBtnDoc}
              />
            ) : (
              <div className="flex justify-center items-center py-10 w-full">
                <div className="w-16 h-16 border-5 border-teal-800 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <ModalDocuments closeModal={closeModal} documents={documents} />
      )}

      <ToastContainer closeButton={CloseButton} />
    </>
  );
};

export default Chat;
