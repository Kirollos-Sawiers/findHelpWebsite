import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import login_img from "../../assets/login_img.png";
import loginIMG from "../../assets/loginIMG.png";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Footer from "./../footer/footer";
import {
  faGoogle,
  faFacebook,
  faApple,
} from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginWeb } from "../../features/auth/authSlice";
import ErrorModal from './errorModal';
import { useTranslation } from "react-i18next";

function Login() {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false); // Added state
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const { status, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (error && formSubmitted) { // Check both error and formSubmitted
      setErrorMessage(error);
      setShowErrorModal(true);
      setFormSubmitted(false); // Reset after handling
    }
  }, [error, formSubmitted]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setFormSubmitted(true); // Set to true when form is submitted
    const cred = {
      email: data.email,
      password: data.password,
      verify_type: 'email_otp'
    };
    dispatch(loginWeb(cred));
  };

  const handleCloseErrorModal = () => setShowErrorModal(false);

  return (
    <Container className="p-0" fluid>
      <Navbar />
      <Container className="mb-5">
        <Row className="shadow-lg rounded-2xl">
          <Col className="flex flex-col items-center">
            <h1 className="pt-5 mb-4 text-center">{t("welcome_sign_in")}</h1>
            <form
              className="flex flex-col items-center w-full "
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                className=" w-full md:w-2/3 lg:w-2/3 h-10 px-2 mt-3 border-2 rounded-xl small"
                placeholder={t("email")}
                {...register("email", {
                  required: true,
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                })}
              />

              {errors.email && (
                <p
                  className="w-full mt-1 mb-0 ml-3 small"
                  style={{ textAlign: "left", color: "red" }}
                >
                  {t("email_validation")}
                </p>
              )}

              {/* password */}
              <input
                type={showPassword ? "text" : "password"}
                className=" w-full md:w-2/3 lg:w-2/3 h-10 px-2 mt-3 border-2 rounded-xl small"
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
                  className="w-full ml-3 mt-1 mb-0 small"
                  style={{ textAlign: "left", color: "red" }}
                >
                  {t("password_validation")}    
                </p>
              )}

              <Button
                className="w-full md:w-2/3 lg:w-2/3  h-12 mt-3 mb-5 text-center"
                variant="warning"
                style={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: "16px",
                  borderRadius: "15px",
                }}
                type="submit"
              >
               {t("sign_in")}
               
              </Button>
            </form>
            <div className="w-full ml-16 font-semibold">
              <Link to="/forget-password" style={{ textDecoration: "none" }}>
                <h6 className="font-bold pr-6">{t("forget_password?")}</h6>
              </Link>
            </div>
            <div className="flex justify-start w-full my-4 ml-16 pr-6">
              <h6 className="text-start">{t("no_account")} </h6>
              <Link to="/signup" style={{ textDecoration: "none" }}>
                <h6 className="font-bold px-1">{t("create_account")}</h6>
              </Link>
            </div>
          </Col>
          <Col className="hidden p-0 md:block lg:block">
            <div className="flex justify-end">
              <Image
                className="rounded-tr-2xl rounded-br-2xl "
                src={loginIMG}
              />
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
      <ErrorModal show={showErrorModal} onHide={handleCloseErrorModal} errorMessage={errorMessage} />
    </Container>
  );
}

export default Login;