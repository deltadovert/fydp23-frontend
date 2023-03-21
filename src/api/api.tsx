import React from 'react';
import BASE_URL, { ENDPOINTS } from './endpoints.const';
import {
  IBrewSchedule,
  IBrewStatus,
  IScheduledBrew,
  ISingleBrew,
} from './types/types';

export class API {
  async post(path: string, data: { [key: string]: any }) {
    console.log(`💭 POST ${path}`);
    console.log(JSON.stringify(data));
    return fetch(`${BASE_URL}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(`😜 - ${JSON.stringify(data)}`);
        return data;
      })
      .catch((err) => {
        console.log(`😵 - ${JSON.stringify(err)}`);
        throw err;
      });
  }

  async get(path: string) {
    console.log(`💭 GET ${path}`);
    return fetch(`${BASE_URL}${path}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(`😜 - ${JSON.stringify(data)}`);
        return data;
      })
      .catch((err) => {
        console.log(`😵 - ${JSON.stringify(err)}`);
        throw err;
      });
  }

  async postSingleBrew(data: ISingleBrew) {
    return this.post(ENDPOINTS.single, data);
  }

  async postScheduledBrew(data: IScheduledBrew) {
    return this.post(ENDPOINTS.schedule, data);
  }

  async getStatus(): Promise<IBrewStatus> {
    return this.get(ENDPOINTS.status);
  }

  async getSchedule(): Promise<IBrewSchedule> {
    return this.get(ENDPOINTS.schedule);
  }

  async demo(action) {
    return await this.post('/demo', action);
  }
}

const APIContext = React.createContext(new API());
export const useAPI = () => React.useContext(APIContext);
