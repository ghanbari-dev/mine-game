import React, { useEffect, useState } from "react";
import Tile from "./Tile";
import TileClass from "@/utils/TileClass";

type Props = {
  width: number;
  height: number;
  mines: number;
};

const Feild = ({ width, height, mines }: Props) => {
  const board: number[][] = [];
  const hintBoard: number[][] = [];
  const tempTiles: [number, number][] = [];
  const mineList: [number, number][] = [];

  const newBoard: TileClass[][] = [];
  const [comBoard, setComBoard] = useState<TileClass[][]>([]);

  const [checkBoard, setCheckBoard] = useState<number[][]>([]);

 

  const init = () => {
    const tempCheckBoard: number[][] = [];
    for (let j = 0; j < height; j++) {
      const row: number[] = [];
      const newRow: TileClass[] = [];
      for (let i = 0; i < width; i++) {
        row.push(0);
        newRow.push(new TileClass(0));
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
          t: j - 1 >= 0 ? newBoard[i][j - 1] : null,
          tr: (j - 1 >= 0 && i + 1 < width) ? newBoard[i + 1][j - 1] : null,
          r: i + 1 < width ? newBoard[i + 1][j] : null,
          br: (j + 1 < height && i + 1 < width) ? newBoard[i + 1][j + 1] : null,
          b: j + 1 < height ? newBoard[i][j + 1] : null,
          bl: (j + 1 < height && i - 1 >= 0) ? newBoard[i - 1][j + 1] : null,
          l: i - 1 >= 0 ? newBoard[i - 1][j] : null,
          tl: (j - 1 >= 0 && i - 1 >= 0) ? newBoard[i - 1][j - 1] : null,
        };
        newBoard[i][j].setNeighbor(n);
      }
    }

    for (let i = 0; i < mines; i++) {
      let tempIndex = Math.floor(Math.random() * tempTiles.length);
      board[tempTiles[tempIndex][0]][tempTiles[tempIndex][1]] = 1;
      hintBoard[tempTiles[tempIndex][0]][tempTiles[tempIndex][1]] = -1;

      newBoard[tempTiles[tempIndex][0]][tempTiles[tempIndex][1]].setValue(-1);

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
            if (hintBoard[mineList[i][0] + j][mineList[i][1] + k] != -1) {
              hintBoard[mineList[i][0] + j][mineList[i][1] + k]++;
            }
          }
        }
      }
    }
    setComBoard(newBoard);
  };

  console.log(comBoard);

  if (comBoard.length == 0) {
    init();
  }

  return (
    <div className="bg-[#ccc]">
      <div className="flex flex-col">
        {comBoard.map((r, y) => (
          <div key={y} className="flex flex-row w-full">
            {r.map((t, x) => (
              <div className="flex-1" key={x}>
                <button
                  onClick={() => {
                    // if (t == 0) {
                    //   const temp = [...checkBoard];
                    //   temp[x][y] = 1;
                    //   setCheckBoard(temp);
                    // }
                  }}
                >
                  <Tile t={comBoard[x][y]} />
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feild;
