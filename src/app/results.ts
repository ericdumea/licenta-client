import {Consumer} from './consumer';
import {ProviderInfo} from './provider-info';

export class Results {
  id: string;
  computedEnergy: number[];
  consumerDTO: Consumer;
  fitnessValue: number;
  providerInfoList: ProviderInfo[];

}
