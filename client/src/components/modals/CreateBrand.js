import { Button, Form, Modal } from 'react-bootstrap';
import { createBrand } from '../../http/deviceApi';
import { useState } from 'react';

const CreateBrand = ({ show, onHide }) => {
  const [value, setValue] = useState('');

  const addBrand = () => {
    createBrand({ name: value }).then(() => {
      setValue('');
      onHide();
    });
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
          Add new brand
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Control
            placeholder='Enter brand name'
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={() => onHide()} variant='outline-danger'>
          Close
        </Button>
        <Button variant='outline-success' onClick={addBrand}>
          Add Brand
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateBrand;
