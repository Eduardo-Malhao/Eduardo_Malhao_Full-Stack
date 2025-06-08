import { client } from "../../../../Client";
import { createMutation } from "react-query-kit";
import { AxiosError } from "axios";


type Variables = {
  id_user: number;
  data: {
    actual_password: string;
    new_password: string;
  };
};

type Response = { message: string };

type Error = { message: string };

export const useUpdate_Password = createMutation<
  Response,
  Variables,
  AxiosError<Error>
>({
  mutationFn: async ({ id_user, data }) => {

    const response = await client.put<Response>(`/users/update/password/${id_user}`, data);
    return response.data;
  }
});