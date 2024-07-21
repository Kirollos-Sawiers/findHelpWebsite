import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Image from "react-bootstrap/Image";
import products_banner from "../../assets/products_banner.png";
import { Container } from "react-bootstrap";

function MainProducts() {
  return (
    <>
      <Container fluid className="p-0">
        <Navbar />
        <Container fluid className="flex justify-center pb-10">
          <Image className="rounded-t-lg" src={products_banner} />
        </Container>
      </Container>
    </>
  );
}

export default MainProducts;
