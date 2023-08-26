import Image from "next/image";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import bomb from '../assets/bomb.png';
import TileClass from "@/utils/TileClass";

type Props = {
  t: TileClass;
  setTotalHint: Dispatch<SetStateAction<number>>;
  reset: () => void;
  isLock: boolean;
  isCheck: boolean;
};

const Tile = ({ t, setTotalHint, reset, isLock, isCheck }: Props) => {
  const [clicked, setClicked] = useState(t.clicked);
  const [checked, setChecked] = useState(t.checked);
  const [hint, setHint] = useState(t.hint);
  t.setFuncs(setHint, setChecked, setClicked);

  useEffect(() => {
    if (hint == -1 && clicked == 1) {
      console.log("lose");
      reset();
    }
  }, [clicked]);

  return (
    <div className="bg-[#aaaaaa55] border border-black w-full h-full">
      {clicked == 1 ? (
        <div className="bg-white w-full h-full flex justify-center items-center">
          <div className="text-black  w-full h-full relative">
            {hint > 0 ? (
              hint
            ) : hint == -1 ? (
              <Image
                src={bomb}
                alt="bomb"
                fill
                objectFit="contain"
              />
            ) : (
              ""
            )}
          </div>
        </div>
      ) : checked == 1 ? (
        <div
          className="bg-red-900 w-full h-full"
          onClick={(e) => {
            if (isLock) {
              return;
            }
            if (isCheck) {
              t.setCheck();
              setTotalHint((prev) => prev - 1);
            }
          }}
          onContextMenu={(e) => {
            if (isLock) {
              return;
            }
            t.setCheck();
            setTotalHint((prev) => prev - 1);
          }}
        ></div>
      ) : (
        <div
          className={"flex w-full h-full"}
          onClick={(e) => {
            if (isLock) {
              return;
            }
            if (isCheck) {
              t.setCheck();
              setTotalHint((prev) => prev + 1);
            } else {
              if (checked != 1) {
                t.setClick();
              }
            }
          }}
          onContextMenu={(e) => {
            if (isLock) {
              return;
            }
            t.setCheck();
            setTotalHint((prev) => prev + 1);
          }}
        ></div>
      )}
    </div>
  );
};

export default Tile;
