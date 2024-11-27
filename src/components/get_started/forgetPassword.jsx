import Navbar from "../Navbar";
import Footer from "./../footer/footer";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Link, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { forgetPassword,resetPassword } from "../../features/auth/authSlice";
import { useTranslation } from "react-i18next";
function ResetPassword() {
  const { t } = useTranslation();
  const { token } = useSelector((state) => state.auth);
  const userData = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    dispatch(forgetPassword(forgetPasswordData));
    // console.log(token)
  };
console.log(userData);
// change it to function and dispatch function inside
const resetPasswordData = {
  token: "token send to email address",
  password: "1020304050",
  password_confirmation: "1020304050"
}
// change it to function and dispatch function inside
const forgetPasswordData = {
  email: "test@example.com",
    phone: "01201201236",
    phone_country: "EG"
}
  const forgetPasswordView = () =>{
    return(<>
     <div>
          <div className="flex justify-center items-center w-full h-screen ">
            <div className="w-full shadow-lg p-10 m-20">
              <h1 className="text-2xl font-bold mb-3 pl-2">{t("forget_password")}</h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  className="block w-full  md:w-2/3 lg:w-2/3 h-10 px-2 mt-3 border-2 rounded-xl small"
                  placeholder={t("type_email")}
                  {...register("email", {
                    required: true,
                    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  })}
                />
                {errors.email && (
                  <p
                    className="w-full  md:w-2/3 lg:w-2/3 mt-1 mb-0 ml-3 small"
                    style={{ textAlign: "left", color: "red" }}
                  >
                    {t("email_validation")}
                  </p>
                )}
                <Button
                  className="w-full md:w-2/3 lg:w-2/3 h-12 mt-5 text-center"
                  variant="warning"
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "16px",
                    borderRadius: "15px",
                  }}
                  type="submit"
                  onClick={(data)=>{ dispatch(forgetPassword(forgetPasswordData))}}
                >
                 {t("send_email")}
                </Button>
              </form>
            </div>
          </div>
        </div>
    </>)
  }
  const resetPasswordView = () =>{
    return(<>
     <div>
          <div className="flex justify-center items-center w-full h-screen ">
            <div className="w-full shadow-lg p-10 m-20">
              <h1 className="text-2xl font-bold mb-3 pl-2">{t("reset_password")}</h1>
              <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type={"password"}
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
                  className="w-full md:w-2/3 lg:w-2/3 h-12 mt-5 text-center"
                  variant="warning"
                  style={{
                    color: "black",
                    fontWeight: "bold",
                    fontSize: "16px",
                    borderRadius: "15px",
                  }}
                  type="submit"
                  onClick={()=>{ dispatch(resetPassword(resetPasswordData))}}
                >
                  {t("reset_password")}
                </Button>
              </form>
            </div>
          </div>
        </div>
    </>)
  }

  return (
    <Container className="p-0" fluid>
      <Navbar />
      <Container className="mb-5">
       {location.pathname === "/reset-password"? resetPasswordView(): forgetPasswordView() }
      </Container>
      <Footer />
    </Container>
  );
}

export default ResetPassword;
