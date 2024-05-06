import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { Context } from '..';
import { ListGroup } from 'react-bootstrap';

const TypeBar = observer(() => {
  const { device } = useContext(Context);

  return (
    <ListGroup className='mt-2' bg='dark' data-bs-theme='dark'>
      {device.types.map((type) => (
        <ListGroup.Item
          active={device.selectedType.id === type.id}
          key={type.id}
          onClick={() => device.setSelectedType(type)}
          style={{ cursor: 'pointer' }}
        >
          {type.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
});

export default TypeBar;
