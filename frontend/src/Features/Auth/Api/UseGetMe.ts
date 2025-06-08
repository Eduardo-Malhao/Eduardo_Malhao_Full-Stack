import { createQuery } from "react-query-kit";
import type { AxiosError } from "axios";

import type { IMe } from "../Types";
import { client } from "../../../Client";

type Variables = void;

type Response = IMe;

type Error = {
  message: string;
};

export const useGetMe = createQuery<
  Response,
  Variables,
  AxiosError<Error>
>({
  queryKey: ["me"],
  fetcher: async () => {
    const response = await client.get<Response>("/auth/me");
    return response.data;
  },
  refetchInterval: 300000,
  staleTime: 300000,
});
