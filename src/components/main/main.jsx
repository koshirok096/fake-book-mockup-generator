import React, { useState, useRef } from "react";
import "../../styles/global.css";
import MainStyle from "./main.module.css";

import Nav from '../../components/nav/nav.jsx';
import Footer from '../../components/footer/footer.jsx';

import { Container, FormControl } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Modal } from "react-bootstrap";

import Confetti from "react-confetti";

import downloadjs from 'downloadjs';
import html2canvas from 'html2canvas';



const API_TOKEN = process.env.REACT_APP_API_TOKEN;

const ImageGenerationForm = () => {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const input = event.target.elements.input.value;
    const response = await fetch(
      "https://api-inference.huggingface.co/models/prompthero/openjourney",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify({ inputs: input }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to generate image");
    }

    const blob = await response.blob();
    setOutput(URL.createObjectURL(blob));
    setLoading(false);
  };


  // modal2
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  // book-mockup
  const [inputTitle, setInputTitle] = useState('');
  const handleInputChange = (event) => {
    setInputTitle(event.target.value);
  };
  const [inputFlavour, setInputFlavour] = useState('');
  const handleInputChange2 = (event) => {
    setInputFlavour(event.target.value);
  };
  const [inputAuthor, setInputAuthor] = useState('');
  const handleInputChange3 = (event) => {
    setInputAuthor(event.target.value);
  };

  // screenshot *not working properly

  const handleCaptureClick = async () => {
    const canvas = await html2canvas(document.body, {
      proxy: true,
      useCORS: true,
      onrendered: function(canvas) {
          canvas.toDataURL();
      }
  });
    const dataURL = canvas.toDataURL('image/png');
    downloadjs(dataURL, 'download.png', 'image/png');
  };  
      
  // style change
  const [titleres, setStyle1] = useState(MainStyle.input_title_box);  
  const changeStyle1 = () => {
    setStyle1(titleres === MainStyle.input_title_box ? MainStyle.input_title_box2 : MainStyle.input_title_box);
  };
    const [flavourres, setStyle2] = useState(MainStyle.input_flavour_box);  
  const changeStyle2 = () => {
    setStyle2(flavourres === MainStyle.input_flavour_box ? MainStyle.input_flavour_box2 : MainStyle.input_flavour_box);
  };
  const [authorres, setStyle3] = useState(MainStyle.input_author_box);  
  const changeStyle3 = () => {
    setStyle3(authorres === MainStyle.input_author_box ? MainStyle.input_author_box2 : MainStyle.input_author_box);
  };



  // filter slider
  const [saturate, setSaturate] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [hueRotate, setHueRotate] = useState(0);
  const [lightness, setLightness] = useState(100);

  const handleSaturateChange = (event) => {
    setSaturate(event.target.value);
  };

  const handleContrastChange = (event) => {
    setContrast(event.target.value);
  };

  const handleHueRotateChange = (event) => {
    setHueRotate(event.target.value);
  };

  const handleLightnessChange = (event) => {
    setLightness(event.target.value);
  };

  const filterstyle = {
    filter: `hue-rotate(${hueRotate}deg) brightness(${lightness}%) contrast(${contrast}%) saturate(${saturate}%)`
  };

  // font

  const [fontFamily, setFontFamily] = useState("Bebas Neue");
  const handleFontFamilyChange = (e) => {
    setFontFamily(e.target.value);
  };
  const [fontFamily_f, setFontFamily_f] = useState("Roboto");
  const handleFontFamily_fChange = (e) => {
    setFontFamily_f(e.target.value);
  };
  const [fontFamily_a, setFontFamily_a] = useState("Roboto");
  const handleFontFamily_aChange = (e) => {
    setFontFamily_a(e.target.value);
  };


  // font-size slider
  const [fontSize, setFontSize] = useState(16);
  const handleFontSizeChange = (event) => {
    setFontSize(event.target.value);
  }

  const titleslider = {
    fontSize: `${fontSize}px`
  }


  return (
    <Container className={MainStyle.maincontainer}>

      <Nav/>


      <div className={MainStyle.maincontainer_flwrapper}>
        <h1>Fake Book Mockup Generator (ß)</h1>
        <p>Create fictional artwork and book mockup with keywords.</p>
        <Form className="gen-form" onSubmit={handleSubmit}>
          <FormControl
            type="text"
            name="input"
            placeholder="type your prompt here..."
            className="me-3"
          ></FormControl>
          <Button variant="danger" type="submit">
            Generate
          </Button>
        </Form>
        <div>
          {loading && <div className="loading">Loading...</div>}
          {!loading && output && (
            <div className={MainStyle.resultwrapper}>
              <h2>Good Job! Do You Like This Image?</h2>
              <img src={output} alt="art" />
              <div>
                <Button variant="primary" className="me-3">
                  <a href={output} download={output}>
                    Download Image
                  </a>
                </Button>
                <Button
                  variant="success"
                  onClick={handleShow2}
                  className="me-3"
                >
                  <a href="#">Make Mockup</a>
                </Button>
                <Button variant="secondary">
                  <a href="">Start Over</a>
                </Button>
              </div>
              <Confetti width={2500} height={1200} recycle={false} />
              <Modal show={show2} onHide={handleClose2} id="mockmodalwrap">
                  <Modal.Header closeButton>
                    <Modal.Title>Mockup Edit</Modal.Title>
                  </Modal.Header>
                  <Modal.Body className="m-3">
                    <div
                      className={MainStyle.bookcontainer}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <div className={MainStyle.book}>
                      <div id={titleres} style={{ ...titleslider, fontFamily: `${fontFamily}, sans-serif` }}>{inputTitle}</div>
                        <div id={flavourres} style={{ fontFamily: `${fontFamily_f}, sans-serif`}}>{inputFlavour}</div>
                        <div id={authorres} style={{ fontFamily: `${fontFamily_a}, sans-serif`}}><span>Author </span>{inputAuthor}</div>
                        <img style={filterstyle} src={output} alt="art" className={MainStyle.bookperse} />
                      </div>
                    </div>

                    <div className={MainStyle.parawrapper}>
                    {/* <input
                        type="text" name ="input_value" value=""
                        className={MainStyle.mockuplink}
                      /> */}


                     <FormControl
                        type="text"
                        name="input_title"
                        as="textarea" rows={1} 
                        onChange={handleInputChange}
                        placeholder="type title here"
                        className={MainStyle.mockuplink}
                        >
                     </FormControl>
                     <div className={`${MainStyle.parawrapper_titlemini} m-3`}>
                      <label>Font Size</label>
                      <input type="range" min="24" max="72" value={fontSize} onChange={handleFontSizeChange} />

                      <Button variant="primary" onClick={changeStyle1}>
                        Invert Color
                      </Button>

                      <div>
                        <select value={fontFamily} onChange={handleFontFamilyChange}>
                          <option value="Roboto">Roboto</option>
                          <option value="Oxygen">Oxygen</option>
                          <option value="Permanent Marker">Permanent Marker</option>
                          <option value="Tilt Prism">Tilt Prism</option>
                          <option value="Gloock">Gloock</option>
                          <option value="Bungee Spice">Bungee Spice</option>
                          <option value="Montserrat">Montserrat</option>
                          <option value="Bebas Neue">Bebas Neue</option>
                          <option value="Cinzel">Cinzel</option>
                          <option value="Playfair Display">Playfair Display</option>
                          <option value="Ubuntu">Ubuntu</option>
                          <option value="Rampart One">Rampart One</option>
                        </select>
                      </div>
                     </div>

                     <FormControl
                        type="text"
                        name="input_flavour"
                        onChange={handleInputChange2}
                        placeholder="type flavour txt"
                        className={MainStyle.mockuplink}
                        >
                     </FormControl>
                     <div className={`${MainStyle.parawrapper_titlemini} m-3`}>
                        <Button variant="primary" onClick={changeStyle2}>
                          Invert Color
                        </Button>
                        <div>
                          <select value={fontFamily_f} onChange={handleFontFamily_fChange}>
                            <option value="Roboto">Roboto</option>
                            <option value="Oxygen">Oxygen</option>
                            <option value="Permanent Marker">Permanent Marker</option>
                            <option value="Tilt Prism">Tilt Prism</option>
                            <option value="Gloock">Gloock</option>
                            <option value="Bungee Spice">Bungee Spice</option>
                            <option value="Montserrat">Montserrat</option>
                            <option value="Bebas Neue">Bebas Neue</option>
                            <option value="Cinzel">Cinzel</option>
                            <option value="Playfair Display">Playfair Display</option>
                            <option value="Ubuntu">Ubuntu</option>
                            <option value="Rampart One">Rampart One</option>
                          </select>
                        </div>
                      </div>

                     <FormControl
                        type="text"
                        name="input_author"
                        onChange={handleInputChange3}
                        placeholder="type author"
                        className={MainStyle.mockuplink}
                        >
                     </FormControl>
                    <div className={`${MainStyle.parawrapper_titlemini} m-3`}>

                     <Button variant="primary" onClick={changeStyle3}>
                      Invert Color
                     </Button>
                      <div>
                        <select value={fontFamily_a} onChange={handleFontFamily_aChange}>
                          <option value="Roboto">Roboto</option>
                          <option value="Oxygen">Oxygen</option>
                          <option value="Permanent Marker">Permanent Marker</option>
                          <option value="Tilt Prism">Tilt Prism</option>
                          <option value="Gloock">Gloock</option>
                          <option value="Bungee Spice">Bungee Spice</option>
                          <option value="Montserrat">Montserrat</option>
                          <option value="Bebas Neue">Bebas Neue</option>
                          <option value="Cinzel">Cinzel</option>
                          <option value="Playfair Display">Playfair Display</option>
                          <option value="Ubuntu">Ubuntu</option>
                          <option value="Rampart One">Rampart One</option>
                        </select>
                      </div>
                    </div>


                      <div className={MainStyle.paraimgcontainer} className="m-3">
                        <div className={MainStyle.paraimgcontainer_gaugewrap}>
                          <label>Saturation</label>
                          <input type="range" min="0" max="200" value={saturate} onChange={handleSaturateChange} />
                        </div>

                        <div className={MainStyle.paraimgcontainer_gaugewrap}>
                        <label>Contrast</label>
                        <input type="range" min="0" max="200" value={contrast} onChange={handleContrastChange} />
                        </div>

                        <div className={MainStyle.paraimgcontainer_gaugewrap}>
                        <label>Hue</label>
                        <input type="range" min="0" max="360" value={hueRotate} onChange={handleHueRotateChange} />
                        </div>

                        <div className={MainStyle.paraimgcontainer_gaugewrap}>
                        <label>Brightness</label>
                        <input type="range" min="0" max="100" value={lightness} onChange={handleLightnessChange} />
                        </div>
                     </div>
                    </div>

                    
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="primary" onClick={handleClose2}>
                      Save <span>(Not in Use)</span>
                    </Button>
                    <Button variant="warning" onClick={handleCaptureClick}>
                      Screenshot <span>(Not in Use)</span>
                    </Button>

                    <Button variant="secondary" onClick={handleClose2}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>

              </div>
          )}
        </div>
        <div>
          {/* {!loading && output && (
            <div className="resultwrapper">
              <img src={output} alt="art" />
              <Mockup/>
            </div>
          )} */}
        </div>
      </div>

      <Footer/>

    </Container>
  );
};

export default ImageGenerationForm;

