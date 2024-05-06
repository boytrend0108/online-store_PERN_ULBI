import { Button, Container } from 'react-bootstrap';
import CreateBrand from '../components/modals/CreateBrand';
import CreateDevice from '../components/modals/CreateDevice';
import CreateType from '../components/modals/CreateType';
import { useState } from 'react';

const Admin = () => {
  const [showBrand, setShowBrand] = useState(false);
  const [showType, setShowType] = useState(false);
  const [showDevice, setShowDevice] = useState(false);
  return (
    <Container className='d-flex flex-column gap-2 mt-4'>
      <Button variant='outline-dark' onClick={() => setShowType(true)}>
        Add type
      </Button>
      <Button variant='outline-dark' onClick={() => setShowBrand(true)}>
        Add brand
      </Button>
      <Button variant='outline-dark' onClick={() => setShowDevice(true)}>
        Add device
      </Button>

      <CreateBrand show={showBrand} onHide={() => setShowBrand(false)} />
      <CreateDevice
        show={showDevice}
        onHide={() => {
          setShowDevice(false);
        }}
      />
      <CreateType show={showType} onHide={() => setShowType(false)} />
    </Container>
  );
};

export default Admin;
