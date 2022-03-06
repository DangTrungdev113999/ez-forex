export type PairItemType = {
  createdAt: string;
  updatedAt: string;
  createdBy: number;
  updatedBy: number;
  id: number;
  pairs: string;
  icon: string;
  price: number;
};

export type DiscoverAlertItem = {
  id: number;
  icon: any;
  name: string;
  type: string;
  typeName: string;
};

export type TimeFrameItemType = {
  id: number;
  name: string;
};

export type IndicatorItemType = {
  id: number;
  methodId: number;
  name: string;
  pivot: number;
};

export type ConditionItemType = {
  id: number;
  methodId: number;
  name: string;
  type: string;
};

export type AlertStateType = {
  wathlist: PairItemType[];
  fetchWathlistLoading: boolean;

  allWatchList: any;
  fetchAllWathlistLoading: boolean;

  allWatchListPage: number;
  loadMoreAllWatchListNoMore: boolean;
  loadmoreAllWatchListLoading: boolean;

  updateWathlistLoading: boolean;

  removeWathlistLoading: boolean;

  discoverAlert: Record<string, DiscoverAlertItem[]>;
  discoverAlertType: string[];
  fetchDiscoverAlertLoading: boolean;

  conditions: ConditionItemType[];
  fetchConditionsLoading: boolean;

  indicators: IndicatorItemType[];
  fetchIndicatorsLoading: boolean;

  timeFrames: TimeFrameItemType[];
  fetchTimeFramesLoading: boolean;

  updateDiscoverAlertLoading: boolean;

  subscribeAlert: Record<string, unknown>;

  isTheFirstOpenAlertTab: Record<string, boolean>;

  allAlert: Record<string, unknown>[];
  fetchAllAlertLoading: boolean;
  isTheFirstOpenAlertChannelScreen: boolean;

  removeAlertChannelLoading: boolean;

  allTimeFrame: String[];
  fetchAllTimeFrameLoading: boolean;

  allMethod: String[];
  fetchAllMethodLoading: boolean;

  alertsHistory: Record<string, unknown>[];
  fetchAlertsHistoryLoading: boolean;
  isTheFirstAlertsHistoryScreen: boolean;

  toggleNotificationLoading: boolean;
};
