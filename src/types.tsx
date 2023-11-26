export interface SheetDataItem {
  problem: string;
  link: string;
}

export interface SheetData extends Array<SheetDataItem> {}

export interface Problem {
  name: string;
  link: string;
  active: boolean;
}

export interface Boxes {
  "1": Problem[];
  "3": Problem[];
  "7": Problem[];
  "14": Problem[];
  "28": Problem[];
}

export interface StoredData {
  prevSessionDate: Date;
  currentDay: number;
  boxes: Boxes;
  done: boolean;
}
