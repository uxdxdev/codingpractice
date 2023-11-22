import { Boxes, Problem, StoredData } from "../types";
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

  static addProblemToBox(problem: Problem, boxNumber: string) {
    const rawDataJson = LocalStorage.getItem("data");
    if (rawDataJson) {
      const storedData: StoredData = JSON.parse(rawDataJson);
      storedData.boxes[boxNumber as keyof Boxes].push(problem);
      LocalStorage.setItem("data", JSON.stringify(storedData));
    }
  }

  static removeProblemFromBox(problem: Problem, boxNumber: string) {
    const rawDataJson = LocalStorage.getItem("data");
    if (rawDataJson) {
      const storedData: StoredData = JSON.parse(rawDataJson);
      storedData.boxes[boxNumber as keyof Boxes] = storedData.boxes[boxNumber as keyof Boxes].filter(
        (item) => item.name != problem.name
      );
      LocalStorage.setItem("data", JSON.stringify(storedData));
    }
  }
}
