import React, { useState } from "react";
import "../../styles/global.css";
import NavStyle from "./nav.module.css";
import Logo from "../../img/MMG-logo.png";

import { Container, FormControl } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';

const Nav = () => {

  // modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <div className={NavStyle.navwrapper}>
    <h2>
      FBM
      {/* <img src={Logo} width={155.5} height={50.8} alt="mainlogo" /> */}
    </h2>
    <>
      <div className={NavStyle.navwrapper_btnwrap}>

        <Button variant="primary" onClick={handleShow} className="me-3">
          What's This?
        </Button>

        <Button variant="info">
          <a href="https://github.com/koshirok096/GenAI-wiz-Mock">Github</a>
        </Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Welcome!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>This is the web application to generate fictional artwork by using Hugging Face's generative AI API. Plus,you can try to make a fake book mockup for fun. Try it!</p>
        <ul>
          <li>Enter the prompts in a text field to generate something. FYI, currently using AI model is <span><a href="https://huggingface.co/prompthero/openjourney">openjourney</a></span>, an OS Stable Diffusion tuned model on Midjourney, by PromptHero.</li>
          <li>You cannot generate a lot of images at same time. If you do so, then you might need to wait for a while.</li>
          <li>Unfortunately now you cannot use a screenshot button in the mockup edit page (it works, but cannot render artwork). Use PC's screenshot function if you want to keep book image.</li>
        </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  </div>

  );
};

export default Nav;

