export type ChartDataPoint = {
  metric: string;
  at: number;
  value: number;
  unit: string;
};

export type Metric = string;

export interface ChartData {
  [index: string]: any;
};

export interface ChartDataProps {
  name: string;
  [index: string]: any;
}

export interface ChartDataResponse {
  metric: Metric,
  measurements: ChartDataPoint[]
};