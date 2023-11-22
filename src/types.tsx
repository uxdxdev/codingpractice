export interface SheetDataItem {
  problem: string;
  link: string;
}

export interface SheetData extends Array<SheetDataItem> {}

export interface Problem {
  name: string;
  link: string;
  box: string;
}

export interface Problems extends Array<Problem> {}

export interface StoredData {
  previousSessionDate: Date;
  currentDay: string;
  totalProblems: number;
  "1": Problems[];
  "2": Problems[];
  "3": Problems[];
  "4": Problems[];
  "5": Problems[];
}

export interface HomeProps {
  data: StoredData;
}
