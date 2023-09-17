export interface IRecordData {
  total: number;
  data: IYearData[];
}

export interface IYearData {
  yearTotal: number;
  yearName: string;
  hidden?: boolean;
  yearData: IMonthData[];
}

export interface IMonthData {
  monthTotal: number;
  monthName: string;
  hidden?: boolean;
  monthData: IDayData[];
}

export interface IDayData {
  dayTotal: number;
  dayName: string;
  hidden?: boolean;
  dayData: IRecordItem[];
}

export interface IRecordItem {
  id: number;
  userId: number;
  organizationId: number;
  createTime: string;
  tags: string[];
  categoryId: number;
  categoryName: string;
  content: string;
  cost: number;
  date: string;
}

export interface IAddRecordParams {
  date: string;
  cost: number;
  tags: string[];
  category: string;
  content: string;
}

export interface IBaseDayData {
  cost: number;
  date: string;
}

export interface ILineChartData {
  x: string[];
  y: number[];
}

export type IPieChartData = IPieChartDataItem[];

export interface IPieChartDataItem {
  name: string;
  value: number;
}
