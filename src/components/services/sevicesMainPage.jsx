import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import { Col, Container, Row } from "react-bootstrap";
import Footer from "./../footer/footer";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllServices,
  getServiceCategoryData,
  getServicesByCategoryID,
} from "./../../features/service/servicesAPI";
import ServiceCard from "./serviceCard";
import CategoryHeader from "../restaurants/categoryHeader";
import LoadingSpinner from "../restaurants/loadingSpinner";
import ErrorDisplay from "../restaurants/errorDisplay";
import { useTranslation } from "react-i18next";
function SevicesMainPage() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [allServicesData, setAllServicesData] = useState(null);
  const location = useLocation();
  const dispatch = useDispatch();
  const servicesCategoryData = useSelector(
    (state) => state.servicesData.categories
  );
  const loading = useSelector((state) => state.servicesData.loading);
  const error = useSelector((state) => state.servicesData.error);

  useEffect(() => {
    if (location.pathname === "/services") {
      dispatch(getServiceCategoryData());
    }
  }, [location.pathname, dispatch]);

  useEffect(() => {
    if (location.pathname === "/services") {
      if (selectedCategoryId) {
        dispatch(getServicesByCategoryID(currentPage,selectedCategoryId)).then((res)=>{
          setAllServicesData(res.payload)
        });
      } else {
        dispatch(getAllServices(currentPage)).then((res)=>{
          setAllServicesData(res.payload)
        })

      }
    }
  }, [location.pathname, currentPage, dispatch, selectedCategoryId]);



  const handleCategoryClick = (categoryId) => {
    setCurrentPage(1);
    setSelectedCategoryId(categoryId);
    console.log("Category clicked:", categoryId);
    if (location.pathname === "/services") {
      dispatch(
        getServicesByCategoryID({
          page: currentPage,
          selectedCategoryId: categoryId,
        })
      ).then((res)=>{
        setAllServicesData(res.payload)
      })
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  return (
    <Container fluid className="p-0">
      <Navbar />
      <Container>
        <Row>
          <Col xs={12} md={12} lg={12}>
            <div>
              <CategoryHeader
                categories={servicesCategoryData}
                onCategoryClick={handleCategoryClick}
              />
            </div>

            {allServicesData ? (
              <div className="flex flex-wrap justify-around">
                {allServicesData.map((serve) => 
                  (
                  <ServiceCard key={serve.id} service={serve} />
                ))}
              </div>
            ) : (
              <LoadingSpinner />
            )}

<div className="flex justify-evenly mt-4">
              <div>

              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="w-32 px-4 py-2 mr-5 bg-[#f0a835] rounded text-white font-bold disabled:bg-gray-300"
              >
                {t("previous")}
              </button>
              </div>
              <div>

              <button
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="w-32 px-4 py-2 bg-[#f0a835] rounded text-white font-bold disabled:bg-gray-300"
                >
                {t("next")}
              </button>
                </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </Container>
  );
}

export default SevicesMainPage;
