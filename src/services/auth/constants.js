const BASE_URL = import.meta.env.VITE_APP_BASE_URL || "";

export const AUTH_API_ROUTES = {
  LOGIN: `${BASE_URL}/api/login`,
  SIGNUP: `${BASE_URL}/api/signup`,
  GOOGLE_LOGIN: `${BASE_URL}/admin/auth/bnc/login`,
};