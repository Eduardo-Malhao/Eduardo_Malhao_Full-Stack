import React from "react";

import { useFormContext } from "react-hook-form";

import GenericInput from "../../../../Components/Ui/generic/generic";
import Input_Password from "../../../../Components/Ui/Input_Password/Input_Password";

import type { Reset_FormData } from "../../Types";


type FormProps = {
  onSubmit: () => void;
};

const Reset_Form: React.FC<FormProps> = ({
  onSubmit
}) => {

  const { handleSubmit, formState: { isValid } } = useFormContext<Reset_FormData>();


  return (
    <form
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          onSubmit();
        }
      }}

      onSubmit={handleSubmit(onSubmit)}
    >

      <div className="d-flex align-items-center justify-content-center">
        <span className="auth-text">Resetar Senha</span>
      </div>

      <div className="row h-auto align-items-start my-3">

        <div className="col-12">
          <GenericInput
            name="code"
            label="Código de Recuperação"
            isRequired
            iconClass="icon-code"
            placeholder="Digite o código enviado por email"
          />
        </div>

        <div className="col-12">
          <Input_Password
            name="new_password"
            label="Nova Senha"
            hideIcon="icon-eye-blocked"
            showIcon="icon-eye"
            isRequired
            placeholder="Digite sua senha"
          />
        </div>

        <div className="col-12">
          <Input_Password
            name="confirm_new_password"
            label="Confirmar Senha"
            hideIcon="icon-eye-blocked"
            showIcon="icon-eye"
            isRequired
            placeholder="Digite a confirmação da senha"
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
            Resetar
          </button>
        </div>
      </div>
    </form>
  );
};

export default Reset_Form;