import { client } from "../../../Client";
import { createMutation } from "react-query-kit";


type Variables = {
  data: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
  },
};

type Response = { message: string };

type Error = { error: string };

export const useCreate = createMutation<
  Response,
  Variables,
  Error
>({
  mutationFn: async ({ data }) => {

    const response = await client.post<Response>(`/create`, data);
    return response.data;
  }
});
