export interface IResponse<T> {
  data: T
  meta?: {
    total: number
    limit: number
    page?: number
  }
}

export interface IActionResponse<T> {
  err: unknown
  data: T
}
