import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Image from "react-bootstrap/Image";
import products_banner from "../../assets/products_banner.png";
import rest_logo from "../../assets/rest_logo.png";
import info_banner from "../../assets/info_banner.png";
import navbar_logo from "../../assets/navbar_logo.png";
import apple_pay from "../../assets/apple_pay.png";
import master_card from "../../assets/master_card.png";
import visa from "../../assets/visa.png";
import { Col, Container, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faLocationDot,
  faMoneyCheckDollar,
  faMotorcycle,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "./../footer/footer";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import {
  getServiceById,
  placeService,
} from "./../../features/service/servicesAPI";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "primereact/button";
function ServiceDetails() {
  const [serviseDetailsData, setServiceDetailsData] = useState();
  const [paymentMethod, setPaymentMethod] = useState();
  const params = useParams();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.restaurantsData.loading);
  const error = useSelector((state) => state.restaurantsData.error);

  useEffect(() => {
    dispatch(getServiceById({ selectedServiceId: params.id })).then((res) => {
      console.log(res.payload);
      setServiceDetailsData(res.payload);
    });
  }, [params.id, dispatch]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const serviceData = {
      type: "order",
      delivery: 1,
      address_id: 2453,
      coupon_code: "",
      payment_method: paymentMethod,
    };

    // Dispatch the placeService action with the serviceData
    dispatch(placeService({ serviceData }));
  };

  if (loading) {
    return (
      <div className="flex justify-center align-middle items-center h-96">
        <Spinner animation="border" variant="warning" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {serviseDetailsData ? (
        <>
          <Container fluid className="p-0">
            <Navbar />
            <div className="m-5">
              <div>
                <p className="text-3xl font-bold">Provider Information</p>
                <div className="flex justify-start items-center">
                  <Image
                    className="w-20 h-20 rounded-full"
                    src={navbar_logo}
                    alt="provider logo"
                  />
                  <div>
                    <p className="text-xl font-medium ml-3 leading-0 mb-0">
                      {serviseDetailsData?.user?.name}
                    </p>
                    <p className="ml-3">
                      {serviseDetailsData?.description?.en}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-3xl font-bold">Service Details</p>
                <div className="">
                  <div className="flex">
                    <p className="text-xl ml-3 leading-0 mb-0">
                      {serviseDetailsData?.category?.name.en}-
                    </p>
                    <p className="text-xl">
                      {serviseDetailsData?.sub_category?.name.en}
                    </p>
                  </div>
                  {serviseDetailsData?.user?.image?.url ? (
                    <>
                      <Image
                        className="w-1/2 h-fit rounded-2xl"
                        src={serviseDetailsData?.user?.image?.url}
                        alt="provider logo"
                      />
                    </>
                  ) : (
                    <>
                      <Image
                        className="w-1/2 h-fit rounded-2xl"
                        src={serviseDetailsData?.category?.image?.url}
                        alt="provider logo"
                      />
                    </>
                  )}
                  <div className="flex mt-3">
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      style={{ color: "#f0a835", marginTop: "3px" }}
                    />
                    <p className="font-medium ml-2">
                      {serviseDetailsData?.address_text?.en}
                    </p>
                  </div>
                  <div className="flex ">
                    <FontAwesomeIcon
                      icon={faMoneyCheckDollar}
                      style={{ color: "#f0a835", marginTop: "5px" }}
                    />
                    <p className="font-medium ml-2">
                      {serviseDetailsData?.price} {serviseDetailsData?.currency}
                    </p>
                  </div>
                  <div className="flex ">
                    <FontAwesomeIcon
                      icon={faClock}
                      style={{ color: "#f0a835", marginTop: "5px" }}
                    />
                    <p className="font-bold ml-2">Working Hours</p>
                  </div>
                  <div className="ml-5">
                    {Object.entries(
                      serviseDetailsData?.work_times.holidays
                    ).map(([day, is_holiday]) => (
                      <div key={day}>
                        {is_holiday === "false" ? (
                          <p className="font-semibold">
                            - {day.toUpperCase()}:{" "}
                            {serviseDetailsData?.work_times.time_from} -{" "}
                            {serviseDetailsData?.work_times.time_to}
                          </p>
                        ) : (
                          <p className="font-semibold">
                            - {day.toUpperCase()}: Closed
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div>
                  <p className="font-semibold text-xl">Payment Method</p>
                </div>
                <div>
                  <input
                    type="radio"
                    value="4"
                    checked={paymentMethod === "4"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label className="ml-2 font-medium">Cash</label>
                </div>
                <div>
                  <input
                    type="radio"
                    value="10"
                    checked={paymentMethod === "10"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <label className="ml-2 font-medium">Visa</label>
                </div>
                <div className="flex justify-center">
                  <button
                    className="w-[20%] h-8 bg-[#f0a835] text-white font-bold rounded-md"
                    type="submit"
                  >
                    Book Service
                  </button>
                </div>
              </form>
            </div>
            <Footer />
          </Container>
        </>
      ) : (
        <div className="flex justify-center align-middle items-center h-96 w-full">
          <Spinner animation="border" variant="warning" />
        </div>
      )}
    </>
  );
}

export default ServiceDetails;
