"use client";

import Image from "next/image";
import MenueButton from "@/components/MenuButton";
import { useEffect, useState } from "react";
import Feild from "@/components/Feild";

export default function Home() {
  const [info, setInfo] = useState({ width: 0, height: 0, mines: 0 });

  const board: number[][] = [];
  const hintBoard: number[][] = [];
  const tempTiles: [number, number][] = [];
  const mineList: [number, number][] = [];
  
  useEffect(() => {
    init();
  }, [info]);

  const init = () => {
    const tempCheckBoard: number[][] = [];
    for (let j = 0; j < info.height; j++) {
      const row: number[] = [];
      for (let i = 0; i < info.width; i++) {
        row.push(0);
        tempTiles.push([i, j]);
      }
      board.push(row);
      hintBoard.push([...row]);
      tempCheckBoard.push([...row]);
    }
    // setCheckBoard(tempCheckBoard);

    for (let i = 0; i < info.mines; i++) {
      let tempIndex = Math.floor(Math.random() * tempTiles.length);
      board[tempTiles[tempIndex][0]][tempTiles[tempIndex][1]] = 1;
      hintBoard[tempTiles[tempIndex][0]][tempTiles[tempIndex][1]] = -1;

      mineList.push(tempTiles[tempIndex]);
      tempTiles.splice(tempIndex, 1);
    }

    for (let i = 0; i < mineList.length; i++) {
      for (let j = -1; j < 2; j++) {
        for (let k = -1; k < 2; k++) {
          if (
            mineList[i][0] + j >= 0 &&
            mineList[i][0] + j < info.width &&
            mineList[i][1] + k >= 0 &&
            mineList[i][1] + k < info.height
          ) {
            if (hintBoard[mineList[i][0] + j][mineList[i][1] + k] != -1) {
              hintBoard[mineList[i][0] + j][mineList[i][1] + k]++;
            }
          }
        }
      }
    }
  };

  return (
    <main className="min-h-screen flex justify-center items-center">
      {info.mines == 0 ? (
        <div className=" grid grid-cols-2 gap-4">
          <MenueButton width={8} height={8} mines={10} setInfo={setInfo} />
          <MenueButton width={16} height={16} mines={40} setInfo={setInfo} />
          <MenueButton width={30} height={16} mines={99} setInfo={setInfo} />
        </div>
      ) : (
        <Feild {...info} />
      )}
    </main>
  );
}
