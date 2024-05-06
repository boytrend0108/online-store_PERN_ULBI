import {
  Button,
  Card,
  Col,
  Container,
  Image,
  Row,
  Stack,
} from 'react-bootstrap';
import bigStar from '../assets/big_star.svg';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchOneDevice } from '../http/deviceApi';

const DevicePage = () => {
  const { id } = useParams();
  const [device, setDevice] = useState({ info: [] });

  useEffect(() => {
    fetchOneDevice(id).then((data) => setDevice(data));
  }, []);

  return (
    <div>
      <Container className='mt-4'>
        <Row className='m-auto'>
          <Col md={4} className='d-flex justify-content-center '>
            <Image
              width={300}
              height={300}
              src={process.env.REACT_APP_API_URL + '/' + device.img}
            />
          </Col>
          <Col md={4} className='m-auto'>
            <Row className='m-auto justify-content-center'>
              <h2 style={{ textAlign: 'center' }}>{device.name}</h2>
              <div
                className='d-flex align-items-center justify-content-center'
                style={{
                  background: `url(${bigStar}) no-repeat center center`,
                  width: '240px',
                  height: '240px',
                  fill: 'gray',
                  fontSize: '50px',
                }}
              >
                {device.rating}
              </div>
            </Row>
          </Col>
          <Col md={4}>
            <Card
              className='d-flex flex-column align-items-center justify-content-around'
              style={{
                border: '5px solid lightgrey',
                width: '300px',
                height: '300px',
                fontSize: '32px',
              }}
            >
              <h3>{device.price} USD</h3>
              <Button variant='outline-dark'>Add to cart</Button>
            </Card>
          </Col>
        </Row>

        <Stack className='gap-2 m-4'>
          <h1>Description</h1>
          {device.info.map((desc) => (
            <Row
              key={desc.id}
              style={{
                background: `${
                  desc.id % 2 === 0 ? 'lightgrey' : 'transparent'
                }`,
                fontSize: '24px',
                fontWeight: '600',
                padding: '10px',
              }}
            >
              {desc.title}: {desc.description}
            </Row>
          ))}
        </Stack>
      </Container>
    </div>
  );
};

export default DevicePage;
