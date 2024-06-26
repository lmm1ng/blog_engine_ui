export const API = {
  auth: {
    login: process.env.NEXT_PUBLIC_API_URL + '/api/v1/auth/login',
    register: process.env.NEXT_PUBLIC_API_URL + '/api/v1/auth/register',
    logout: process.env.NEXT_PUBLIC_API_URL + '/api/v1/auth/logout',
    user: process.env.NEXT_PUBLIC_API_URL + '/api/v1/auth/user',
  },
  posts: {
    feed: process.env.NEXT_PUBLIC_API_URL + '/api/v1/posts/feed',
    post: process.env.NEXT_PUBLIC_API_URL + '/api/v1/posts',
  },
  invites: {
    generate: process.env.NEXT_PUBLIC_API_URL + '/api/v1/invites/generate',
  },
}
