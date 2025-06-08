import { client } from "../../../Client";
import { createMutation } from "react-query-kit";


type Variables = {
  email: string,
};

type Response = { message: string };

type Error = { message: string };

export const useForgot = createMutation<
  Response,
  Variables,
  Error
>({
  mutationFn: async ({ email }) => {

    const response = await client.post<Response>(`/forgot`, email);
    return response.data;
  }
});
