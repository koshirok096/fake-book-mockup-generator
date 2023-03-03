import React, { useState } from "react";
import "../../styles/global.css";
import FooterStyle from "./footer.module.css";

import { Container, FormControl } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';


const Footer = () => {

  return (
    <div className={FooterStyle.footerwrapper}>© Fake Book Mockup Generator 2023
    </div>
  );
};

export default Footer;

