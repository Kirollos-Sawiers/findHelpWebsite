import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Image from "react-bootstrap/Image";
import homepage_banner from "../../assets/homepage_banner.png";
import homepage_banner_tablet from "../../assets/homepage_banner_tablet.png";
import partner_with_us from "../../assets/Parnter_with_us.png";
import ride_with_us from "../../assets/ride_with_us.png";
import service_cards from "../../assets/services_cards.png";
import service_cards_1 from "../../assets/services_cards_1.png";
import service_cards_2 from "../../assets/services_cards_2.png";
import section_4_img from "../../assets/section_4_img.png";
import apple_store_icon from "../../assets/apple_store_icon.png";
import google_store_icon from "../../assets/google_store_icon.png";
import partner_1 from "../../assets/partner_1.png";
import partner_2 from "../../assets/partner_2.png";
import partner_3 from "../../assets/partner_3.png";
import partner_4 from "../../assets/partner_4.png";
import partner_5 from "../../assets/partner_5.png";
import partner_6 from "../../assets/partner_6.png";
import { Container } from "react-bootstrap";
import Footer from './../footer/footer';

function MainHomePage() {
  const [isLaptop, setIsLaptop] = useState(window.innerWidth >= 992);

  useEffect(() => {
    const handleResize = () => {
      setIsLaptop(window.innerWidth >= 992);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Container fluid className="p-0">
        
        <Navbar />
        <Container fluid className="flex justify-center bg-[#F0A8350D] pb-10">
          {isLaptop ? (
            <Image className="px-10" src={homepage_banner} />
          ) : (
            <Image className="px-10" src={homepage_banner_tablet} />
          )}
        </Container>
        <div className="flex flex-col items-center md:flex md:flex-row md:items-center md:justify-evenly lg:flex lg:flex-row lg:justify-evenly">
          <Image
            className="w-2/3 h-fit md:w-80 lg:w-1/3 mx-0 mt-5"
            src={partner_with_us}
          />
          <Image
            className="w-2/3 h-fit md:w-80  lg:w-1/3 mx-0 mt-5"
            src={ride_with_us}
          />
        </div>
        <div className="flex flex-wrap justify-evenly my-10">
          <Image className="" src={service_cards} />
          <Image className="" src={service_cards_1} />
          <Image className="" src={service_cards_2} />
        </div>
        <div className="w-full flex flex-wrap justify-center">
          <div className=" mx-5">
            <p className="text-7xl font-semibold mb-4">Feast Your Senses,</p>
            <p className="text-7xl font-semibold text-[#F0A835] mb-4">
              Fast and Fresh
            </p>
            <p className="font-semibold mb-4">
              Order Restaurant food, takeaway and groceries
            </p>
            <div className="flex mb-5">
              <Image
                className="pr-2"
                src={apple_store_icon}
                onClick={() => {}}
              />
              <Image className="" src={google_store_icon} />
            </div>
          </div>
          <div className="ml-2">
            <Image className="" src={section_4_img} />
          </div>
        </div>
        <div className="flex justify-center text-4xl mt-16 mb-10">
          <p className="font-bold">some of our partners</p>
        </div>
        <div className="w-full flex flex-wrap justify-center">
          <div className="flex">
            <Image
              className="w-[150px] h-[128px] mx-2 mb-10 "
              src={partner_4}
            />
            <Image
              className="w-[150px] h-[128px] mx-2 mb-10 "
              src={partner_5}
            />
          </div>
          <div className="flex">
            <Image
              className="w-[150px] h-[128px] mx-2 mb-10 "
              src={partner_6}
            />
            <Image
              className="w-[150px] h-[128px] mx-2 mb-10 "
              src={partner_1}
            />
          </div>

          <div className="flex">
            <Image
              className="w-[150px] h-[128px] mx-2 mb-10 "
              src={partner_2}
            />
            <Image
              className="w-[150px] h-[128px] mx-2 mb-10 "
              src={partner_3}
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-evenly items-center h-fit mx-14 mb-5 py-3 rounded-lg bg-gradient-to-l from-[#F2B655] to-[#ffebc3] ">
          <div className="flex flex-col items-center">
            <p className="text-4xl m-0">546+</p>
            <p className="text-xl font-extrabold">Registered Riders</p>
          </div>
          <div className="vr hidden md:block lg:block " />
          <br />
          <hr className="w-52 block md:hidden lg:hidden" />
          <div className="flex flex-col items-center">
            <p className="text-4xl m-0">789,900+</p>
            <p className="text-xl font-extrabold">Orders Delivered</p>
          </div>
          <div className="vr hidden md:block lg:block " />
          <hr className="w-52 block md:hidden lg:hidden" />
          <div className="flex flex-col items-center">
            <p className="text-4xl m-0">690+</p>
            <p className="text-xl font-extrabold">Restaurants Partnered</p>
          </div>
          <div className="vr hidden md:block lg:block " />

          <hr className="w-52 block md:hidden lg:hidden" />
          <div className="flex flex-col items-center">
            <p className="text-4xl m-0">17,457+</p>
            <p className="text-xl font-extrabold">Food items</p>
          </div>
        </div>
        <Footer/>
      </Container>
    </>
  );
}

export default MainHomePage;
