import { isIntervalActive } from "../lib/utils";

function IntervalIndicator({
  value,
  intervals,
  indicatorColor,
  borderHighlightColor,
  highlight,
  title,
}: {
  value: number;
  intervals: number[];
  indicatorColor: string;
  borderHighlightColor: string;
  highlight: number[];
  title: string;
}) {
  return (
    <div className="flex flex-row gap-2">
      {intervals.map((interval, index) => (
        <div
          title={title}
          key={index}
          className={`w-7 flex justify-center rounded-full ${
            isIntervalActive(interval, value) ? indicatorColor : "background-none"
          } border-2 ${highlight.includes(interval) && borderHighlightColor}`}
        >
          {interval}
        </div>
      ))}
    </div>
  );
}

export default IntervalIndicator;
