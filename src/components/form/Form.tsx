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

      <Button
        type="submit"
        alignSelf="flex-start"
        className="bg-green-400 hover:bg-green-500 hover:text-gray-700 transition-colors text-black"
      >
        Enviar Formulário
      </Button>
    </Fieldset.Root>
  );
}
