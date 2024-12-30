import React from "react";
import { Container, Row } from "react-bootstrap";
import Navbar from "../Navbar";
import Footer from "../footer/footer";
// import { getTermsData } from "../../features/terms/TermsSlice";
// import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const TermsAndConditions = () => {
  const { t } = useTranslation();
  // const [rules, setRules] = useState([]);

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getTermsData()).then((res) => {
  //     const cleanedText = res.payload[0].description.en.replace(/<\/?p>/g, "");
  //     setRules(cleanedText);
  //   });
  // }, []);

  return (
    <>
      <Container className="p-0" fluid>
        <Navbar />
        <Container>
          <Row className="mt-5">
            <div className="text-3xl font-bold mb-3 p-0 text-center">
              {t("terms_conditions")}
            </div>
            <div>
              <p>{t("termsOfUse.introduction")}</p>
              <p>{t("termsOfUse.applicationServices.description")}</p>
              <p>{t("termsOfUse.applicationServices.disclaimer")}</p>
              <p>{t("termsOfUse.applicationServices.providerObligation")}</p>
              <p>{t("termsOfUse.userBehavior.description")}</p>
              <p>{t("termsOfUse.userBehavior.userResponsibility")}</p>
              <p>{t("termsOfUse.userBehavior.applicationRights")}</p>
              <p>{t("termsOfUse.copyright.description")}</p>
              <p>{t("termsOfUse.copyright.applicationRights")}</p>
              <p>{t("termsOfUse.payment")}</p>
              <p>{t("termsOfUse.complaintsAndSuggestions.description")}</p>
              <p>{t("termsOfUse.complaintsAndSuggestions.contact")}</p>
              <p>{t("termsOfUse.cancellationOrModification")}</p>
              <p>{t("termsOfUse.updatingTerms.description")}</p>
              <p>{t("termsOfUse.updatingTerms.advice")}</p>
            </div>
          </Row>
        </Container>
        <Footer />
      </Container>
    </>
  );
};

export default TermsAndConditions;
