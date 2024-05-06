import React from 'react';
import { observer } from 'mobx-react-lite';
import { Card, Stack } from 'react-bootstrap';
import { Context } from '..';
import { useContext } from 'react';

const BrandBar = observer(() => {
  const { device } = useContext(Context);

  return (
    <Stack
      className='d-flex mt-2'
      direction='horizontal'
      gap={2}
      style={{ flexWrap: 'wrap' }}
    >
      {device.brands.map((brand) => (
        <Card
          style={{ cursor: 'pointer' }}
          key={brand.id}
          className='p-3'
          onClick={() => device.setSelectedBrand(brand)}
          border={brand.id === device.selectedBrand.id ? 'danger' : 'secondary'}
        >
          {brand.name}
        </Card>
      ))}
    </Stack>
  );
});

export default BrandBar;
