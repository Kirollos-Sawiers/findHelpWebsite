import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";
import navbar_logo from "../../assets/navbar_logo.png";
import apple_store_icon from "../../assets/apple_store_icon.png";
import google_store_icon from "../../assets/google_store_icon.png";
import facebook from "../../assets/facebook.png";
import reach from "../../assets/reach.png";
import instagram from "../../assets/instagram.png";
import snapchat from "../../assets/snapchat.png";
import tiktok from "../../assets/tiktok.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();
  const handlePhoneNumberClick = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`;
  };
  const handleEmailClick = (email) => {
    window.location.href = `mailto:${email}`;
  };
  return (
    <footer className="bg-black">
      <Container fluid>
        <Row className="pt-3">
          <Col md={1}></Col>
          <Col md={1}>
            <div>
              <img src={navbar_logo} alt="Logo_img" />
            </div>
          </Col>
          <Col md={3}>
            <div>
              <p className="text-white font-bold">{t("contact_us")}</p>
              <p
                className="text-white cursor-pointer text-pretty w-10"
                onClick={() => handleEmailClick("newfindhelpapp@gmail.com")}
              >
                {t("email_")} : Info@findhelpapp.com
              </p>
              <p
                className="text-white cursor-pointer"
                onClick={() => handlePhoneNumberClick("00201000067629")}
              >
               {t("phone")} : {t("mobile_number")}
              </p>
            </div>
          </Col>
          <Col md={2}>
            <div>
            <Link to="/TermsandConditions" className="no-underline">
              <p className="text-white">{t("terms_cond")}</p>
            </Link>
            <Link to="/Privacy-policy" className="no-underline">
              <p className="text-white">{t("privacy_policy")}</p>
            </Link>
            </div>
          </Col>
          <Col md={2}>
            <Link to="/restaurants" className="no-underline">
              <p className="text-white">{t("restaurants")}</p>
            </Link>
            <Link to="/shops" className="no-underline">
              <p className="text-white">{t("shops")}</p>
            </Link>
            <Link to="/services" className="no-underline">
              <p className="text-white">{t("services")}</p>
            </Link>
          </Col>
          <Col md={3}>
            <div className="flex flex-row">
              <Link
                to="https://apps.apple.com/eg/app/findhelpapp/id1450736684"
                target="_blank"
              >
                <img
                  className="w-32 p-1"
                  src={apple_store_icon}
                  alt="apple-store"
                />
              </Link>
              <Link
                to="https://play.google.com/store/apps/details?id=com.extreme.help"
                target="_blank"
              >
                <img
                  className="w-32 p-1"
                  src={google_store_icon}
                  alt="google-store"
                />
              </Link>
            </div>
          </Col>
          {/* <Col md={1}></Col> */}
        </Row>
        <Row className="px-3 py-2">
          <div className="flex justify-between items-center">
            <p className="text-white w-2/3 m-0">
             {t("all_rights_reserved")} © Find Help
            </p>
            <div className="flex flex-col justify-between mb-1 w-14 md:w-[20%] md:flex md:flex-row md:justify-evenly">
              <Link
                to="https://www.facebook.com/profile.php?id=61559402712536"
                target="_blank"
              >
                <img className="w-11 h-11 mb-1" src={facebook} alt="facebook" />
              </Link>
              <Link
                to="https://reach.band/en/home"
                target="_blank"
              >
                <img className="w-10 h-10 mb-1" src={reach} alt="reach" />
              </Link>
              <Link to="https://www.tiktok.com/@findhelp.eg" target="_blank">
                <img className="w-10 h-10 mb-1 rounded border-1" src={tiktok} alt="tiktok" />
              </Link>
              <Link
                to="https://www.instagram.com/find.helpapp/"
                target="_blank"
              >
                <img className="w-11 h-11 mb-1" src={instagram} alt="instagram" />
              </Link>
              <Link to="https://snapchat.com/t/P8JaPyM0" target="_blank">
                <img className="w-11 h-11 mb-1" src={snapchat} alt="snapchat" />
              </Link>
            </div>
          </div>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
