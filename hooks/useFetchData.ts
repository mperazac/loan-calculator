import { UseQueryOptions, useQuery, QueryKey } from 'react-query';
import axios, { AxiosRequestConfig } from 'axios';

type Props<T> = {
  queryKey: QueryKey;
  url: string;
  params: { [key: string]: any };
  axiosConfig?: AxiosRequestConfig<T>;
  reactQueryOptions?: Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>;
};

const useFetchData = <T>({
  queryKey,
  url,
  params,
  axiosConfig,
  reactQueryOptions,
}: Props<T>) => {
  return useQuery({
    queryKey,
    queryFn: async (): Promise<T> => {
      const { data } = await axios.get<T>(url, { params, ...axiosConfig });
      return data;
    },
    ...reactQueryOptions,
  });
};

export default useFetchData;
