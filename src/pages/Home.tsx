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
  active: boolean;
}

function Home({ day }: { day: number }) {
  const [currentProblemSet, setCurrentProblemSet] = useState<InMemoryProblem[] | null>(null);
  const [currentProblem, setCurrentProblem] = useState<InMemoryProblem | null>(null);
  const [boxes, setBoxes] = useState<Boxes | null>(null);
  const [done, setDone] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [totalNumberOfProblems, setTotalNumberOfProblems] = useState(0);
  const [boxesWithProblems, setBoxesWithProblems] = useState<number[]>([]);

  // init
  useEffect(() => {
    const storedData = LocalStorage.getData();
    if (storedData) {
      setBoxes(storedData.boxes);

      setDone(storedData.done);
    }
  }, []);

  useEffect(() => {
    const storedData = LocalStorage.getData();
    if (storedData) {
      const problemData = Object.entries(storedData.boxes).reduce(
        (
          acc: {
            boxes: number[];
            total: number;
          },
          [key, value]
        ) => {
          value.length > 0 && acc.boxes.push(+key);
          acc.total = acc.total + value.length;
          return acc;
        },
        { boxes: [], total: 0 }
      );
      setTotalNumberOfProblems(problemData.total);
      setBoxesWithProblems(problemData.boxes);
    }
  }, [currentProblem]);

  useEffect(() => {
    // get boxes based on day
    const currentBoxes = getBoxes({ intervals, value: day });
    if (currentBoxes?.length > 0 && boxes) {
      // put all todays problems in set
      const ps: InMemoryProblem[] = [];
      currentBoxes.reverse().forEach((box) => {
        ps.push(...boxes[String(box) as keyof Boxes].filter((item) => item.active).map((p) => ({ ...p, box })));
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
    () => (
      <IntervalIndicator
        title={"Day of practice box, border to indicate problems exist"}
        value={day}
        intervals={intervals}
        indicatorColor="bg-sky-300"
        borderHighlightColor="border-fuchsia-500"
        highlight={boxesWithProblems}
      />
    ),
    [day, boxesWithProblems]
  );

  // prevent render flash
  useEffect(() => {
    if ((currentProblemSet !== null || currentProblem !== null) && boxes !== null && done !== null) {
      setIsLoading(false);
    }
  }, [currentProblemSet, currentProblem, boxes, done]);

  if (isLoading) return;

  return (
    <div className="h-full flex flex-col items-center justify-center mb-auto">
      <div className="text-2xl mb-4">Day {day} of practice</div>
      {IntervalIndicatorMemo}

      <div className="my-16">
        {done ? (
          <div className="text-2xl">All problems solved for today!</div>
        ) : (
          <a
            className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600 text-2xl"
            target="_blank"
            href={currentProblem?.link}
          >
            {currentProblem?.name}
          </a>
        )}
      </div>

      <div className="space-x-3">
        <button
          disabled={done}
          title="Move to next box"
          onClick={() => {
            if (currentProblem) {
              const currentBoxIndex = intervals.indexOf(currentProblem.box);
              const nextBox =
                currentBoxIndex + 1 < intervals.length
                  ? intervals[currentBoxIndex + 1]
                  : intervals[intervals.length - 1];
              LocalStorage.removeProblemFromBox(currentProblem, String(currentProblem.box));
              currentProblem.active = false;
              LocalStorage.addProblemToBox(currentProblem, String(nextBox));
              setCurrentProblemSet((state) => state && state.filter((problem) => problem.name != currentProblem.name));
            }
          }}
          className="h-10 px-3 py-1 font-semibold rounded-md bg-green-400 text-white"
        >
          Move to next box
        </button>
        <button
          disabled={done}
          title="Try again tomorrow"
          onClick={() => {
            if (currentProblem) {
              LocalStorage.removeProblemFromBox(currentProblem, String(currentProblem.box));
              currentProblem.active = false;
              LocalStorage.addProblemToBox(currentProblem, "1");
              setCurrentProblemSet((state) => state && state.filter((problem) => problem.name != currentProblem.name));
            }
          }}
          className="h-10 px-3 py-1 font-semibold rounded-md bg-red-400 text-white"
        >
          Try again tomorrow
        </button>
      </div>
      <div className="my-2">
        Problems remaining {currentProblemSet?.length || 0}/{totalNumberOfProblems}
      </div>

      <div className="text-xs">
        Found an issue? report it on{" "}
        <a
          className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
          href="https://github.com/uxdxdev/codingpractice/issues"
          target="_blank"
        >
          GitHub
        </a>
      </div>
    </div>
  );
}

export default Home;
