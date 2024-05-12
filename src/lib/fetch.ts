export default function _fetch<T = unknown>(
  url: string,
  options?: RequestInit,
): Promise<IResponse<T>> {
  return fetch(process.env.NEXT_PUBLIC_API_URL + '/api' + url, {
    ...options,
    credentials: 'same-origin',
  })
    .then(async res => {
      return res.json()
    })
    .catch(e => {
      console.log('err', e)
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
