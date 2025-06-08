import { createQuery } from "react-query-kit";
import { client } from "../../../../Client";
import type { AxiosError } from "axios";

import type { IProfile } from "../../Types";
import type { ApiResponse } from "../../../../Types";


type Variables = {
  id_user: number;
};

type Response = ApiResponse<IProfile>;

type Error = { message: string };

export const useGet_Profile = createQuery<
  Response,
  Variables,
  AxiosError<Error>
>({
  queryKey: ["user_by_id"],
  fetcher: async ({ id_user }) => {

    const response = await client.get<Response>(`/users/${id_user}`);
    return response.data;
  },
  refetchInterval: 300000,
  staleTime: 300000,
});