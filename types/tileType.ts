import TileClass from "@/utils/TileClass";

export type tileType = TileClass | null;
export interface setNeighborType {
  t: tileType;
  tr: tileType;
  r: tileType;
  br: tileType;
  b: tileType;
  bl: tileType;
  l: tileType;
  tl: tileType;
}
