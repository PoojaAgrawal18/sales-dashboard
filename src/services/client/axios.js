import axios from 'axios';
import store from 'store';
import { toast } from 'react-toastify';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 3000,
  timeoutErrorMessage: 'Connection timed out',
});

axiosClient.interceptors.request.use((request) => {
  const accessToken = store.get('accessToken');
  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`;
  }
  return request;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;
    if (response) {
      const { data } = response;
      if (data) {
        toast.warning(data.message, {
          position: 'top-right',
          autoClose: '5000',
          hideProgressBar: true,
          closeButton: true,
          closeOnClick: true,
          draggable: false,
          progress: undefined,
          theme: 'colored',
        });
      }
    }
    throw error;
  }
);

export default axiosClient;
