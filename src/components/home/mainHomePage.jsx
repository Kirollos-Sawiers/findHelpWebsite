import React, { useState } from "react";
import { Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../footer/footer";
import homeCoverEn from "../../assets/homeCoverEn.jpeg";
import homeCoverAr from "../../assets/homeCoverAr.jpeg";
import ourPartnerAr from "../../assets/outPartnerAr.jpeg";
import ourPartnerEn from "../../assets/ourPartnerEn.jpeg";
import rideWithUsEn from "../../assets/rideWithUsEn.jpeg";
import rideWithUsAr from "../../assets/rideWithUsAr.jpeg";
import service1En from "../../assets/service1En.jpeg";
import service1Ar from "../../assets/service1Ar.jpeg";
import service2En from "../../assets/service2En.jpeg";
import service2Ar from "../../assets/service2Ar.jpeg";
import service3En from "../../assets/service3En.jpeg";
import service3Ar from "../../assets/service3Ar.jpeg";
import service4En from "../../assets/service4En.jpeg";
import service5En from "../../assets/service5En.jpeg";
import service6En from "../../assets/service6En.jpeg";
import service4Ar from "../../assets/service4Ar.jpeg";
import service5Ar from "../../assets/service5Ar.jpeg";
import service6Ar from "../../assets/service6Ar.jpeg";
import section4En from "../../assets/section4En.png";
import section4Ar from "../../assets/section4Ar.jpeg";
import appleStoreIcon from "../../assets/apple_store_icon.png";
import googleStoreIcon from "../../assets/google_store_icon.png";
import partner1 from "../../assets/partner1.jpeg";
import partner2 from "../../assets/partner2.jpeg";
import partner3 from "../../assets/partner3.jpeg";
import partner4 from "../../assets/partner4.jpeg";
import partner5 from "../../assets/partner5.jpeg";
import partner6 from "../../assets/partner6.jpeg";
import { useTranslation } from "react-i18next";
import cookies from "js-cookie";
import ImageSlider from "./../restaurants/slider";
import CountUpAnimation from './countUpAnimation';

function MainHomePage() {
  const { t } = useTranslation();
  const lng = cookies.get("i18next") || "en";
  const [activeSection, setActiveSection] = useState("start");

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };
  const partnersArray = [
    { image: { url: partner1 } },
    { image: { url: partner2 } },
    { image: { url: partner3 } },
    { image: { url: partner4 } },
    { image: { url: partner5 } },
    { image: { url: partner6 } },
  ];

  return (
    <Container fluid className="p-0">
      <Navbar />
      <Container
        fluid
        className="flex justify-center w-full bg-[#F0A8350D] px-0"
      >
        <Image
          className="w-[95%] h-auto mt-2 rounded-lg bg-cover bg-center"
          src={lng === "en" ? homeCoverEn : homeCoverAr}
        />
      </Container>
      <div className="flex flex-col items-center md:flex-row md:justify-evenly lg:flex-row lg:justify-evenly">
        <Link
          to="/partnerwithus"
          className="no-underline w-2/3 h-fit md:w-80 lg:w-1/3 mx-0 mt-5"
        >
          <Image
            className="rounded-xl"
            src={lng === "en" ? ourPartnerEn : ourPartnerAr}
          />
        </Link>
        <Link
          to="/ridewithus"
          className="no-underline w-2/3 h-fit md:w-80 lg:w-1/3 mx-0 mt-5"
        >
          <Image
            className="rounded-xl"
            src={lng === "en" ? rideWithUsEn : rideWithUsAr}
          />
        </Link>
      </div>
      <div className="flex justify-evenly mt-5">
        <button
          className={`px-4 py-2 mr-20 rounded-full text-black font-semibold transition-colors duration-300
          ${
            activeSection === "start"
              ? "bg-[#F0A835] text-white"
              : "bg-transparent"
          }`}
          onClick={() => handleSectionClick("start")}
        >
          {t("get_started")}
        </button>
        <button
          className={`px-4 py-2 rounded-full text-black font-semibold transition-colors duration-300
          ${
            activeSection === "offer"
              ? "bg-[#F0A835] text-white"
              : "bg-transparent"
          }`}
          onClick={() => handleSectionClick("offer")}
        >
          {t("what_we_offer")}
        </button>
      </div>
      <div className="flex flex-wrap justify-around my-10">
        {activeSection === "start" ? (
          <>
            <div className="flex flex-col items-center justify-center">
              <p className="font-bold">{t("place_an_order")}</p>
              <Image
                className="w-[20rem] h-auto"
                src={lng === "en" ? service1En : service1Ar}
              />
              <p className="w-[20rem] pb-5 text-center font-bold mb-0 pt-3">
                {t("place_an_order_desc")}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="font-bold">{t("track_order")}</p>
              <Image
                className="w-[20rem] h-auto"
                src={lng === "en" ? service2En : service2Ar}
              />
              <p className="w-[20rem] pb-5 text-center font-bold mb-0 pt-3">
                {t("track_order_desc")}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="font-bold">{t("receive_oreder")}</p>
              <Image
                className="w-[20rem] h-auto"
                src={lng === "en" ? service3En : service3Ar}
              />
              <p className="w-[20rem] pb-5 text-center font-bold mb-0 pt-3">
                {t("receive_oreder_desc")}
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center">
              <Image
                className="w-[18rem] h-fit"
                src={lng === "en" ? service4En : service4Ar}
              />
              <p className="w-[20rem] pb-5 text-center font-bold mb-0 pt-3">
                {t("place_an_order_desc")}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Image
                className="w-[18rem] h-fit mb-0"
                src={lng === "en" ? service6En : service6Ar}
              />
              <p className="w-[20rem] pb-5 text-center font-bold mb-0 pt-3">
                {t("track_order_desc")}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Image
                className="w-[18rem] h-fit"
                src={lng === "en" ? service5En : service5Ar}
              />
              <p className="w-[20rem] pb-5 text-center font-bold mb-0 pt-3">
                {t("receive_oreder_desc")}
              </p>
            </div>
          </>
        )}
      </div>
      <div className="w-full flex flex-wrap justify-center mt-24">
        <div className="mx-5">
          <p className="text-7xl font-semibold mb-4">
            {t("feast_your_senses")}
          </p>
          <p className="text-7xl font-semibold text-[#F0A835] mb-4">
            {t("fast_and _fresh")}
          </p>
          <div className="w-[50%] flex justify-around mb-5">
            <Link
              to="https://apps.apple.com/eg/app/findhelpapp/id1450736684"
              target="_blank"
            >
              <Image className="pr-2" src={appleStoreIcon} />
            </Link>
            <Link
              to="https://play.google.com/store/apps/details?id=com.extreme.help"
              target="_blank"
            >
              <Image src={googleStoreIcon} />
            </Link>
          </div>
        </div>
        <div className="ml-2">
          <Image
            className="w-[60%] h-auto bg-center"
            src={lng === "en" ? section4En : section4Ar}
          />
        </div>
      </div>
      <div className="flex justify-center text-4xl mt-16 mb-10">
        <p className="font-bold">{t("some_of_our_partners")}</p>
      </div>
      <div className="h-auto">
        {partnersArray ? (
          <>
            <div className="flex justify-center items-center h-auto bg-gray-100 my-3">
            <ImageSlider images={partnersArray} interval={3000} width="[70%]" height="80" isRTL={lng === 'ar'} />
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      <div className="flex flex-wrap justify-evenly items-center h-fit mx-14 mb-5 py-3 rounded-lg bg-gradient-to-l from-[#F2B655] to-[#ffebc3]">
        <div className="flex flex-col items-center">
          <p className="text-4xl m-0"><CountUpAnimation targetNumber={546} duration={2000} />+</p>
          <p className="text-xl font-extrabold">{t("registered_riders")}</p>
        </div>
        <div className="vr hidden md:block lg:block" />
        <hr className="w-52 block md:hidden lg:hidden" />
        <div className="flex flex-col items-center">
          <p className="text-4xl m-0"><CountUpAnimation targetNumber={789900} duration={2000} />+</p>
          <p className="text-xl font-extrabold">{t("orders_delivered")}</p>
        </div>
        <div className="vr hidden md:block lg:block" />
        <hr className="w-52 block md:hidden lg:hidden" />
        <div className="flex flex-col items-center">
          <p className="text-4xl m-0"><CountUpAnimation targetNumber={690} duration={2000} />+</p>
          <p className="text-xl font-extrabold">{t("restaurants_partnered")}</p>
        </div>
        <div className="vr hidden md:block lg:block" />
        <hr className="w-52 block md:hidden lg:hidden" />
        <div className="flex flex-col items-center">
          <p className="text-4xl m-0"><CountUpAnimation targetNumber={17457} duration={2000} />+</p>
          <p className="text-xl font-extrabold">{t("food_items")}</p>
        </div>
      </div>
      <Footer />
    </Container>
  );
}

export default MainHomePage;
