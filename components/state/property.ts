import { baseApi as api } from './baseApi';

type HouseData = {
  _id: string;
  houseType: string;
  state: string;
  city: string;
  locationData: LocationDataTypes;
  gender: string;
  securityMeasures: string[];
};

export type LocationDataTypes = {
  generic_location: string[];
  main_location: string;
  coordinate: {
    longitude: number;
    latitude: number;
  };
  place_id: string;
  reference: string;
  local_address: {
    state: string;
    city: string;
    town: string;
  };
};

export type DOC = {
  _id: string;
  listing: HouseData;
  name: string;
  roomType: string;
  units: number;
  title: string;
  description: string;
  amenities: string[];
  paymentOption: string;
  pricing: number;
  additionalFee: string[];
  variantImages: string[];
  status: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
};

export type DOCS = DOC[];
type PropertyType = {
  docs: DOCS;
  message: string;
  totalDoc: number;
  page: string;
};
export type APIFetching = {
  roomType?: string;
  location?: string;
  page?: number;
  limit?: number;
};
export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  profilePicture: any[];
};

export type Feedback = {
  _id: string;
  variant: string;
  user: User;
  comment: string;
  rating?: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type FeedbackResponse = {
  message: string;
  feedbacks: Feedback[];
};

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    apiServicesAppPropertyListApi: build.query<PropertyType, APIFetching>({
      query: (queryArg) => ({
        url: '/api/v1/variants',
        method: 'GET',
        params: {
          roomType: queryArg.roomType,
          location: queryArg.location,
          page: queryArg.page,
          limit: 20,
        },
      }),
    }),
    apiServicesAppFeedbacksListApi: build.query<FeedbackResponse, { rating?: number }>({
      query: () => ({
        url: '/api/v1/dashboard/general-feedback',
        method: 'GET',
        params: {
          // rating: queryArg.rating,
          page: 1,
          limit: 10,
        },
      }),
    }),
  }),
});
export const {
  useLazyApiServicesAppPropertyListApiQuery,
  useApiServicesAppPropertyListApiQuery,
  useApiServicesAppFeedbacksListApiQuery,
} = injectedRtkApi;
