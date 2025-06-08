import React from "react";

import { useFormContext } from "react-hook-form";

import type { Auth_FormData } from "../../Types";
import GenericInput from "../../../../Components/Ui/generic/generic";
import Input_Password from "../../../../Components/Ui/Input_Password/Input_Password";



type FormProps = {
  onSubmit: () => void;
};

const Auth_Form: React.FC<FormProps> = ({
  onSubmit
}) => {

  const { handleSubmit, formState: { isValid } } = useFormContext<Auth_FormData>();


  return (
    <form
      className="mt-5"

      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          onSubmit();
        }
      }}

      onSubmit={handleSubmit(onSubmit)}
    >

      <div className="d-flex align-items-center justify-content-center">
      <span className="auth-text">LOGIN</span>
      </div>
      
      <div className="row h-auto align-items-start my-3">

        <div className="col-12">
          <GenericInput
            name="email"
            label="Email"
            isRequired
            iconClass="icon-email"
            placeholder="Digite seu email"
          />
        </div>

        <div className="col-12">
          <Input_Password
            name="password"
            label="Senha"
            hideIcon="icon-eye-blocked"
            showIcon="icon-eye"
            isRequired
            placeholder="Digite sua senha"
          />
        </div>
      </div>

      {/* Botões de ação */}
      <div className="row h-auto align-items-start justify-content-center mt-3">
        <div className="col-auto">
          <button
            className="btn btn-outline-secondary"
            style={{ width: "100px" }}
            type="submit"
            disabled={!isValid}
          >
            Logar
          </button>
        </div>
      </div>
    </form>
  );
};

export default Auth_Form;