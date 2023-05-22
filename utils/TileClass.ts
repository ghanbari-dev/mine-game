import { setNeighborType, tileType } from "@/types/tileType";

export default class TileClass {
  top: tileType;
  bottom: tileType;
  left: tileType;
  right: tileType;
  tl: tileType;
  tr: tileType;
  bl: tileType;
  br: tileType;

  value: number;
  clicked: number;
  checked: number;
  hint: number;
  constructor(val: number) {
    this.value = val;
    this.hint = 0;
    this.checked = 0;
    this.clicked = 0;

    this.top = null;
    this.bottom = null;
    this.left = null;
    this.right = null;

    this.tl = null;
    this.tr = null;
    this.bl = null;
    this.br = null;
  }

  setValue(val: number) {
    this.value = val;
    this.hint = -1;

    this.top?.setHint();
    this.tr?.setHint();
    this.right?.setHint();
    this.br?.setHint();
    this.bottom?.setHint();
    this.bl?.setHint();
    this.left?.setHint();
    this.tl?.setHint();
  }

  setNeighbor({ t, tr, r, br, b, bl, l, tl }: setNeighborType) {
    this.top = t;
    this.tr = tr;
    this.right = r;
    this.br = br;
    this.bottom = b;
    this.bl = bl;
    this.left = l;
    this.tl = tl;
  }

  setHint() {
    this.hint = 0;
    if (this.value == -1) {
        this.hint = -1;
        return;
    }
    if (this.top && this.top.value == -1) {
      this.hint++;
    }
    if (this.tr && this.tr.value == -1) {
      this.hint++;
    }
    if (this.right && this.right.value == -1) {
      this.hint++;
    }
    if (this.br && this.br.value == -1) {
      this.hint++;
    }
    if (this.bottom && this.bottom.value == -1) {
      this.hint++;
    }
    if (this.bl && this.bl.value == -1) {
      this.hint++;
    }
    if (this.left && this.left.value == -1) {
      this.hint++;
    }
    if (this.tl && this.tl.value == -1) {
      this.hint++;
    }
  }
}
