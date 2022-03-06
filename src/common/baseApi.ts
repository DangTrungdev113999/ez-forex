// import Config from 'react-native-config';
// import apiSauce, { ApiResponse, ApisauceInstance, create, DEFAULT_HEADERS } from 'apisauce';
// import { Alert } from 'react-native';

// interface IApiHelper<T, R> {
//   getApi: (endpoint: string, params: T) => Promise<R | undefined>;
//   postApi: (endpoint: string, params: T) => Promise<R | undefined>;
//   putApi: (endpoint: string, params: T) => Promise<R | undefined>;
//   deleteApi: (endpoint: string, params: T) => Promise<R | undefined>;
// }

// export default class ApiHelper<T, R> implements IApiHelper<T, R> {
//   readonly api: ApisauceInstance;

//   private static instance: ApiHelper<any, any>;

//   private constructor() {
//     this.api = create({
//       baseURL: Config.BASE_URL,
//       headers: {
//         ...DEFAULT_HEADERS,
//         timeout: +Config.TIME_OUT_REQUEST_API,
//       },
//     });
//   }

//   public static getInstance = (): ApiHelper<any, any> => {
//     if (this.instance == null) {
//       this.instance = new ApiHelper<any, any>();
//     }
//     return this.instance;
//   };

//   addAuthenTokenToHeaders = (token: string) => {
//     this.api.setHeaders({
//       ...DEFAULT_HEADERS,
//       'x-auth-token': token,
//     });
//   };

//   callApiWithoutToken = () => {
//     this.api.setHeaders(DEFAULT_HEADERS);
//   };

//   getApi = async (endpoint: string, params?: T): Promise<R | undefined> => {
//     try {
//       const res = await this.api.get(endpoint, params);
//       this.hanldeErrorNetwork(res);
//       return res?.data as R;
//     } catch (error) {
//       Alert.alert('Error', error.message);
//     }
//     return undefined;
//   };

//   postApi = async (endpoint: string, params?: T): Promise<R | undefined> => {
//     try {
//       const res = await this.api.post(endpoint, params);
//       this.hanldeErrorNetwork(res);

//       console.log({ res });
//       return res?.data as R;
//     } catch (error) {
//       Alert.alert('Error', error.message);
//     }
//     return undefined;
//   };

//   putApi = async (endpoint: string, params?: T): Promise<R | undefined> => {
//     try {
//       const res = await this.api.put(endpoint, params);
//       this.hanldeErrorNetwork(res);
//       return res?.data as R;
//     } catch (error) {
//       Alert.alert('Error', error.message);
//     }
//     return undefined;
//   };

//   deleteApi = async (endpoint: string, params?: T): Promise<R | undefined> => {
//     try {
//       const res = await this.api.delete(endpoint, params);
//       this.hanldeErrorNetwork(res);
//       return res?.data as R;
//     } catch (error) {
//       Alert.alert('Error', error.message);
//     }
//     return undefined;
//   };

//   hanldeErrorNetwork = (res: ApiResponse<any, any>) => {
//     switch (res?.problem) {
//       case apiSauce.CONNECTION_ERROR:
//       case apiSauce.NETWORK_ERROR: {
//         Alert.alert('Error', 'Network Error. Please check connect network');
//         break;
//       }
//       default:
//         break;
//     }
//   };
// }

/* eslint-disable prefer-promise-reject-errors */
import _ from 'lodash';
import APISauce from 'apisauce';
// import i18next from 'i18next';
// import { signOut } from '@modules/auth/slice';
import Toast from 'react-native-toast-message';
import Config from 'react-native-config';
import { Alert } from 'react-native';
import { TIME_OUT_REQUEST_API, STATUS_HTTPS } from './config';
import { ErrorAPI } from './modals';
// import { store } from '../../redux/configStore';

let HEADERS: any = {
  Accept: 'application/json',
  'Cache-Control': 'no-cache',
  'Content-Type': 'application/json;charset=utf-8',
};

let HEADERS_MULTIPLE_PART: any = {
  Accept: 'application/json',
  'Cache-Control': 'no-cache',
  'Content-Type': 'multipart/form-data',
};

const setToken = (_token: string) => {
  HEADERS = {
    ...HEADERS,
    Authorization: `Bearer ${_token}`,
  };
  HEADERS_MULTIPLE_PART = {
    ...HEADERS_MULTIPLE_PART,
    Authorization: `Bearer ${_token}`,
  };
};

export const apiGlobal = APISauce.create({
  timeout: TIME_OUT_REQUEST_API,
  headers: HEADERS,
  baseURL: Config.BASE_URL,
});

const throttledResetToLogin = async response => {
  // store.dispatch(signOut());
};

const showToastError = () => {};

const handlingResponse = (response: any) =>
  new Promise((resolve, reject) => {
    if (response.status === STATUS_HTTPS.UNAUTHENTICATED) {
      reject({
        errorMessage: '401',
      });
      return throttledResetToLogin(response);
    }
    if (
      response.status >= STATUS_HTTPS.GREATER_RANGE_SUCCESS &&
      response.status < STATUS_HTTPS.SMALLER_RANGE_SUCCESS
    ) {
      return resolve(response.data);
    }

    switch (response.problem) {
      case APISauce.CONNECTION_ERROR:
      case APISauce.NETWORK_ERROR: {
        Alert.alert('Error', 'Network Error. Please check connect network');
        return reject({
          errorMessage: '',
        });
      }
      case APISauce.SERVER_ERROR:
      case APISauce.TIMEOUT_ERROR: {
        return reject({
          errorMessage: 'Server error!',
        });
      }
      default: {
        console.log('****Error', response);
        const error = {
          errorMessage: response.data?.message,
        };

        return reject(error);
      }
    }
  });

const baseApi = {
  getApi: async (endpoint: string, params?: any): Promise<any | ErrorAPI> => {
    console.log('*****GET', `${Config.BASE_URL}${endpoint}`, params);
    apiGlobal.setHeaders(HEADERS);
    return apiGlobal.get(endpoint, params).then(response => handlingResponse(response));
  },
  postApi: async (endpoint: string, params: any) => {
    console.log('*****POST', `${Config.BASE_URL}${endpoint}`, params);
    apiGlobal.setHeaders(HEADERS);
    return apiGlobal.post(endpoint, params).then(response => handlingResponse(response));
  },
  putApi: async (endpoint: string, params: any) => {
    console.log('*****PUT', `${Config.BASE_URL}${endpoint}`, params);
    apiGlobal.setHeaders(HEADERS);
    return apiGlobal.put(endpoint, params).then(response => handlingResponse(response));
  },
  postFormData: async (endpoint: string, params: any) => {
    console.log('******POST_FORM_DATA', `${Config.BASE_URL}${endpoint}`, params);
    apiGlobal.setHeaders(HEADERS_MULTIPLE_PART);

    const formData = new FormData();
    _.forIn(params, (value, key) => {
      if (value) {
        formData.append(key, value);
      }
    });
    return apiGlobal.post(endpoint, formData).then(response => handlingResponse(response));
  },
  deleteApi: async (endpoint: string, params: any) => {
    console.log('******DELETE', `${Config.BASE_URL}${endpoint}`, params);
    apiGlobal.setHeaders(HEADERS);
    return apiGlobal
      .delete(endpoint, {}, { data: params })
      .then(response => handlingResponse(response));
  },
};

export { baseApi, setToken };

export default baseApi;
