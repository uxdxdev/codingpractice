export interface SheetDataItem {
  problem: string;
  link: string;
}

export interface SheetData extends Array<SheetDataItem> {}

export interface Problem {
  name: string;
  link: string;
}

export interface Boxes {
  "1": Problem[];
  "2": Problem[];
  "3": Problem[];
  "4": Problem[];
  "5": Problem[];
}

export interface StoredData {
  previousSessionDate: Date;
  currentDay: number;
  boxes: Boxes;
}

export interface HomeProps {
  boxes: Boxes;
  day: number;
}
