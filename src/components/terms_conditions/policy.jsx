import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import Navbar from "../Navbar";
import Footer from "../footer/footer";
import { getTermsData } from "../../features/terms/TermsSlice";
import { useDispatch } from "react-redux";

const PrivacyPolicy = () => {
  const [rules, setRules] = useState([]);

  const dispatch = useDispatch();
useEffect(()=>{
    dispatch(getTermsData()).then((res) => {
      console.log(res)
setRules(res.payload[2].description.en)
    });
},[])
 

  return (
    <>
      <Container className="p-0" fluid>
        <Navbar />
        <Container>
          <Row className="mt-5">
            <div className="text-3xl font-bold mb-3 p-0 ">Privacy Policy</div>
            <div className="font-semibold mb-3 w-full h-fit"  dangerouslySetInnerHTML={{ __html: rules }} >
            {/* {rules?rules:null} */}
            </div>
        </Row>
        </Container>
        <Footer />
      </Container>
    </>
  );
};

export default PrivacyPolicy;
