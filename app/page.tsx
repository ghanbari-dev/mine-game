"use client"
import Feild from "@/components/Feild";
import MenuButton from "@/components/MenuButton";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [info, setInfo] = useState({ width: 0, height: 0, mines: 0 });
  const [isReset, setIsReset] = useState(false);

  const board: number[][] = [];
  const hintBoard: number[][] = [];
  const tempTiles: [number, number][] = [];
  const mineList: [number, number][] = [];

  useEffect(() => {
    init();

    const handleClick = (e: any) => {
      e.preventDefault();
    };

    document.addEventListener("contextmenu", handleClick);

    return () => {
      document.removeEventListener("contextmenu", handleClick);
    };
  }, [info]);

  const rootElement = useRef();

  const ResetGame = () => {
    if (!isReset) {
      setIsReset(true);
      setTimeout(() => {
        setInfo({ mines: 0, height: 0, width: 0 });
        setIsReset(false);
      }, 1000);
    }
  };

  // useEffect(() => {
  //   function handleContextMenu(e: any) {
  //     e.preventDefault(); // prevents the default right-click menu from appearing
  //   }
  //   // add the event listener to the component's root element
  //   if (rootElement) {
  //     rootElement.addEventListener("contextmenu", handleContextMenu);
  //     // remove the event listener when the component is unmounted
  //   }

  //   return () => {
  //     if (rootElement) {
  //       rootElement.removeEventListener("contextmenu", handleContextMenu);
  //     }
  //   };
  // }, []);

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
      board[tempTiles[tempIndex][1]][tempTiles[tempIndex][0]] = 1;
      hintBoard[tempTiles[tempIndex][1]][tempTiles[tempIndex][0]] = -1;

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
            if (hintBoard[mineList[i][1] + k][mineList[i][0] + j] != -1) {
              hintBoard[mineList[i][1] + k][mineList[i][0] + j]++;
            }
          }
        }
      }
    }
  };

  return (
    <main className="h-screen flex justify-center items-center">
      {info.mines == 0 ? (
        <div className=" grid grid-cols-2 gap-4">
          <MenuButton width={8} height={8} mines={10} setInfo={setInfo} />
          <MenuButton width={16} height={16} mines={40} setInfo={setInfo} />
          <MenuButton width={30} height={16} mines={99} setInfo={setInfo} />
        </div>
      ) : (
        <Feild {...info} reset={ResetGame} isLock={isReset} />
      )}
    </main>
  );
}
