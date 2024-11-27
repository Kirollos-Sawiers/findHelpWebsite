import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import signup_img from "../../assets/signup_img.png";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Footer from './../footer/footer';
import { Link, useNavigate } from 'react-router-dom';
import { Password } from 'primereact/password';
import {
  faGoogle,
  faFacebook,
  faApple,
} from "@fortawesome/free-brands-svg-icons";
import { signUpWeb } from '../../features/auth/authSlice';
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
function Signup() {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(
    (state) => state.auth.user
  );
  const token = useSelector(
    (state) => state.auth.token
  );

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) =>{ 
const cred = {
  name: data.fullName,
  email: data.email,
  password: data.password,
  password_confirmation: data.password,
  phone: data.phoneNumber,
  phone_country: "EG",
}
dispatch(signUpWeb(cred));
}

  return (
    <Container className="p-0" fluid>
      <Navbar />
      <Container className="mb-5">
        <Row className="shadow-lg rounded-2xl">
          <Col className="flex flex-col items-center">
            <h1 className="pt-3 mb-4 text-center">{t("welcome_sign_in")}</h1>
            <form
              className="flex flex-col items-center w-full "
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                className="block w-2/3 h-10 px-2 mt-3 border-2 rounded-xl small"
                placeholder={t("full_name")}
                {...register("fullName", { required: true })}
              />
              {errors.fullName && (
                <p
                  className="w-2/3 mt-1 mb-0 ml-3 small"
                  style={{ textAlign: "left", color: "red" }}
                >
                  {t("field_required")}
                </p>
              )}

              {/* email */}
              <input
                className="block w-2/3 h-10 px-2 mt-3 border-2 rounded-xl small"
                placeholder={t("email")}
                {...register("email", {
                  required: true,
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                })}
              />
              {errors.email && (
                <p
                  className="w-2/3 mt-1 mb-0 ml-3 small"
                  style={{ textAlign: "left", color: "red" }}
                >
                  {t("email_validation")}
                </p>
              )}

              {/* phone */}
              <input
                type="number"
                className="block w-2/3 h-10 px-2 mt-3 border-2 rounded-xl small"
                placeholder={t("mobile")}
                {...register("phoneNumber", { required: true })}
              />
              {errors.phoneNumber && (
                <p
                  className="w-2/3 mt-1 mb-0 ml-3 small"
                  style={{ textAlign: "left", color: "red" }}
                >
                  {t("mobile_validation")}
                </p>
              )}

              {/* password */}
              <div className="card flex justify-content-center">
        </div>
              <input
                type={showPassword ? "text" : "password"}
                className="block w-2/3 h-10 px-2 mt-3 border-2 rounded-xl small"
                placeholder={t("password")}
                {...register("password", { required: true })}
              />
              {/* <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                onClick={togglePasswordVisibility}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              /> */}
              {errors.password && (
                <p
                  className="w-2/3 mt-1 mb-0 ml-3 small"
                  style={{ textAlign: "left", color: "red" }}
                >
                  {t("password_validation")}
                </p>
              )}

              {/* confirm password */}
              <input
                type={showPassword ? "text" : "password"}
                className="block w-2/3 h-10 px-2 mt-3 border-2 rounded-xl small"
                placeholder={t("confirm_password")}
                {...register("confirmPassword", { required: true })}
              />
              {errors.confirmPassword && (
                <p
                  className="w-2/3 mt-1 mb-0 ml-3 small"
                  style={{ textAlign: "left", color: "red" }}
                >
                  {t("field_required")}
                </p>
              )}

              <Button
                className="w-2/3 h-12 mt-3 mb-2 text-center"
                variant="warning"
                style={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "16px",
                  borderRadius: "15px",
                }}
                type="submit"
              >
                {t("signup")}
              </Button>
            </form>
            <div className="flex justify-center w-full my-2">
              <h6 className="text-center small mr-2">{t("have_account")}</h6>
              <Link to="/login" style={{textDecoration:"none",}}>
              <h6 className="font-bold small mx-1">{t("sign_in")}</h6>
              </Link>
            </div>
          </Col>
          <Col className="hidden p-0 md:block lg:block">
            <div className="flex justify-end">
              <Image
                className="rounded-tr-2xl rounded-br-2xl "
                src={signup_img}
              />
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </Container>
  );
}

export default Signup;
