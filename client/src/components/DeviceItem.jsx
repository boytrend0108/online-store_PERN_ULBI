import { observer } from 'mobx-react-lite';
import { Card, Col, Image } from 'react-bootstrap';
import star from '../assets/star.svg';
import { useNavigate } from 'react-router-dom';
import { DEVICE_ROUTE } from '../utils/constants';

const DeviceItem = observer(({ device }) => {
  const navigate = useNavigate();

  return (
    <Col
      md={3}
      className='mt-3'
      onClick={() => navigate(`${DEVICE_ROUTE}/${device.id}`)}
    >
      <Card style={{ width: '150px', cursor: 'pointer' }}>
        <Image
          src={process.env.REACT_APP_API_URL + '/' + device.img}
          width={150}
          height={150}
        />

        <div className='d-flex justify-content-between p-2 text-black-50'>
          <div>Samsung</div>

          <div className='d-flex gap-1'>
            <div>5</div>
            <Image src={star} />
          </div>
        </div>
        <div className='p-2'>{device.name}</div>
      </Card>
    </Col>
  );
});

export default DeviceItem;
