export enum TagEnum {
  all = 0,
  perf,
  suggest,
  bug,
  praise,
}
export interface IHeatmapTag {
  color: string
  value: string
  tag: TagEnum
}

export interface IHeatmapUrl {
  title: string
  url: string
}


export interface IHeatmapItem {
  url: IHeatmapUrl
  date: string
  tags: IHeatmapTag[]
}