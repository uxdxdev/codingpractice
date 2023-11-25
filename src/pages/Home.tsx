import { useState, useMemo, useEffect } from "react";
import { getBoxes } from "../lib/utils";
import { Boxes } from "../types";
import { LocalStorage } from "../services/storage.services";
import IntervalIndicator from "../components/IntervalIndicator";
import { intervals } from "../constants";
interface InMemoryProblem {
  name: string;
  link: string;
  box: number;
}

function Home({ day }: { day: number }) {
  const [currentProblemSet, setCurrentProblemSet] = useState<InMemoryProblem[] | null>(null);
  const [currentProblem, setCurrentProblem] = useState<InMemoryProblem | null>(null);
  const [done, setDone] = useState(true);
  const [boxes, setBoxes] = useState<Boxes | null>(null);

  useEffect(() => {
    const storedData = LocalStorage.getData();
    if (storedData) {
      setBoxes(storedData.boxes);
      setDone(storedData.done);
    }
  }, []);

  // on mount
  useEffect(() => {
    // get boxes based on day
    const currentBoxes = getBoxes({ intervals, value: day });
    if (!done && currentBoxes?.length > 0 && boxes) {
      // put all problems in todays problem set
      setCurrentProblemSet([]); // todo remove
      currentBoxes.forEach((box) => {
        setCurrentProblemSet(
          (state) => state && [...state, ...boxes[String(box) as keyof Boxes].map((p) => ({ ...p, box }))]
        );
      });
    }
  }, [done, boxes, day]);

  useEffect(() => {
    if (currentProblemSet && currentProblemSet.length > 0) {
      const problem: InMemoryProblem = currentProblemSet[0];
      setCurrentProblem(problem);
    }
  }, [currentProblemSet, boxes, currentProblem]);

  useEffect(() => {
    if (currentProblemSet && currentProblemSet.length === 0) {
      const storedData = LocalStorage.getData();
      if (storedData) {
        storedData.done = true;
        setDone(true);
        LocalStorage.setData(storedData);
      }
    }
  }, [currentProblemSet]);

  // highlight the boxes based on the current day
  const IntervalIndicatorMemo = useMemo(
    () => <IntervalIndicator value={day} intervals={intervals} indicatorColor="background-green" />,
    [day]
  );

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <div>Day {day} of practice</div>
      {IntervalIndicatorMemo}
      <div>Prolems remaining {currentProblemSet?.length || 0}</div>
      {done ? (
        <div>All problems solved for today!</div>
      ) : (
        <>
          <a
            className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600 text-2xl"
            target="_blank"
            href={currentProblem?.link}
          >
            {currentProblem?.name}
          </a>

          <div className="space-x-3">
            <button
              onClick={() => {
                if (currentProblem) {
                  const currentBoxIndex = intervals.indexOf(currentProblem.box);
                  const nextBox =
                    currentBoxIndex + 1 < intervals.length
                      ? intervals[currentBoxIndex + 1]
                      : intervals[intervals.length - 1];
                  LocalStorage.removeProblemFromBox(currentProblem, String(currentProblem.box));
                  LocalStorage.addProblemToBox(currentProblem, String(nextBox));
                  setCurrentProblemSet(
                    (state) => state && state.filter((problem) => problem.name != currentProblem.name)
                  );
                }
              }}
              className="h-10 px-3 py-1 font-semibold rounded-md bg-green-400 text-white"
            >
              Easy
            </button>
            <button
              onClick={() => {
                if (currentProblem) {
                  LocalStorage.removeProblemFromBox(currentProblem, String(currentProblem.box));
                  LocalStorage.addProblemToBox(currentProblem, "1");
                  setCurrentProblemSet(
                    (state) => state && state.filter((problem) => problem.name != currentProblem.name)
                  );
                }
              }}
              className="h-10 px-3 py-1 font-semibold rounded-md bg-red-400 text-white"
            >
              Hard
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
