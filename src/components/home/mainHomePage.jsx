import React, { useState, useEffect } from "react";
import { Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../footer/footer";
import homepageBanner from "../../assets/homepage_banner.png";
import homepageBannerTablet from "../../assets/homepage_banner_tablet.png";
import partnerWithUs from "../../assets/Parnter_with_us.png";
import rideWithUs from "../../assets/ride_with_us.png";
import serviceCards from "../../assets/services_cards.png";
import serviceCards1 from "../../assets/services_cards_1.png";
import serviceCards2 from "../../assets/services_cards_2.png";
import serviceCards3 from "../../assets/services_cards_2.png";
import serviceCards4 from "../../assets/services_cards_1.png";
import serviceCards5 from "../../assets/services_cards.png";
import section4Img from "../../assets/section_4_img.png";
import appleStoreIcon from "../../assets/apple_store_icon.png";
import googleStoreIcon from "../../assets/google_store_icon.png";
import partner1 from "../../assets/partner1.jpeg";
import partner2 from "../../assets/partner2.jpeg";
import partner3 from "../../assets/partner3.jpeg";
import partner4 from "../../assets/partner4.jpeg";
import partner5 from "../../assets/partner5.jpeg";
import partner6 from "../../assets/partner6.jpeg";

const LAPTOP_BREAKPOINT = 992;

function MainHomePage() {
  const [isLaptop, setIsLaptop] = useState(window.innerWidth >= LAPTOP_BREAKPOINT);
  const [activeSection, setActiveSection] = useState('start');

  useEffect(() => {
    const handleResize = () => {
      setIsLaptop(window.innerWidth >= LAPTOP_BREAKPOINT);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
   // State to track which button is active

   // Function to handle button click and set the active one
   const handleButtonClick = (button) => {
    setActiveSection(button);
   };

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  return (
    <Container fluid className="p-0">
      <Navbar />
      <Container fluid className="flex justify-center bg-[#F0A8350D] pb-10">
        <Image className="px-10" src={isLaptop ? homepageBanner : homepageBannerTablet} />
      </Container>
      <div className="flex flex-col items-center md:flex-row md:justify-evenly lg:flex-row lg:justify-evenly">
      <Link to="/partnerwithus" className="no-underline w-2/3 h-fit md:w-80 lg:w-1/3 mx-0 mt-5">
        <Image
          className=""
          src={partnerWithUs}
        />
       </Link>
      <Link to="/ridewithus" className="no-underline w-2/3 h-fit md:w-80 lg:w-1/3 mx-0 mt-5">
        <Image
          className=""
          src={rideWithUs}
        />
       </Link>
      </div>
      <div className="flex justify-center mt-5">
      <button
        className={`px-4 py-2 mr-20 rounded-full text-black font-semibold transition-colors duration-300
          ${activeSection === 'start' ? 'bg-[#F0A835] text-white' : 'bg-transparent'}`}
        onClick={() => handleSectionClick('start')}
      >
        Get Started
      </button>
      <button
        className={`px-4 py-2 rounded-full text-black font-semibold transition-colors duration-300
          ${activeSection === 'offer' ? 'bg-[#F0A835] text-white' : 'bg-transparent'}`}
        onClick={() => handleSectionClick('offer')}
      >
        What we offer
      </button>
    </div>
      <div className="flex flex-wrap justify-evenly my-10">
        {activeSection === 'start' ? (
          <>
            <Image src={serviceCards} />
            <Image src={serviceCards1} />
            <Image src={serviceCards2} />
          </>
        ) : (
          <>
            <Image src={serviceCards4} />
            <Image src={serviceCards3} />
            <Image src={serviceCards5} />
          </>
        )}
      </div>
      <div className="w-full flex flex-wrap justify-center">
        <div className="mx-5">
          <p className="text-7xl font-semibold mb-4">Feast Your Senses,</p>
          <p className="text-7xl font-semibold text-[#F0A835] mb-4">Fast and Fresh</p>
          <p className="font-semibold mb-4">Order Restaurant food, takeaway and groceries</p>
          <div className="flex mb-5">
            <Link to="https://apps.apple.com/eg/app/findhelpapp/id1450736684" target="_blank">
              <Image className="pr-2" src={appleStoreIcon} />
            </Link>
            <Link to="https://play.google.com/store/apps/details?id=com.extreme.help" target="_blank">
              <Image src={googleStoreIcon} />
            </Link>
          </div>
        </div>
        <div className="ml-2">
          <Image src={section4Img} />
        </div>
      </div>
      <div className="flex justify-center text-4xl mt-16 mb-10">
        <p className="font-bold">some of our partners</p>
      </div>
      <div className="w-full flex flex-wrap justify-center">
        <div className="flex">
          <Image className="w-[150px] h-[128px] mx-2 mb-10" src={partner1} />
          <Image className="w-[150px] h-[128px] mx-2 mb-10" src={partner6} />
        </div>
        <div className="flex">
          <Image className="w-[150px] h-[128px] mx-2 mb-10" src={partner3} />
          <Image className="w-[150px] h-[128px] mx-2 mb-10" src={partner4} />
        </div>
        <div className="flex">
          <Image className="w-[150px] h-[128px] mx-2 mb-10" src={partner5} />
          <Image className="w-[150px] h-[128px] mx-2 mb-10" src={partner2} />
        </div>
      </div>
      <div className="flex flex-wrap justify-evenly items-center h-fit mx-14 mb-5 py-3 rounded-lg bg-gradient-to-l from-[#F2B655] to-[#ffebc3]">
        <div className="flex flex-col items-center">
          <p className="text-4xl m-0">546+</p>
          <p className="text-xl font-extrabold">Registered Riders</p>
        </div>
        <div className="vr hidden md:block lg:block" />
        <hr className="w-52 block md:hidden lg:hidden" />
        <div className="flex flex-col items-center">
          <p className="text-4xl m-0">789,900+</p>
          <p className="text-xl font-extrabold">Orders Delivered</p>
        </div>
        <div className="vr hidden md:block lg:block" />
        <hr className="w-52 block md:hidden lg:hidden" />
        <div className="flex flex-col items-center">
          <p className="text-4xl m-0">690+</p>
          <p className="text-xl font-extrabold">Restaurants Partnered</p>
        </div>
        <div className="vr hidden md:block lg:block" />
        <hr className="w-52 block md:hidden lg:hidden" />
        <div className="flex flex-col items-center">
          <p className="text-4xl m-0">17,457+</p>
          <p className="text-xl font-extrabold">Food items</p>
        </div>
      </div>
      <Footer />
    </Container>
  );
}

export default MainHomePage;