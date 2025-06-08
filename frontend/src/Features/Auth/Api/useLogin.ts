import { client } from "../../../Client";
import { createMutation } from "react-query-kit";

import type { ApiResponse } from "../../../Types";
import type { IUser } from "../../Users/Types";
import type { IMe } from "../Types";


type Variables = {
  data: Partial<IUser>,
};

type Response = ApiResponse<IMe>;

type Error = { error: string };

export const useLogin = createMutation<
  Response,
  Variables,
  Error
>({
  mutationFn: async ({ data }) => {

    const response = await client.post<Response>(`/auth/login`, data);
    return response.data;
  }
});
