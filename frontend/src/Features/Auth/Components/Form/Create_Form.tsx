import React from "react";

import { useFormContext } from "react-hook-form";

import GenericInput from "../../../../Components/Ui/generic/generic";
import Input_Password from "../../../../Components/Ui/Input_Password/Input_Password";

import type { Create_FormData } from "../../Types";


type FormProps = {
  onSubmit: () => void;
};

const Auth_Form: React.FC<FormProps> = ({
  onSubmit
}) => {

  const { handleSubmit, formState: { isValid } } = useFormContext<Create_FormData>();


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
        <span className="auth-text">Registro</span>
      </div>

      <div className="row h-auto align-items-start my-3">

        <div className="col-12">
          <GenericInput
            name="first_name"
            label="Nome"
            isRequired
            iconClass="icon-user"
            placeholder="Digite seu nome"
          />
        </div>

        <div className="col-12">
          <GenericInput
            name="last_name"
            label="Sobrenome"
            isRequired
            iconClass="icon-user"
            placeholder="Digite seu sobrenome"
          />
        </div>

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

        <div className="col-12">
          <Input_Password
            name="confirm_password"
            label="Confirmar Senha"
            hideIcon="icon-eye-blocked"
            showIcon="icon-eye"
            isRequired
            placeholder="Digite sua confirmação de senha"
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
            Criar
          </button>
        </div>
      </div>
    </form>
  );
};

export default Auth_Form;