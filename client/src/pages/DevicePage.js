import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Container, Card, Button } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import bigStar from '../assets/bigStar.png';
import { useParams } from 'react-router-dom';
import { fetchOneDevice } from '../http/deviceAPI';
import { Context } from '../index';
import { addToCart } from '../http/basketAPI';

const DevicePage = () => {
    const [device, setDevice] = useState({ info: [] });
    const { id } = useParams();
    const { user } = useContext(Context);

    useEffect(() => {
        fetchOneDevice(id).then(data => setDevice(data))
    }, [])

    return (
        <Container className='mt-3'>
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={`${process.env.REACT_APP_API_URL}/${device.img}`} />
                </Col>
                <Col md={4}>
                    <Row className='d-flex flex-column align-items-center'>
                        <h2>{device.name}</h2>
                        <div
                            className='d-flex align-items-center justify-content-center'
                            style={{ background: `url(${bigStar}) no-repeat center center`, width: 245, height:245, backgroundSize: 'cover', fontSize: 64 }}
                        >
                            {device.rating}
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card
                        className='d-flex flex-column align-items-center justify-content-around'
                        style={{ width: 300, height: 300, fontSize:32, border: '5px solid lightgrey' }}
                    >
                        <h3>From: {device.price} ₴</h3>
                        <Button variant="outline-dark" onClick={() => addToCart(user.basket, device.id).then(data => console.log(data))}>
                            Add to cart
                        </Button>
                    </Card>
                </Col>
            </Row>
            <Row className='d-flex flex-column ml-4 mt-5'>
                <h1>Specifications</h1>
                {device.info.map((info, index) => {
                    return <Row key={info.id} style={{ background: index % 2 === 0 ? 'lightgrey' : 'transparent', padding: 10 }}>
                        {info.title}: {info.description}
                    </Row>
                })}
            </Row>
        </Container>
    );
};

export default DevicePage;
