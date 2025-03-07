import { FaXmark } from "react-icons/fa6";

const CloseBtn = ({ closeToast }: { closeToast: () => void }) => {
  return (
    <div
      className="text-white hover:text-teal-950 absolute top-2 right-2 cursor-pointer"
      onClick={closeToast}
    >
      <FaXmark />
    </div>
  );
};

export default CloseBtn;
