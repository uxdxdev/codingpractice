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
  const [currentStreak, setCurrentStreak] = useState(1);
  const [streakHighScore, setStreakHighScore] = useState(1);

  // init
  useEffect(() => {
    const storedData = LocalStorage.getData();
    if (storedData) {
      setBoxes(storedData.boxes);
      setDone(storedData.done);
      setCurrentStreak(storedData.currentStreak);
      setStreakHighScore(storedData.streakHighScore);
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
        indicatorColor="bg-fuchsia-700"
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
    <div className="bg-slate-800 text-white h-full flex flex-col items-center justify-center mb-auto">
      <div className="text-2xl mb-1">Day {day} of practice</div>
      <div className="text- mb-6">
        <span className="animate-pulse text-2xl">🔥</span> {currentStreak} day streak{" "}
        <span className="animate-pulse text-2xl">🔥</span>
      </div>
      {IntervalIndicatorMemo}

      <div className="my-16">
        {done ? (
          <div className="flex items-center">
            <div className="animate-pulse text-6xl">🔥</div>
            <div className="flex flex-col">
              <div className="text-2xl text-center">All done for today</div>
              <div className="text-center">Come back tomorrow to continue your streak!</div>
            </div>
            <div className="animate-pulse text-6xl">🔥</div>
          </div>
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

      <div className="flex gap-x-4">
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
          className="h-10 px-3 py-1 font-semibold rounded-md border-2 border-green-600 bg-green-400 text-white"
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
          className="h-10 px-3 py-1 font-semibold rounded-md border-2 border-red-600 bg-red-400 text-white"
        >
          Try again tomorrow
        </button>
      </div>
      <div className="my-4">
        {currentProblemSet?.length || 0}/{totalNumberOfProblems}
      </div>

      <div className="text-xs mb-4">
        Found an issue? report it on{" "}
        <a
          className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
          href="https://github.com/uxdxdev/codingpractice/issues"
          target="_blank"
        >
          GitHub
        </a>
      </div>
      <div className="text-s">🏆 Highscore {streakHighScore} day streak 🏆</div>
    </div>
  );
}

export default Home;
