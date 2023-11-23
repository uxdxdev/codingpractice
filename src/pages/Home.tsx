import { useState, useMemo, useEffect } from "react";
import { getBoxes } from "../lib/utils";
import { Boxes, HomeProps, Problem } from "../types";
import { LocalStorage } from "../services/storage.services";
import IntervalIndicator from "../components/IntervalIndicator";
import { boxMapping, intervals } from "../constants";

function Home({ boxes, day }: HomeProps) {
  const [currentProblemSet, setCurrentProblemSet] = useState<Problem[]>([]);
  const [currentProblem, setCurrentProblem] = useState<Problem | null>(null);
  const [currentBoxNumbers, setCurrentBoxNumbers] = useState<string[]>([]);
  const [currentBoxNumber, setCurrentBoxNumber] = useState<number | null>(null);

  useEffect(() => {
    const currentBoxes = getBoxes({ intervals, value: day, mapping: boxMapping });
    setCurrentBoxNumbers(currentBoxes);
    if (currentBoxes.length > 0) {
      const boxNumber = currentBoxes.pop()!;
      setCurrentBoxNumber(Number(boxNumber));
      setCurrentProblemSet(boxes[boxNumber as keyof Boxes]);
    }
  }, [boxes, day]);

  useEffect(() => {
    if (currentProblemSet.length > 0) {
      const problem: Problem = currentProblemSet[0];
      setCurrentProblem(problem);
    } else {
      if (currentBoxNumbers.length > 0) {
        const boxNumber = currentBoxNumbers.pop()!;
        setCurrentBoxNumber(Number(boxNumber));
      }
    }
  }, [currentProblemSet, currentBoxNumbers]);

  const IntervalIndicatorMemo = useMemo(
    () => <IntervalIndicator value={day} intervals={intervals} indicatorColor="background-green" />,
    [day]
  );

  console.log(currentProblemSet);

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      {IntervalIndicatorMemo}
      <div>Prolems remaining {currentProblemSet?.length}</div>
      {!currentProblem ? (
        <div>All problems solved!</div>
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
                if (currentBoxNumber) {
                  const nextBoxNumber = currentBoxNumber < 5 ? currentBoxNumber + 1 : 5;
                  LocalStorage.addProblemToBox(currentProblem, String(nextBoxNumber));
                  LocalStorage.removeProblemFromBox(currentProblem, String(currentBoxNumber));
                  setCurrentProblemSet((state) => state.filter((problem) => problem.name != currentProblem.name));
                }
              }}
              className="h-10 px-3 py-1 font-semibold rounded-md bg-black text-white"
            >
              Easy
            </button>
            <button
              onClick={() => {
                if (currentBoxNumber) {
                  LocalStorage.addProblemToBox(currentProblem, "1");
                  LocalStorage.removeProblemFromBox(currentProblem, String(currentBoxNumber));
                  setCurrentProblemSet((state) => state.filter((problem) => problem.name != currentProblem.name));
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
