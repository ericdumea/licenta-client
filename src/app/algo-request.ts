import {ProviderType} from './provider-type';

export class AlgoRequest {
  consumerId: string;
  numberOfIterations: number;
  numberOfFireflies: number;
  startHour: number;
  endHour: number;
  providerTypes: ProviderType[];
}
