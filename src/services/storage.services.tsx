import { StoredData } from "../types";

export class LocalStorage {
  static getItem(key: string) {
    return localStorage.getItem(key);
  }

  static setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  static removeItem(key: string) {
    localStorage.removeItem(key);
  }

  static clear() {
    localStorage.clear();
  }
}

export function updateProblemBox(problemName: string, boxNumber: string) {
  const rawDataJson = LocalStorage.getItem("data");
  if (rawDataJson) {
    const storedData: StoredData = JSON.parse(rawDataJson);
    const indexOfProblem = storedData.problems.findIndex((obj) => obj.name === problemName);
    storedData.problems[indexOfProblem].box = boxNumber;
    LocalStorage.setItem("data", JSON.stringify(storedData));
  }
}
