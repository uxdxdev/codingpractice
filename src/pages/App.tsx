import { useEffect, useState } from "react";
import Home from "./Home";
import { LocalStorage } from "../services/storage.services";
import { fetchData } from "../utils";
import { SHEET_DATABASE_API_URL } from "../constants";
import { Problems, SheetData, StoredData } from "../types";

const defaultStoredData: StoredData = {
  previousSessionDate: new Date(),
  currentDay: "1",
  totalProblems: 0,
  "1": [],
  "2": [],
  "3": [],
  "4": [],
  "5": [],
};

function App() {
  const [isFetchingProblemLinks, setIsFetchingProblemLinks] = useState(true);
  const [sheetData, setSheetData] = useState<SheetData>([]);
  const [isFetchingStoredData, setIsFetchingStoredData] = useState(true);
  const [savedData, setSavedData] = useState<StoredData>(defaultStoredData);
  const [isMergingData, setIsMergingData] = useState(true);

  useEffect(() => {
    fetchData(SHEET_DATABASE_API_URL)
      .then((response) => {
        const formattedData: SheetData = response.map((item) => {
          return {
            problem: item.Problem,
            link: item.Link,
          };
        });
        setSheetData(formattedData);
      })
      .then(() => setIsFetchingProblemLinks(false));
  }, []);

  useEffect(() => {
    const rawStoredData = LocalStorage.getItem("data");
    try {
      if (rawStoredData) {
        const parsedSavedData: StoredData = JSON.parse(rawStoredData);
        const updatedSavedData = {
          ...parsedSavedData,
          previousSessionDate: new Date(parsedSavedData.previousSessionDate),
        };
        setSavedData(updatedSavedData);
      } else {
        LocalStorage.setItem("data", JSON.stringify(defaultStoredData));
      }
    } catch (e) {
      console.error(e);
    }
    setIsFetchingStoredData(false);
  }, []);

  useEffect(() => {
    if (!isFetchingStoredData && !isFetchingProblemLinks && sheetData.length !== savedData.totalProblems) {
      setIsMergingData(true);

      const updatedProblemSet: Problems = sheetData.map((item) => {
        return {
          name: item.problem,
          link: item.link,
          box: savedData.problems.find((value) => value.name === item.problem)?.box || "1",
        };
      });
      const storedData = LocalStorage.getItem("data");
      const updatedStoredData = storedData && JSON.parse(storedData);
      updatedStoredData.problems = updatedProblemSet;
      LocalStorage.setItem("data", JSON.stringify(updatedStoredData));

      setSavedData((current) => {
        return {
          ...current,
          problems: updatedProblemSet,
        };
      });
    }
    setIsMergingData(false);
  }, [sheetData, savedData, isFetchingProblemLinks, isFetchingStoredData]);

  useEffect(() => {
    const today = new Date();
    if (
      savedData.previousSessionDate.getDay() !== today.getDay() &&
      savedData.previousSessionDate.getMonth() !== today.getMonth()
    ) {
      const diffDays = today.getDay() - savedData.previousSessionDate.getDay();
      console.log(diffDays);
    }
  }, [savedData]);

  if (isFetchingProblemLinks || isFetchingStoredData || isMergingData) return;

  return <Home data={savedData} />;
}

export default App;
