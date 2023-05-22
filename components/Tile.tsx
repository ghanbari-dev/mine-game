import TileClass from "@/utils/TileClass";
import React, { useState } from "react";

type Props = { t: TileClass };

const Tile = ({ t }: Props) => {
  const [clicked, setClicked] = useState(t.clicked);

  return (
    <button
      className="bg-[#aaa] border border-black aspect-square w-10"
      onClick={() => {
        t.clicked = 1;
        setClicked(t.clicked);
      }}
    >
      {clicked == 1 ? (
        <div>
          {/* <div>{t.value}</div> */}
          <div>{t.hint}</div>
        </div>
      ) : (
        <div></div>
      )}
    </button>
  );
};

export default Tile;
