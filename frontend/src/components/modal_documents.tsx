import { Document } from "@/interfaces/document";
import React from "react";
import { FaXmark } from "react-icons/fa6";

const ModalDocuments = ({
  closeModal,
  documents,
}: {
  closeModal: () => void;
  documents: Array<Document>;
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 sm:px-20 px-5">
      <div
        className="fixed inset-0 bg-teal-950 opacity-70"
        onClick={closeModal}
      />

      <div className="flex flex-col gap-6 bg-teal-800 text-slate-400 p-10 sm:px-10 md:px-20 md:py-15 px-4 rounded-3xl shadow-lg z-50 relative max-h-5/6 overflow-auto">
        {documents.map(function (object) {
          return (
            <div key={object.title} className="border-b pb-3">
              <p className="font-bold sm:text-xl text-lg">{object.title}</p>
              <p className="break-words sm:text-lg text-sm">{object.content}</p>
            </div>
          );
        })}

        <FaXmark
          className="absolute top-5 right-5 text-3xl cursor-pointer"
          onClick={closeModal}
        />
      </div>
    </div>
  );
};

export default ModalDocuments;
