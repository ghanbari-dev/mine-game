import { setNeighborType, tileType } from "@/types/tileType";

export default class TileClass {
  x: number;
  y: number;
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

  hintFunc: (a: any) => any;
  clickFunc: (a: any) => any;
  checkFunc: (a: any) => any;
  constructor(val: number, x: number, y: number) {
    this.x = x;
    this.y = y;
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

    this.hintFunc = () => {};
    this.clickFunc = () => {};
    this.checkFunc = () => {};
  }

  setValue(val: number) {
    this.value = val;
    this.hint = -1;

    this.checkHint();
  }

  checkHint() {
    this.top?.setHint();
    this.tr?.setHint();
    this.right?.setHint();
    this.br?.setHint();
    this.bottom?.setHint();
    this.bl?.setHint();
    this.left?.setHint();
    this.tl?.setHint();
  }

  setCheck() {
    this.checked = this.checked == 0 ? 1 : 0;
    this.checkFunc(this.checked);

    this.checkHint();
  }

  setClick() {
    if (this.checked == 1) {
      return;
    }
    this.clicked = 1;
    this.clickFunc(this.clicked);
    if (this.hint == 0) {
      if (this.top && this.top.clicked == 0) {
        this.top.setClick();
      }
      if (this.tr && this.tr.clicked == 0) {
        this.tr.setClick();
      }
      if (this.right && this.right.clicked == 0) {
        this.right.setClick();
      }
      if (this.br && this.br.clicked == 0) {
        this.br.setClick();
      }
      if (this.bottom && this.bottom.clicked == 0) {
        this.bottom.setClick();
      }
      if (this.bl && this.bl.clicked == 0) {
        this.bl.setClick();
      }
      if (this.left && this.left.clicked == 0) {
        this.left.setClick();
      }
      if (this.tl && this.tl.clicked == 0) {
        this.tl.setClick();
      }
    }
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
    if (this.top && this.top.checked == 1) {
      this.hint--;
    }
    if (this.tr && this.tr.checked == 1) {
      this.hint--;
    }
    if (this.right && this.right.checked == 1) {
      this.hint--;
    }
    if (this.br && this.br.checked == 1) {
      this.hint--;
    }
    if (this.bottom && this.bottom.checked == 1) {
      this.hint--;
    }
    if (this.bl && this.bl.checked == 1) {
      this.hint--;
    }
    if (this.left && this.left.checked == 1) {
      this.hint--;
    }
    if (this.tl && this.tl.checked == 1) {
      this.hint--;
    }

    if (this.hint == 0 && this.clicked == 1) {
      this.setClick();
    }

    this.hintFunc(this.hint);
  }

  setFuncs(hint: any, check: any, click: any) {
    this.hintFunc = hint;
    this.checkFunc = check;
    this.clickFunc = click;
  }
}
