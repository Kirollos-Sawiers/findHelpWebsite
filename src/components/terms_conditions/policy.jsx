import React from "react";
import { Container, Row } from "react-bootstrap";
import Navbar from "../Navbar";
import Footer from "../footer/footer";
// import { getTermsData } from "../../features/terms/TermsSlice";
// import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const PrivacyPolicy = () => {
  const { t } = useTranslation();
  // const [rules, setRules] = useState([]);

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getTermsData()).then((res) => {
  //     console.log(res);
  //     setRules(res.payload[2].description.en);
  //   });
  // }, []);

  return (
    <>
      <Container className="p-0" fluid>
        <Navbar />
        <Container>
          <Row className="mt-5">
            <div className="text-3xl font-bold mb-3 p-0 text-center">
              {t("privacyPolicy")}
            </div>
            {/* <div className="font-semibold mb-3 w-full h-fit"  dangerouslySetInnerHTML={{ __html: rules }} >
            {rules?rules:null}
            </div> */}

            <div>
              {/* Introduction */}
              <p>{t("privacyPolicyData.introduction")}</p>

              {/* Browsing Section */}
              <p>{t("privacyPolicyData.browsing")}</p>

              {/* Personal Information Section */}
              <h2>{t("privacyPolicyData.personalInformation.whatWeCollect")}</h2>
              <ul>
                {t("privacyPolicyData.personalInformation.list", {
                  returnObjects: true,
                }).map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              {/* Collected Information Section */}
              <p>{t("privacyPolicyData.collectedInformation")}</p>

              {/* How We Collect Section */}
              <h2>{t("privacyPolicyData.howWeCollect.title")}</h2>
              <p>{t("privacyPolicyData.howWeCollect.description")}</p>
              <ul>
                {t("privacyPolicyData.howWeCollect.methods", {
                  returnObjects: true,
                }).map((method, index) => (
                  <li key={index}>{method}</li>
                ))}
              </ul>

              {/* Cookies and Web Beacons Section */}
              <p>{t("privacyPolicyData.cookiesAndWebBeacons")}</p>

              {/* How We Use Information Section */}
              <p>{t("privacyPolicyData.howWeUseInformation")}</p>

              {/* Privacy Rights Section */}
              <p>{t("privacyPolicyData.privacyRights")}</p>

              {/* Data Protection Section */}
              <p>{t("privacyPolicyData.dataProtection")}</p>

              {/* Data Disposal Rights Section */}
              <p>{t("privacyPolicyData.dataDisposalRights")}</p>
              <ul>
                {t("privacyPolicyData.dataDisposalOptions", {
                  returnObjects: true,
                }).map((option, index) => (
                  <li key={index}>{option}</li>
                ))}
              </ul>

              {/* Profiles Section */}
              <p>{t("privacyPolicyData.profiles")}</p>
            </div>
          </Row>
        </Container>
        <Footer />
      </Container>
    </>
  );
};

export default PrivacyPolicy;
