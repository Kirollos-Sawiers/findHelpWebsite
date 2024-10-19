import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import Navbar from "../Navbar";
import Footer from "../footer/footer";
import { getTermsData } from "../../features/terms/TermsSlice";
import { useDispatch } from "react-redux";
import LoadingSpinner from './../restaurants/loadingSpinner';

const TermsAndConditions = () => {
  const [rules, setRules] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTermsData()).then((res) => {
      const cleanedText = res.payload[0].description.en.replace(/<\/?p>/g, "");
      setRules(cleanedText);
    });
  }, []);

  return (
    <>
      <Container className="p-0" fluid>
        <Navbar />
        <Container>
          <Row className="mt-5">
            <div className="text-3xl font-bold mb-3 p-0 ">
              Terms and Conditions
            </div>
            <div className="font-semibold mb-3 w-full h-fit">
              {rules ? rules : <LoadingSpinner />}
            </div>
          </Row>
        </Container>
        <Footer />
      </Container>
    </>
  );
};

export default TermsAndConditions;
