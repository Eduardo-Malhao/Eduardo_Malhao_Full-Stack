import React from "react";
import { useFormContext } from "react-hook-form";
import type { Edit_User_FormData } from "../../Types/FormData/Edit_User_FormData";
import GenericInput from "../../../../Components/Ui/generic/generic";


type FormProps = {
  onSubmit: () => void;
};

export const Edit_User_Form: React.FC<FormProps> = ({
  onSubmit
}) => {

  const { handleSubmit } = useFormContext<Edit_User_FormData>();

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

      <div className="row h-auto align-items-start">
        <div className="col-sm-6 col-12 mb-3">
          <GenericInput
            name="first_name"
            label="Nome"
            isRequired
            iconClass="icon-user"
            placeholder="Digite nome"
          />
        </div>

        <div className="col-sm-6 col-12 mb-3">
          <GenericInput
            name="last_name"
            label="Sobrenome"
            isRequired
            iconClass="icon-user"
            placeholder="Digite seu sobrenome"
          />
        </div>

        <div className="col-sm-6 col-12 mb-3">
          <GenericInput
            name="email"
            label="Email"
            isRequired
            iconClass="icon-email"
            placeholder="Digite seu email"
          />
        </div>
      </div>
    </form>
  );
}

export default Edit_User_Form;