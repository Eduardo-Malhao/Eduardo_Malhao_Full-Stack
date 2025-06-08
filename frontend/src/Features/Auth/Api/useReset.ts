import { client } from "../../../Client";
import { createMutation } from "react-query-kit";


type Variables = {
  data: {
    code: string;
    new_password: string;
    confirm_new_password: string;
  },
};

type Response = { error: string };

type Error = { error: string };

export const useReset = createMutation<
  Response,
  Variables,
  Error
>({
  mutationFn: async ({ data }) => {

    const response = await client.post<Response>(`/reset`, data);
    return response.data;
  }
});
