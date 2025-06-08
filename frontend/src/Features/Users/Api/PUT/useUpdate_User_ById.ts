import { client } from "../../../../Client";
import { createMutation } from "react-query-kit";
import { AxiosError } from "axios";

import type { ApiResponse } from "../../../../Types";
import type { IUser } from "../../Types";
import type { IProfile } from "../../../Profile/Types";


type Variables = {
  id_user: number;
  data: Partial<IUser>;
};

type Response = ApiResponse<IProfile>;

type Error = { message: string };

export const useUpdate_User_ById = createMutation<
  Response,
  Variables,
  AxiosError<Error>
>({
  mutationFn: async ({ id_user, data }) => {

    const response = await client.put<Response>(`/users/update/${id_user}`, data);
    return response.data;
  }
});
