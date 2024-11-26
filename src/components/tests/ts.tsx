import * as React from 'react';
import { VariantProp } from '@mui/joy/styles';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Stack from '@mui/joy/Stack';

export default function OrderTable() {
  const [variant, setVariant] = React.useState<VariantProp>('outlined');
  const createOnClick = (value: VariantProp) => () => {
    setVariant(value);
  };
  return (
    <Stack spacing={1} sx={{ alignItems: 'center' }}>
      <ButtonGroup variant={variant} size="sm" aria-label="neutral button group">
        <Button onClick={createOnClick('outlined')}>Outlined</Button>
      </ButtonGroup>
    </Stack>
  );
}
