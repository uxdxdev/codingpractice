import { useState } from "react";
import { getRandomElement } from "../lib/utils";
import { HomeProps } from "../types";
import { updateProblemBox } from "../services/storage.services";

const dayBoxMapping: { [key: string]: string } = {
  "1": "1",
  "3": "2",
  "7": "3",
  "14": "4",
  "28": "5",
};

const DIFFICULTY_LEVELS = {
  EASY: "EASY",
  HARD: "HARD",
};

function handleDifficultySelection(selection: string, currentProblem: string, currentBoxNumber: string) {
  if (selection === DIFFICULTY_LEVELS.EASY) {
    const boxNumber = Number(currentBoxNumber) + 1;
    const nextBoxNumber = "" + (boxNumber <= 5 ? boxNumber : 5);
    updateProblemBox(currentProblem, nextBoxNumber);
  } else if (selection === DIFFICULTY_LEVELS.HARD) {
    updateProblemBox(currentProblem, "1");
  }
}

function Home({ data: { currentDay, problems } }: HomeProps) {
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const currentBoxNumber = dayBoxMapping[currentDay];
  const currentProblemSet = problems.filter((item) => item.box === currentBoxNumber);
  console.log(currentProblemSet);

  const problemName = currentProblemSet[currentProblemIndex]?.name;
  const problemUrl = currentProblemSet[currentProblemIndex]?.link;

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <a className="text-2xl" target="_blank" href={problemUrl}>
        {problemName}
      </a>

      <div className="space-x-3">
        <button
          onClick={() => {
            handleDifficultySelection(DIFFICULTY_LEVELS.EASY, problemName, currentBoxNumber);
            setCurrentProblemIndex(getRandomElement(currentProblemSet));
          }}
          className="h-10 px-3 py-1 font-semibold rounded-md bg-black text-white"
        >
          Easy
        </button>
        <button
          onClick={() => {
            handleDifficultySelection(DIFFICULTY_LEVELS.HARD, problemName, currentBoxNumber);
            setCurrentProblemIndex(getRandomElement(currentProblemSet));
          }}
          className="h-10 px-3 py-1 font-semibold rounded-md bg-red-400 text-white"
        >
          Hard
        </button>
      </div>
    </div>
  );
}

export default Home;
