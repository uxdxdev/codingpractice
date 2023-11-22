import { useState } from "react";
import { getRandomElement } from "../lib/utils";
import { HomeProps, Problem } from "../types";
import { LocalStorage } from "../services/storage.services";

const DIFFICULTY_LEVELS = {
  EASY: "EASY",
  HARD: "HARD",
};

function handleDifficultySelection(selection: string, currentProblem: Problem, currentBoxNumber: string) {
  let nextBoxNumber = currentBoxNumber;
  if (selection === DIFFICULTY_LEVELS.EASY) {
    const tempNextBoxNumber = Number(nextBoxNumber) + 1;
    nextBoxNumber = "" + (tempNextBoxNumber <= 5 ? tempNextBoxNumber : 5);
  } else if (selection === DIFFICULTY_LEVELS.HARD) {
    LocalStorage.addProblemToBox(currentProblem, "1");
  }
  LocalStorage.removeProblemFromBox(currentProblem, currentBoxNumber);
  LocalStorage.addProblemToBox(currentProblem, nextBoxNumber);
}

function Home({ currentBoxNumber, currentDay, currentProblemSet }: HomeProps) {
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const problem = currentProblemSet[currentProblemIndex];

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <div className="flex flex-row gap-2">
        <div
          className={`w-6 flex justify-center rounded-lg ${currentDay === "1" ? "background-red" : "background-none"}`}
        >
          1
        </div>
        <div
          className={`w-6 flex justify-center rounded-lg ${currentDay === "3" ? "background-red" : "background-none"}`}
        >
          3
        </div>
        <div
          className={`w-6 flex justify-center rounded-lg ${currentDay === "7" ? "background-red" : "background-none"}`}
        >
          7
        </div>
        <div
          className={`w-6 flex justify-center rounded-lg ${currentDay === "14" ? "background-red" : "background-none"}`}
        >
          14
        </div>
        <div
          className={`w-6 flex justify-center rounded-lg ${currentDay === "28" ? "background-red" : "background-none"}`}
        >
          28
        </div>
      </div>
      <div>Prolems remaining {currentProblemSet?.length}</div>
      {!problem ? (
        <div>All problems solved!</div>
      ) : (
        <>
          <a className="text-2xl" target="_blank" href={problem?.link}>
            {problem?.name}
          </a>

          <div className="space-x-3">
            <button
              onClick={() => {
                handleDifficultySelection(DIFFICULTY_LEVELS.EASY, problem, currentBoxNumber);
                setCurrentProblemIndex(getRandomElement(currentProblemSet));
              }}
              className="h-10 px-3 py-1 font-semibold rounded-md bg-black text-white"
            >
              Easy
            </button>
            <button
              onClick={() => {
                handleDifficultySelection(DIFFICULTY_LEVELS.HARD, problem, currentBoxNumber);
                setCurrentProblemIndex(getRandomElement(currentProblemSet));
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
