/* eslint-disable arrow-body-style */
import axiosClient from '../client/axios';
import { USER_API_ROUTES } from './constants';

export class UserAPIService {
  constructor() {
    this.client = axiosClient;
  }

  getSelfProfile = async () => {
    return this.client.get(USER_API_ROUTES.SELF_PROFILE);
  };


}
