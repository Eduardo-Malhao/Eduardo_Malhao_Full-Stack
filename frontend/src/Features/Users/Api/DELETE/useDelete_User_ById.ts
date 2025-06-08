import { client } from "../../../../Client";
import { createMutation } from "react-query-kit";
import { AxiosError } from "axios";

import type { ApiResponse } from "../../../../Types";


type Variables = {
  id_user: number;
};

type Response = ApiResponse<{ message: string}>;

type Error = {message: string};

export const useDelete_User_ById = createMutation<
  Response,
  Variables,
  AxiosError<Error>
>({
  mutationFn: async ({ id_user }) => {

    const response = await client.delete<Response>(`/users/delete/${id_user}`)
    return response.data;
  }
});
