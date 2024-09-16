import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import navbar_logo from "../assets/navbar_logo.png";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { logoutWeb, resetPassword, forgetPassword } from "../features/auth/authSlice";
function MainNavbar() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const toggleLoginButton =()=>{
    if(token){
      // console.log(typeof token);
      const dataa = {
        // token: "T38u40ElDZHbuIszCURSec8984iAjTtC2VXGp44mgCWqtzQpaijN4FxCW5KzxWJG",
        // password: "1020304050",
        // password_confirmation: "1020304050",
        email: "kirollos.sawiers@gmail.com",
        phone: "01272507536",
        phone_country: "EG"
      }
      return (<>
      <Nav.Link className="mr-5" href="/profile">Profile</Nav.Link>
       <Button
              variant="warning"
              href="/login"
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: "14px",
                width: "7rem",
              }}
              onClick={()=>{dispatch(logoutWeb())}}
            >
              Logout <FontAwesomeIcon icon={faRightFromBracket} />
            </Button>
       {/* <Button
              variant="warning"
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: "14px",
                width: "7rem",
              }}
              onClick={()=>{ dispatch(forgetPassword(dataa))}}
            >
              reset <FontAwesomeIcon icon={faRightFromBracket} />
            </Button> */}
      </>)
    }else{
      return (<>
       <Button
              variant="warning"
              href="/login"
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: "14px",
                width: "7rem",
              }}
            >
              Login <FontAwesomeIcon icon={faUser} />
            </Button>
      </>)
    }
  }
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <Image
          className="mr-48"
            src={navbar_logo}
            style={{ width: " 60px", height: "60px" }}
            roundedCircle
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className="me-auto"
            style={{ color: "black", fontWeight: "bolder", fontSize: "14px" }}
          >
            <Nav.Link className="mr-5" href="/">Home</Nav.Link>
            <Nav.Link className="mr-5" href="/restaurants">Restaurants</Nav.Link>
            <Nav.Link className="text-nowrap mr-5" href="partnerwithus">Partner with us</Nav.Link>
            <Nav.Link className="mr-5" href="/shops">Shops</Nav.Link>
            <Nav.Link className="mr-5" href="#link">Sell</Nav.Link>
            
            {/* <Nav.Link className="mr-5" href="#link">العربية</Nav.Link> */}
            {toggleLoginButton()}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavbar;
