import { useEffect, useState } from "react";
import Home from "./Home";
import { LocalStorage } from "../services/storage.services";
import { fetchData } from "../lib/utils";
import { SHEET_DATABASE_API_URL } from "../constants";
import { SheetData, StoredData } from "../types";

const daysAgo = new Date();
daysAgo.setDate(daysAgo.getDate() - 3);

const defaultStoredData: StoredData = {
  previousSessionDate: daysAgo,
  currentDay: 1,
  boxes: {
    "1": [],
    "2": [],
    "3": [],
    "4": [],
    "5": [],
  },
};

function App() {
  const [isFetchingSheetData, setIsFetchingSheetData] = useState(true);
  const [isFetchingStoredData, setIsFetchingStoredData] = useState(true);
  const [sheetData, setSheetData] = useState<SheetData>([]);
  const [storedData, setStoredData] = useState<StoredData>(defaultStoredData);

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
      .then(() => setIsFetchingSheetData(false));
  }, []);

  useEffect(() => {
    if (!isFetchingSheetData && sheetData.length !== 0) {
      const rawStoredData = LocalStorage.getItem("data");
      if (rawStoredData) {
        const parsedSavedData: StoredData = JSON.parse(rawStoredData);
        const updatedSavedData = {
          ...parsedSavedData,
          previousSessionDate: new Date(),
        };
        setStoredData(updatedSavedData);
        LocalStorage.setItem("data", JSON.stringify(updatedSavedData));
      } else {
        sheetData.forEach((item) => defaultStoredData.boxes["1"].push({ name: item.problem, link: item.link }));
        setStoredData(defaultStoredData);
        LocalStorage.setItem("data", JSON.stringify(defaultStoredData));
      }

      setIsFetchingStoredData(false);
    }
  }, [sheetData, isFetchingSheetData]);

  useEffect(() => {
    if (storedData) {
      const today = new Date();
      if (
        storedData.previousSessionDate.getDate() !== today.getDate() ||
        storedData.previousSessionDate.getMonth() !== today.getMonth()
      ) {
        // set currentDay
        // const diffDays = today.getDate() - storedData.previousSessionDate.getDate();
        // console.log(diffDays);
      }
    }
  }, [storedData]);

  if (isFetchingSheetData || isFetchingStoredData) return;

  return (
    <>
      <div>Day {storedData.currentDay}</div>
      <button
        className="h-10 px-3 py-1 font-semibold rounded-md bg-black text-white"
        onClick={() => {
          const rawStoredData = LocalStorage.getItem("data");
          if (rawStoredData) {
            const parsedSavedData: StoredData = JSON.parse(rawStoredData);
            const updatedSavedData = {
              previousSessionDate: new Date(parsedSavedData.previousSessionDate),
              currentDay: parsedSavedData.currentDay + 1,
              boxes: parsedSavedData.boxes,
            };
            setStoredData(updatedSavedData);
            LocalStorage.setItem("data", JSON.stringify(updatedSavedData));
          }
        }}
      >
        Increment day
      </button>
      <Home boxes={storedData?.boxes} day={storedData.currentDay} />
    </>
  );
}

export default App;
