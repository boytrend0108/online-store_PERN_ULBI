import {
  Button,
  Col,
  Dropdown,
  DropdownToggle,
  Form,
  Modal,
  Row,
} from 'react-bootstrap';
import { Context } from '../..';
import { useContext, useEffect, useState } from 'react';
import { createDevice, fetchBrands, fetchTypes } from '../../http/deviceApi';
import { observer } from 'mobx-react-lite';

const CreateDevice = observer(({ show, onHide }) => {
  const { device } = useContext(Context);
  const [info, setInfo] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchTypes().then((data) => {
      device.setTypes(data);
    });
    fetchBrands().then((data) => {
      device.setBrands(data);
    });
  }, []);

  const selectFile = (e) => {
    setFile(e.target.files[0]);
  };

  const addInfo = () => {
    setInfo([...info, { title: '', description: '', number: Date.now() }]);
  };

  const removeInfo = (number) => {
    setInfo(info.filter((el) => el.number !== number));
  };

  const changeInfo = (key, value, number) => {
    setInfo(
      info.map((i) => (i.number === number ? { ...i, [key]: value } : i))
    );
  };

  const addDevice = () => {
    const formData = new FormData();

    formData.append('name', name);
    formData.append('price', `${price}`);
    formData.append('img', file);
    formData.append('brandId', device.selectedBrand.id);
    formData.append('typeId', device.selectedType.id);
    formData.append('info', JSON.stringify(info));

    createDevice(formData).then(() => onHide());
  };

  return (
    <Modal
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Add new device
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Dropdown className='mb-4'>
            <DropdownToggle>
              {device.selectedType.name || 'Select type'}
            </DropdownToggle>
            <Dropdown.Menu>
              {device.types.map((type) => (
                <Dropdown.Item
                  onClick={() => device.setSelectedType(type)}
                  key={type.id}
                >
                  {type.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown>
            <DropdownToggle>
              {device.selectedBrand.name || 'Select brand'}
            </DropdownToggle>
            <Dropdown.Menu>
              {device.brands.map((brand) => (
                <Dropdown.Item
                  onClick={() => device.setSelectedBrand(brand)}
                  key={brand.id}
                >
                  {brand.name}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <Form.Control
            placeholder='Enter name'
            className='mt-3'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Control
            value={price}
            placeholder='Enter price'
            className='mt-3'
            type='number'
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          <Form.Control
            placeholder='Add image'
            className='mt-3'
            type='file'
            onChange={selectFile}
          />
          <hr />

          <Button variant='outline-dark' onClick={addInfo}>
            Add new option
          </Button>

          {info.map((i) => (
            <Row key={i.number}>
              <Col md={4} className='mt-3'>
                <Form.Control
                  placeholder='Enter title'
                  value={i.title}
                  onChange={(e) =>
                    changeInfo('title', e.target.value, i.number)
                  }
                />
              </Col>
              <Col md={4} className='mt-3'>
                <Form.Control
                  placeholder='Enter description'
                  value={i.description}
                  onChange={(e) =>
                    changeInfo('description', e.target.value, i.number)
                  }
                />
              </Col>
              <Col md={4} className='mt-3'>
                <Button
                  variant='outline-danger'
                  onClick={() => removeInfo(i.number)}
                >
                  Delete
                </Button>
              </Col>
            </Row>
          ))}
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={() => onHide()} variant='outline-danger'>
          Close
        </Button>
        <Button variant='outline-success' onClick={addDevice}>
          Add Device
        </Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateDevice;
