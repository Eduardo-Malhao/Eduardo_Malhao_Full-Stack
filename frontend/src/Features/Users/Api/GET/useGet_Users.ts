import { createQuery } from "react-query-kit";
import { client } from "../../../../Client";
import type { AxiosError } from "axios";


type Variables = void;

type Response = any;

type Error = any;

export const useGet_Users = createQuery<
  Response,
  Variables,
  AxiosError<Error>
>({
  queryKey: ["users-fake"],
  fetcher: async () => {

    const response = await client.get<Response>("/users");
    return response.data;
  },
});