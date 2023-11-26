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
  const [boxes, setBoxes] = useState<Boxes | null>(null);
  const [done, setDone] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // init
  useEffect(() => {
    const storedData = LocalStorage.getData();
    if (storedData) {
      setBoxes(storedData.boxes);
      setDone(storedData.done);
    }
  }, []);

  useEffect(() => {
    // get boxes based on day
    const currentBoxes = getBoxes({ intervals, value: day });
    if (currentBoxes?.length > 0 && boxes) {
      // put all todays problems in set
      const ps: InMemoryProblem[] = [];
      currentBoxes.forEach((box) => {
        ps.push(...boxes[String(box) as keyof Boxes].map((p) => ({ ...p, box })));
      });
      setCurrentProblemSet(ps);
    }
  }, [boxes, day]);

  // figure out if the problem set is complete or get the next problem
  useEffect(() => {
    if (currentProblemSet && currentProblemSet.length === 0) {
      const storedData = LocalStorage.getData();
      if (storedData) {
        storedData.done = true;
        LocalStorage.setData(storedData);
        setDone(true);
      }
    } else if (currentProblemSet) {
      const problem: InMemoryProblem = currentProblemSet[0];
      setCurrentProblem(problem);
    }
  }, [isLoading, currentProblemSet]);

  // highlight the intervals based on the current day
  const IntervalIndicatorMemo = useMemo(
    () => <IntervalIndicator value={day} intervals={intervals} indicatorColor="background-green" />,
    [day]
  );

  // prevent render flash
  useEffect(() => {
    if ((currentProblemSet !== null || currentProblem !== null) && boxes !== null && done !== null) {
      setIsLoading(false);
    }
  }, [currentProblemSet, currentProblem, boxes, done]);

  if (isLoading) return;

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4 mb-auto">
      <div className="text-2xl">Day {day} of practice</div>
      {IntervalIndicatorMemo}
      {done ? (
        <div>All problems solved for today!</div>
      ) : (
        <>
          <div>Prolems remaining {currentProblemSet?.length || 0}</div>
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
      <div className="text-xs">
        Found an issue? report it on{" "}
        <a
          className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
          href="https://github.com/uxdxdev/codingpractice/issues"
        >
          GitHub
        </a>
      </div>
    </div>
  );
}

export default Home;
