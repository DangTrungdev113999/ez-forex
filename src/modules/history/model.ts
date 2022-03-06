export type HistoryItemType = {
  closeTime: number;
  createdAt: string;
  createdBy: number;
  icon: string;
  id: number;
  openPrice: number;
  pairs: string;
  realTimeUpdate: string;
  reason: string;
  sentOn: any;
  signalStatus: string;
  stopLoss: number;
  takeProfit: number;
  winRate: any;
  type: number;
  updatedAt: any;
  pip1: number;
  pip2: number;
  pip3: number;
  pipSl: number;
  pips: number;
  tp1: number;
  tp2: number;
  tp3: number;
};

export type HistoryStateType = {
  histories: Record<string, any>;
  fetchHistoriesLoading: boolean;

  isTheFirstOpenHistory: boolean;
};
