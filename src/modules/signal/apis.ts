import { ErrorAPI } from '~/common';
import baseApi from '~/common/baseApi';
import { SignalsType } from './model';

export function fetchSignalsApi(): Promise<SignalsType | ErrorAPI> {
  return baseApi.getApi('/signals');
}

export function fetchSignalsDetailApi({ id }: { id: number }): Promise<any | ErrorAPI> {
  return baseApi.getApi(`/signals/${id}`);
}
