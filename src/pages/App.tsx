import { useEffect, useState } from "react";
import Home from "./Home";
import { LocalStorage } from "../services/storage.services";
import { fetchData } from "../lib/utils";
import { SHEET_DATABASE_API_URL, staticProblemSet } from "../constants";
import { Boxes, SheetData, StoredData, Problem } from "../types";

const defaultStoredData: StoredData = {
  prevSessionDate: new Date(),
  currentDay: 1,
  currentStreak: 1,
  streakHighScore: 1,
  boxes: {
    "1": [],
    "3": [],
    "7": [],
    "14": [],
    "28": [],
  },
  done: false,
};

function datediff(first: Date, second: Date) {
  return Math.round((second.valueOf() - first.valueOf()) / (1000 * 60 * 60 * 24));
}

function handleDataFormatting(data: Record<string, string>[]): SheetData {
  // reduce number of problems in DEV mode
  if (import.meta.env.DEV) {
    data = data.splice(0, 5);
  }
  return data.map((item) => {
    return {
      problem: item.Problem,
      link: item.Link,
    };
  });
}

function App() {
  const [sheetData, setSheetData] = useState<SheetData>([]);
  const [isFetchingSheetData, setIsFetchingSheetData] = useState(true);
  const [isUpdatingLocalStorage, setUpdatingLocalStorage] = useState(true);
  const [day, setDay] = useState(1);

  // on mount
  useEffect(() => {
    // get google sheets data
    fetchData(SHEET_DATABASE_API_URL)
      .then((response) => {
        const formattedData: SheetData = handleDataFormatting(response);
        setSheetData(formattedData);
      })
      .catch(() => {
        // failed to fetch sheet data, use static problem set
        const formattedData: SheetData = handleDataFormatting(staticProblemSet);
        setSheetData(formattedData);
      })
      .finally(() => {
        setIsFetchingSheetData(false);
      });
  }, []);

  // when sheet data is updated
  useEffect(() => {
    if (!isFetchingSheetData && sheetData.length !== 0) {
      // get data from local storage
      let storedLSData = LocalStorage.getData();
      if (!storedLSData) {
        // if no local storage data use default data and
        // add problems from google sheet
        storedLSData = defaultStoredData;
        sheetData.forEach((item) =>
          storedLSData?.boxes["1"].push({ name: item.problem, link: item.link, active: true })
        );
      } else {
        const today = new Date();
        const prevSession = new Date(storedLSData.prevSessionDate);
        if (
          prevSession.getFullYear() < today.getFullYear() ||
          (prevSession.getFullYear() === today.getFullYear() && prevSession.getMonth() < today.getMonth()) ||
          (prevSession.getFullYear() === today.getFullYear() &&
            prevSession.getMonth() === today.getMonth() &&
            prevSession.getDate() < today.getDate())
        ) {
          // new day of practice
          const dayNum = storedLSData.currentDay + 1 <= 28 ? storedLSData.currentDay + 1 : 1;
          storedLSData.currentDay = dayNum;

          if (!storedLSData.currentStreak) {
            storedLSData.currentStreak = 1;
          }
          storedLSData.currentStreak = datediff(prevSession, today) < 2 ? storedLSData.currentStreak + 1 : 1;

          if (!storedLSData.streakHighScore) {
            storedLSData.streakHighScore = 1;
          }
          storedLSData.streakHighScore =
            storedLSData.currentStreak > storedLSData.streakHighScore
              ? storedLSData.currentStreak
              : storedLSData.streakHighScore;
          storedLSData.prevSessionDate = today;
          storedLSData.done = false;
          Object.entries(storedLSData.boxes).forEach(([key, value]) => {
            if (storedLSData) {
              storedLSData.boxes[key as keyof Boxes] = value.map((item: Problem) => ({ ...item, active: true }));
            }
          });
        }
      }

      setDay(storedLSData.currentDay);

      // update local storage
      LocalStorage.setData(storedLSData);
      setUpdatingLocalStorage(false);
    }
  }, [sheetData, isFetchingSheetData]);

  if (isFetchingSheetData || isUpdatingLocalStorage) return;

  return (
    <>
      {import.meta.env.DEV && (
        <>
          <button
            className="m-2 h-10 px-3 py-1 font-semibold rounded-md bg-white"
            onClick={() => {
              const storedLSData = LocalStorage.getData();
              if (storedLSData) {
                const dayBefore = new Date(storedLSData.prevSessionDate);
                dayBefore.setDate(dayBefore.getDate() - 1);

                // local storage
                storedLSData.prevSessionDate = dayBefore;
                LocalStorage.setData(storedLSData);
                window.location.reload();
              }
            }}
          >
            Increment day +1
          </button>
          <button
            className="m-2 h-10 px-3 py-1 font-semibold rounded-md bg-white"
            onClick={() => {
              const storedLSData = LocalStorage.getData();
              if (storedLSData) {
                const dayBefore = new Date(storedLSData.prevSessionDate);
                dayBefore.setDate(dayBefore.getDate() - 2);

                // local storage
                storedLSData.prevSessionDate = dayBefore;
                LocalStorage.setData(storedLSData);
                window.location.reload();
              }
            }}
          >
            Increment day +2
          </button>
        </>
      )}

      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <Home day={day} />
    </>
  );
}

export default App;
