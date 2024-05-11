export default function _fetch<T = unknown>(
  url: string,
  options?: RequestInit,
): Promise<IResponse<T>> {
  console.log('url', '/api' + url, options)
  return fetch('/api' + url, {
    ...options,
    credentials: 'same-origin',
  })
    .then(res => {
      console.log('res', res)
      return res.json()
    })
    .catch(e => {
      console.log(e)
    })
}

export interface IResponse<T> {
  data: T
  meta?: {
    total: number
    limit: number
    page?: number
  }
}
