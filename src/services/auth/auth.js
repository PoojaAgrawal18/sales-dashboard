import axiosClient from '../client/axios';
import { AUTH_API_ROUTES } from './constants';

export class AuthAPIService {
  constructor() {
    this.client = axiosClient;
  }

  login = async ({ body }) => this.client.post(AUTH_API_ROUTES.LOGIN, body);
}
