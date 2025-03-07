import React from "react";

const Navbar = () => {
  const reload = () => {
    window.location.reload();
  };

  return (
    <div
      className="w-full text-slate-400 cursor-pointer shadow-sm"
      onClick={reload}
    >
      <div className="sm:w-2/3 w-5/6 xl:w-2xl mx-auto font-extrabold flex py-5 sm:text-2xl text-sm">
        Test tecnico Full Stack Developer
      </div>
    </div>
  );
};

export default Navbar;
