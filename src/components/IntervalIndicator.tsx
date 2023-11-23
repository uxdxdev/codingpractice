import { isIntervalActive } from "../lib/utils";

function IntervalIndicator({
  value,
  intervals,
  indicatorColor,
}: {
  value: number;
  intervals: number[];
  indicatorColor: string;
}) {
  return (
    <div className="flex flex-row gap-2">
      {intervals.map((interval, index) => {
        return (
          <div
            key={index}
            className={`w-6 flex justify-center rounded-lg ${
              isIntervalActive(interval, value) ? indicatorColor : "background-none"
            }`}
          >
            {interval}
          </div>
        );
      })}
    </div>
  );
}

export default IntervalIndicator;
