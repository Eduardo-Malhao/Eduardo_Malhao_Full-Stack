import React from "react";
import { useFormContext } from "react-hook-form";

import Input_Password from "../../../Components/Ui/Input_Password/Input_Password";

import type { Password_FormData } from "../Types";


type FormProps = {
  onSubmit: () => void;
};

export const Password_Form: React.FC<FormProps> = ({
  onSubmit
}) => {

  const { handleSubmit, formState: { isValid } } = useFormContext<Password_FormData>();

  return (
    <form
      className="content-background"

      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          onSubmit();
        }
      }}

      onSubmit={handleSubmit(onSubmit)}
    >

      <div className="row h-auto align-items-start">
        <div className="col-sm-4 col-12 mb-3">
          <Input_Password
            name="actual_password"
            label="Senha atual"
            hideIcon="icon-eye-blocked"
            showIcon="icon-eye"
            isRequired
            placeholder="Digite sua senha atual"
          />
        </div>
      </div>

      <div className="row h-auto align-items-start">
        <div className="col-sm-4 col-12 mb-3">
          <Input_Password
            name="new_password"
            label="Nova senha"
            hideIcon="icon-eye-blocked"
            showIcon="icon-eye"
            isRequired
            placeholder="Digite sua nova senha"
          />
        </div>

        <div className="col-sm-4 col-12 mb-3">
          <Input_Password
            name="confirm_new_password"
            label="Confirmar Senha"
            hideIcon="icon-eye-blocked"
            showIcon="icon-eye"
            isRequired
            placeholder="Digite sua nova senha"
          />
        </div>

        <div className="col-auto align-self-center">
          <button
            className="d-flex flex-row align-items-center btn btn-outline-secondary"
            style={{ width: "100px" }}
            type="submit"
            disabled={!isValid}
          >
            Salvar <i className="icon-floppy-disk ms-2" />
          </button>
        </div>
      </div>
    </form>
  );
}

export default Password_Form;