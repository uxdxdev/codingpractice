import { useEffect, useState } from "react";
import { fetchData, getRandomElement } from "../utils";
import { SHEET_DATABASE_API_URL } from "../constants";

function Home() {
  const [data, setData] = useState<Record<string, string>[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentProblem, setCurrentProblem] = useState(0);

  useEffect(() => {
    fetchData(SHEET_DATABASE_API_URL)
      .then((formattedData) => setData(formattedData))
      .then(() => setIsLoading(false));
  }, []);

  if (isLoading) return;

  const problemName = data && data[currentProblem]["Problem"];
  const problemUrl = data && data[currentProblem]["Link"];

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <a className="text-2xl" target="_blank" href={problemUrl}>
        {problemName}
      </a>

      <div className="space-x-3">
        <button
          onClick={() => setCurrentProblem(getRandomElement(data))}
          className="h-10 px-3 py-1 font-semibold rounded-md bg-black text-white"
        >
          Easy
        </button>
        <button
          onClick={() => setCurrentProblem(getRandomElement(data))}
          className="h-10 px-3 py-1 font-semibold rounded-md bg-red-400 text-white"
        >
          Hard
        </button>
      </div>
    </div>
  );
}

export default Home;
