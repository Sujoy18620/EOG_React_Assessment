import { ChartData, ChartDataProps, Metric } from "./Chart.types";

/**
 * Get the charting data
 * @param measurements 
 * @param metrics 
 * @returns IChartData[]
 */
export const formatChartData = (measurements: ChartData, metrics: Metric[]): ChartDataProps[] => {
  const dataMap: any = {};
  Object.keys(measurements)
    .forEach((metric: Metric) => {
      measurements[metric].points.forEach((point: number[]) => {
        if (metrics.includes(metric)) {
          const [time, value] = point;
          if (!dataMap[time]) {
            dataMap[time] = {};
          }
          dataMap[time][metric] = value;
        }
      })
    });
  const keyMap = Object.keys(dataMap);
  return keyMap.map((key, i) => ({
    name: key,
    ...dataMap[keyMap[i - 1] || key],
    ...dataMap[key]
  }));
}

export const getChartUnits = (measurements: ChartData) => {
  const units: any = {};
  Object.keys(measurements).forEach((m: any) => {
    const name = measurements[m].name;
    const unit = measurements[m].points[0][2];
    units[name] = unit;
  });
  return units;
}

export const formatChartTicks = (tick: string) => {
  const date = new Date(tick);
  let hours = date.getHours();
  let minutes: any = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  const strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}

export const getChartTicks = (start: number, end: number) => {
  const ticks = [];
  let date = new Date(start);
  while (date.getTime() < end) {
    date.setMinutes(date.getMinutes() + 5);
    ticks.push(date.getTime());
  }
  return ticks;
}

export const formatTimeAgo = () => new Date().getTime() - 34 * 60 * 1000;