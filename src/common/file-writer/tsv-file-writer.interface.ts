export interface TsvFileWriterInterface {
  readonly filename: string;
  write(row: string): void;
}