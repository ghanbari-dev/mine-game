import React, { useState } from "react";
import Tile from "./Tile";
import Image from "next/image";

import bg from "../assets/bg.jpeg";
import shovel from "../assets/shovel.jpeg";
import bomb from "../assets/bomb.png";
import TileClass from "@/utils/TileClass";

type Props = {
  width: number;
  height: number;
  mines: number;
  isLock: boolean;
  reset: () => void;
};

const Feild = ({ width, height, mines, isLock, reset }: Props) => {
  const board: number[][] = [];
  const hintBoard: number[][] = [];
  const tempTiles: [number, number][] = [];
  const mineList: [number, number][] = [];

  const newBoard: TileClass[][] = [];
  const [comBoard, setComBoard] = useState<TileClass[][]>([]);

  const [hint, setTotalHint] = useState(0);
  const [isCheck, setIsCheck] = useState(false);

  const init = () => {
    setTotalHint(0);
    const tempCheckBoard: number[][] = [];
    for (let j = 0; j < height; j++) {
      const row: number[] = [];
      const newRow: TileClass[] = [];
      for (let i = 0; i < width; i++) {
        row.push(0);
        newRow.push(new TileClass(0, j, i));
        tempTiles.push([i, j]);
      }
      board.push(row);
      hintBoard.push([...row]);
      tempCheckBoard.push([...row]);
      newBoard.push(newRow);
    }
    // setCheckBoard(tempCheckBoard);

    for (let i = 0; i < width; i++) {
      for (let j = 0; j < height; j++) {
        const n = {
          t: j - 1 >= 0 ? newBoard[j - 1][i] : null,
          tr: j - 1 >= 0 && i + 1 < width ? newBoard[j - 1][i + 1] : null,
          r: i + 1 < width ? newBoard[j][i + 1] : null,
          br: j + 1 < height && i + 1 < width ? newBoard[j + 1][i + 1] : null,
          b: j + 1 < height ? newBoard[j + 1][i] : null,
          bl: j + 1 < height && i - 1 >= 0 ? newBoard[j + 1][i - 1] : null,
          l: i - 1 >= 0 ? newBoard[j][i - 1] : null,
          tl: j - 1 >= 0 && i - 1 >= 0 ? newBoard[j - 1][i - 1] : null,
        };
        newBoard[j][i].setNeighbor(n);
      }
    }

    for (let i = 0; i < mines; i++) {
      let tempIndex = Math.floor(Math.random() * tempTiles.length);
      board[tempTiles[tempIndex][1]][tempTiles[tempIndex][0]] = 1;
      hintBoard[tempTiles[tempIndex][1]][tempTiles[tempIndex][0]] = -1;

      newBoard[tempTiles[tempIndex][1]][tempTiles[tempIndex][0]].setValue(-1);

      mineList.push(tempTiles[tempIndex]);
      tempTiles.splice(tempIndex, 1);
    }

    for (let i = 0; i < mineList.length; i++) {
      for (let j = -1; j < 2; j++) {
        for (let k = -1; k < 2; k++) {
          if (
            mineList[i][0] + j >= 0 &&
            mineList[i][0] + j < width &&
            mineList[i][1] + k >= 0 &&
            mineList[i][1] + k < height
          ) {
            if (hintBoard[mineList[i][1] + k][mineList[i][0] + j] != -1) {
              hintBoard[mineList[i][1] + k][mineList[i][0] + j]++;
            }
          }
        }
      }
    }
    setComBoard(newBoard);
    for (let i = 0; i < newBoard.length; i++) {
      for (let j = 0; j < newBoard[i].length; j++) {
        if (newBoard[i][j].hint == 0) {
          newBoard[i][j].setClick();
          return;
        }
      }
    }
  };

  if (comBoard.length == 0) {
    init();
  }

  return (
    <div className="relative w-screen h-screen flex justify-center items-center">
      <Image src={bg} alt="bg" fill className="-z-10" />
      <div className="bg-[#3d3232] w-3/5 md:w-[500px] aspect-square">
        <div className="flex flex-row-reverse bg-black">
          {mines - hint} / {mines}{" "}
        </div>
        <div className="flex flex-col justify-center bg-[#333] h-full">
          {comBoard.map((r, y) => (
            <div key={y} className="flex flex-row justify-center flex-1">
              {r.map((t, x) => (
                <div className="border flex-1" key={x}>
                  <Tile
                    t={comBoard[y][x]}
                    setTotalHint={setTotalHint}
                    reset={reset}
                    isLock={isLock}
                    isCheck={isCheck}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
        <div>
          <button
            className="h-10 w-10 relative"
            onClick={(e) => setIsCheck((prev) => !prev)}
          >
            <Image alt="" src={isCheck ? bomb : shovel} fill />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Feild;
