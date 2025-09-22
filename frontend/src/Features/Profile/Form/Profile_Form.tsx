import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormContext } from "react-hook-form";

import GenericInput from "../../../Components/Ui/generic/generic";
import ImageInput from "../../../Components/Ui/Input_Image/Input_Image";

import type { Profile_FormData } from "../Validations";


type FormProps = {
  onSubmit: () => void;
};

const Profile_Form: React.FC<FormProps> = ({
  onSubmit
}) => {

  const navigate = useNavigate();

  const { handleSubmit, formState: { isValid, errors } } = useFormContext<Profile_FormData>();

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

      <ImageInput
        name="avatar"
        label="Foto de Perfil"
      />

      <div className="my-4" />

      <div className="row h-auto align-items-start">
        <div className="col-sm-6 col-12 mb-3">
          <GenericInput
            name="first_name"
            label="Nome"
            isRequired
            iconClass="icon-user"
            placeholder="Digite seu nome"
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


      <div className="row h-auto align-items-start justify-content-end mt-3">
        <div className="col-auto">
          <button
            className="btn btn-outline-danger"
            style={{ width: "100px" }}
            type="button"
            onClick={() => navigate("/home")}
          >
            Cancelar
          </button>
        </div>

        <div className="col-auto">
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

export default Profile_Form;