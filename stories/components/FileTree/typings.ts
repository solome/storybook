export interface Definitions {
	files: Record<string, string>;
	extensions: Record<string, string>;
	partials: Record<string, string>;
}


export enum FileType {
  FILE,
  DIRECTORY,
  MORE,
}

export interface IFileTree {
  fileName: string
  children?: IFileTree[]
  configure?: {
    highlight?: boolean
  }
}
