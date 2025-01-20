import { Button, Fieldset, Stack } from '@chakra-ui/react';

interface ChakraFieldSetProps {
  formLegend: string;
  helperText: string;
  children: any;
}

export default function ChakraFieldSet(props: ChakraFieldSetProps) {
  return (
    <Fieldset.Root size="lg" maxW="md">
      <Stack>
        <Fieldset.Legend>{props.formLegend}</Fieldset.Legend>
        <Fieldset.HelperText>{props.helperText}</Fieldset.HelperText>
      </Stack>

      <Fieldset.Content className="text-white">
        {props.children}
      </Fieldset.Content>
      <Fieldset.ErrorText>
        Algumas áreas estão invalidas. Por favor, cheque-as.
      </Fieldset.ErrorText>
    </Fieldset.Root>
  );
}
