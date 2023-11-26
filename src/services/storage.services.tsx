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

  static getData(): StoredData | null {
    const rawStoredData = LocalStorage.getItem("data");
    if (rawStoredData) {
      return JSON.parse(rawStoredData);
    }
    return null;
  }

  static setData(data: StoredData) {
    LocalStorage.setItem("data", JSON.stringify(data));
  }

  static addProblemToBox(problem: Problem, boxNumber: string) {
    const rawDataJson = LocalStorage.getItem("data");
    if (rawDataJson) {
      const storedData: StoredData = JSON.parse(rawDataJson);
      storedData.boxes[boxNumber as keyof Boxes].push({
        name: problem.name,
        link: problem.link,
        active: problem.active,
      });
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
