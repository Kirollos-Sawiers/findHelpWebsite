import React, { useRef } from "react";
import Navbar from "../Navbar";
import Container from "react-bootstrap/Container";
import ourPartnerAr from "../../assets/outPartnerAr.jpeg";
import ourPartnerEn from "../../assets/ourPartnerEn.jpeg";
import partner_1 from "../../assets/partner_1.jpeg";
import partner_2 from "../../assets/partner_2.jpeg";
import partner_3 from "../../assets/partner_3.jpeg";
import partner_4 from "../../assets/partner_4.jpeg";
import partner_5 from "../../assets/partner_5.jpeg";
import partner_6 from "../../assets/partner_6.jpeg";
import emailjs from "emailjs-com";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { useForm } from "react-hook-form";
import Footer from "./../footer/footer";
import cookies from "js-cookie";
import { useTranslation } from "react-i18next";


function PartnerWithUs() {
  const { t } = useTranslation();
  const lng = cookies.get("i18next")|| "en"
  const imgsArray = [
    partner_1,
    partner_6,
    partner_2,
    partner_3,
    partner_4,
    partner_5,
  ];

  // Create a ref for the "Get in touch" section
  const getInTouchRef = useRef(null);

  const scrollToGetInTouch = () => {
    if (getInTouchRef.current) {
      getInTouchRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const onSubmit = (data) => {
    const messageContent = `
      Name: ${data.name}
      Email: ${data.email}
      Phone Number: ${data.phoneNumber}
      
      Message:
      ${data.message}
    `;

    const emailData = {
      ...data,
      message: messageContent,
    };

    emailjs
      .send("service_e5r4olu", "template_ff4977o", emailData, "acBxIao33gpDuP_3_")
      .then(
        (response) => {
          // console.log("SUCCESS!", response.status, response.text);
        },
        (err) => {
          // console.log("FAILED...", err);
        }
      );
  };

  const Card = () => {
    return (
      <>
        <div className="flex justify-center flex-wrap">
          {imgsArray.map((imageName, index) => {
            return (
              <div
                key={index}
                className="flex flex-col items-center m-3 w-[12rem] shadow-xl"
              >
                <Image className="w-[12rem] h-auto rounded-lg" src={imageName} />
              </div>
            );
          })}
        </div>
      </>
    );
  };

  return (
    <Container fluid className="p-0">
      <Navbar />
      <Container fluid className="p-0 mb-5">
        <div className="flex justify-center">
          <Image
            className="w-[90%] h-fit rounded-xl shadow-lg"
            src={lng === "en"? ourPartnerEn : ourPartnerAr}
            alt="partner with us cover"
            onClick={scrollToGetInTouch}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className="flex flex-col justify-center items-center my-5">
          <p className="text-3xl font-bold">{t("WHY_PARTNER_HEADING")}</p>
          <p className=" font-semibold">
            {t("WHY_PARTNER_CONTENT")}
          </p>
        </div>
        <div>
          <Card />
        </div>
        {/* The "Get in touch" section */}
        <div className="flex flex-col justify-center items-center my-5" ref={getInTouchRef}>
          <p className="text-7xl font-semibold">
            {t("get_in")} <span className="text-[#f0a835]">{t("touch")}</span>
          </p>
        </div>
        <div>
          <form
            className="flex flex-col items-center w-full"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              className="block w-1/3 h-10 px-2 mt-3 border-2 rounded-xl small"
              placeholder={t("name")}
              {...register("name", { required: true })}
            />
            {errors.name && (
              <p
                className="mt-1 mb-0 small"
                style={{ textAlign: "left", color: "red" }}
              >
                {t("name_validation")}
              </p>
            )}

            <input
              className="block w-1/3 h-10 px-2 mt-3 border-2 rounded-xl small"
              placeholder={t("email")}
              {...register("email", {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              })}
            />
            {errors.email && (
              <p
                className="mt-1 mb-0  small"
                style={{ textAlign: "left", color: "red" }}
              >
                {t("email_validation")}
              </p>
            )}

            <input
              type="number"
              className="block w-1/3 h-10 px-2 mt-3 border-2 rounded-xl small"
              placeholder={t("mobile")}
              {...register("phoneNumber", { required: true })}
            />
            {errors.phoneNumber && (
              <p
                className="mt-1 mb-0 small"
                style={{ textAlign: "left", color: "red" }}
              >
                {t("mobile_validation")}
              </p>
            )}

            <input
              type="text"
              className="block w-1/3 h-10 px-2 mt-3 border-2 rounded-xl small"
              placeholder={t("message")}
              {...register("message", { required: true })}
            />
            {errors.message && (
              <p
                className="mt-1 mb-0 small"
                style={{ textAlign: "left", color: "red" }}
              >
                {t("message_validation")}
              </p>
            )}

            <Button
              className="block w-1/3 h-10 pl-2 mt-3 border-2 rounded-xl small text-center"
              variant="warning"
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: "16px",
                borderRadius: "15px",
              }}
              type="submit"
            >
              {t("submit")}
            </Button>
          </form>
        </div>
      </Container>
      <Footer />
    </Container>
  );
}

export default PartnerWithUs;
