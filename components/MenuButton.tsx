import Link from "next/link";
import React, { Dispatch, SetStateAction } from "react";

type Props = {
  width: number;
  height: number;
  mines: number;
  setInfo: Dispatch<
    SetStateAction<{
      width: number;
      height: number;
      mines: number;
    }>
  >;
};

const MenuButton = ({ width, height, mines, setInfo }: Props) => {
  return (
    <button
      onClick={() => setInfo({width, height, mines})}
      className="border border-black rounded-md bg-[#333] w-64 h-64 text-white flex flex-col justify-center items-center hover:bg-[#555]"
    >
      <h1 className="font-extrabold">
        {width} x {height}
      </h1>
      <h2>
        <span className="font-extrabold">{mines}</span> mines
      </h2>
    </button>
  );
};

export default MenuButton;
