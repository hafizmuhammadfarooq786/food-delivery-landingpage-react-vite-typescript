import { ApiHandler } from './ApiHandler';
import { AxiosApiHandler } from './AxiosApiHandler';

let API_HANDLER: ApiHandler | null = null;

export function getApiHandler(): ApiHandler {
  API_HANDLER = new AxiosApiHandler();
  //eslint-disable-next-line
  return API_HANDLER!!;
}
