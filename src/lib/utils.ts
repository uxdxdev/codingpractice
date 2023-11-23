export function reduceResponseToObject(response: { values: [] }) {
  const data = response.values.slice();
  const obj = data
    .map((entry) => entry)
    .reduce((acc, cur) => {
      return { ...acc, ...{ [cur[0]]: cur[1] } };
    }, {});
  return obj;
}

export function responseValues(response: { values: [[], string] }): Record<string, string>[] {
  const keys = response.values[0];
  const data = response.values.slice(1);
  const array = data.map((arr) => Object.assign({}, ...keys.map((k, i) => ({ [k]: arr[i] }))));
  return array;
}

export function fetchData(url: string) {
  return fetch(url)
    .then((res) => res.json())
    .then((json) => responseValues(json));
}

export function getRandomElement<T>(data: T[]): number {
  const max = data.length - 1;
  return Math.floor(Math.random() * max);
}

export const isIntervalActive = (interval: number, value: number) => value % interval === 0;

export function getBoxes({
  intervals,
  value,
  mapping,
}: {
  intervals: number[];
  value: number;
  mapping: { [key: number]: string };
}) {
  const boxes: string[] = [];
  intervals.forEach((interval) => {
    if (isIntervalActive(interval, value)) {
      boxes.push(mapping[interval]);
    }
  });
  return boxes;
}
