export interface SignalItemType {
  createdAt: any;
  updatedAt: any;
  createdBy: number;
  updatedBy: number;
  id: number;
  pairs: string;
  icon: any;
  closeTime: number;
  sentOn: any;
  openPrice: number;
  takeProfit: number;
  tp1: number;
  tp2: number;
  tp3: number;
  stopLoss: number;
  signalStatus: string;
  type: any;
  reason: string;
  pip1: number;
  pip2: number;
  pip3: number;
  pipSl: number;
  pips: number;
  realTimeUpdate: string;
}

export type SignalsType = Record<string, SignalItemType>;

export type SignalStateType = {
  signals: SignalsType | Record<string, unknown>;
  fetchSignalsLoading: boolean;

  isTheFirstOpenTabSignal: boolean;
};
