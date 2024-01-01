import { isIntervalActive } from "../lib/utils";

function IntervalIndicator({
  value,
  intervals,
  indicatorColor,
  borderHighlightColor,
  highlight,
}: {
  value: number;
  intervals: number[];
  indicatorColor: string;
  borderHighlightColor: string;
  highlight: number[];
}) {
  return (
    <div className="flex flex-row gap-2">
      {intervals.map((interval, index) => {
        const isBoxUnlocked = isIntervalActive(interval, value);
        const boxContainsProblems = highlight.includes(interval);
        return (
          <div
            title={`${
              isBoxUnlocked ? "This box is included in this session" : "This box is not included in this session"
            } ${boxContainsProblems ? "and this box contains problems" : "and this box does not contain any problems"}`}
            key={index}
            className={`w-7 flex justify-center rounded-full ${
              isBoxUnlocked ? indicatorColor : "background-none"
            } border-2 ${boxContainsProblems && borderHighlightColor}`}
          >
            {interval}
          </div>
        );
      })}
    </div>
  );
}

export default IntervalIndicator;
