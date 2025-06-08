import { client } from "../../../../Client";
import { createMutation } from "react-query-kit";
import { AxiosError } from "axios";

import type { Profile_FormData } from "../../Validations";
import type { ApiResponse } from "../../../../Types";
import type { IProfile } from "../../Types";


type Variables = {
  id_user: number;
  data: FormData;
};

type Response = ApiResponse<IProfile>;

type Error = { message: string };

export const useUpdate_Profile = createMutation<
  Response,
  Variables,
  AxiosError<Error>
>({
  mutationFn: async ({ id_user, data }) => {

    const response = await client.put<Response>(`/users/update/${id_user}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }
});

export const convertProfileToFormData = (data: Profile_FormData) => {
  const formData = new FormData();

  formData.append("first_name", String(data.first_name));
  formData.append("last_name", String(data.last_name));
  formData.append("email", String(data.email));

  if (data.avatar) {
    formData.append("avatar", data.avatar!);
  }

  return formData;
}