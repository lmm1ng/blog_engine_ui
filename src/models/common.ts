export interface IResponse<T> {
  data: T
  meta?: {
    total: number
    limit: number
    page?: number
  }
}
