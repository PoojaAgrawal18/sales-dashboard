export const AUTH_API_ROUTES = {
  // Dev: use VITE_APP_BASE_URL= so requests go to same origin and Vite proxy forwards /api to backend.
  // Prod: use VITE_APP_BASE_URL=https://your-api.com/api so requests go directly to API.
  LOGIN: '/api/login',
  SIGNUP: '/api/signup',
  GOOGLE_LOGIN: '/admin/auth/bnc/login',
};
