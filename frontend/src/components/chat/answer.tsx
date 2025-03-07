import { FaRegFileAlt } from "react-icons/fa";

const Answer = ({
  answer,
  fetchDocuments,
  showBtnDoc,
}: {
  answer: string;
  fetchDocuments: () => void;
  showBtnDoc: boolean;
}) => {
  return (
    <div className="pt-5">
      {answer}
      <div
        onClick={fetchDocuments}
        className={`${
          showBtnDoc ? "opacity-100" : "opacity-0"
        } duration-500 transition-all bg-teal-500 text-teal-950 p-2 rounded-full hover:bg-teal-800 cursor-pointer hover:text-teal-500 items-center justify-center flex text-sm w-fit mt-5`}
      >
        <FaRegFileAlt />
      </div>
    </div>
  );
};

export default Answer;
