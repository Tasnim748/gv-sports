import React from "react";
import Carousel from 'react-bootstrap/Carousel'
import { Fragment } from "react";
import { imageData } from '../../data/imageData';

const Carouzel = () => {

    return (
        <Fragment>
        <Carousel fade>
            {
                imageData.map(item => {
                    return (
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={`./images/${item.name}`}
                                alt={item.title}
                            />
                            <Carousel.Caption>
                                <h3>{item.title}</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                    );
                })
            }
        </Carousel>
        <div style={{margin: '50px', textAlign: 'center', padding: '25px', borderRadius: '20px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.26)'}}>
            <h4>Play inside a fully natural environment!</h4>
            <p style={{fontSize: '18px'}}>At GreenVille Sports Futsal, you will get an opportunity to enjoy playing sports inside a green natural environment.</p>
        </div>
        <div style={{margin: '50px', textAlign: 'center', padding: '25px', borderRadius: '20px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.26)'}}>
            <h4>Book your slot online!</h4>
            <p style={{fontSize: '18px'}}>You can see available slots and can book in advance through this website, in the <strong><a href='#upmost' style={{textDecoration: 'none'}}>Book</a></strong> section on the top.</p>
        </div>
        <div style={{margin: '50px', textAlign: 'center', padding: '25px', borderRadius: '20px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.26)'}}>
            <h4>Amazing lighting system!</h4>
            <p style={{fontSize: '18px'}}>At GreenVille Sports Futsal, You can arrange tournaments in night with our dedicated amazing lighting system.</p>
        </div>
        </Fragment>
    );
};

export default Carouzel;

