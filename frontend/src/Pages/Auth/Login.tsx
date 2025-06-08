import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import logo from "../../../public/Logo.png";

import useToast from '../../Hooks/useToast';
import { useLogin } from '../../Features/Auth/Api';
import { Auth_Schema } from '../../Features/Auth/Validations';

import type { Auth_FormData } from '../../Features/Auth/Types';
import Auth_Form from '../../Features/Auth/Components/Form/Auth_Form';

import './Auth.scss';
import CustomAlerts from '../../Components/CustomAlerts/CustomAlerts';


const Login: React.FC = () => {

  const navigate = useNavigate();
  const { toast, setToast } = useToast();

  const { mutate: login } = useLogin();

  const Form = useForm<Auth_FormData>({
    defaultValues: undefined,
    mode: "onChange",
    resolver: zodResolver(Auth_Schema),
  });

  const { handleSubmit, reset } = Form;


  useEffect(() => {

    reset({
      email: "",
      password: ""
    });

  }, [reset]);

  const onSubmit = async (data: Auth_FormData) => {

    login({ data: data }, {
      onSuccess: (response) => {
        setToast({
          message: "Login realizado com sucesso",
          type: "success"
        });

        const token = response.data.token;
        const user = {
          id: response.data.id,
          email: response.data.email,
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          avatar: response.data.avatar ?? null
        };
        localStorage.setItem("HMZ-Authentication-Token", token);
        localStorage.setItem("HMZ-Authenticated-User", JSON.stringify(user.id));
        return navigate("/home");
      },
      onError: (error) => {
        return setToast({
          message: error.error,
          type: "error"
        });
      },
    });
  };


  return (
    <div id="login" className="container-xxl">

      <div className="row align-items-center justify-content-center h-100">

        <div className="d-none d-md-block col-4 h-100">
          <div className="headline-container">

            <div className="headline">
              <h4>Simplificamos</h4>
              <h4>juntos</h4>
            </div>

            <div className="company-container">
              <div className="company">
                <span>Supply chain | Industrial | Systems</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 h-100">
          <div className='border-container'>
            <div className="auth-container">

              <div className="logo-container">
                <img
                  src={logo}
                  alt="logo"
                  className='logo'
                />
              </div>

              <FormProvider {...Form}>
                <Auth_Form
                  onSubmit={handleSubmit(onSubmit)}
                />
              </FormProvider>

              <div className="row my-4 w-100">
                <div className="col-12 col-sm-6 my-2 text-center text-sm-start">
                  <a
                    className="auth-text auth-link"
                    onClick={() => navigate("/reset")}
                  >
                    ESQUECI MINHA SENHA
                  </a>
                </div>

                <div className="col-12 col-sm-6 my-2 text-center text-sm-end">
                  <a
                    className="auth-text auth-link"
                    onClick={() => navigate("/register")}
                  >
                    CADASTRE-SE
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {toast.message && toast.type && (
        <CustomAlerts
          message={toast.message}
          type={toast.type}
        />
      )}
    </div>
  )
}

export default Login;