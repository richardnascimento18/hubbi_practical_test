import { Input, Textarea } from '@chakra-ui/react';
import { Field } from '@/components/ui/field';
import {
  NativeSelectField,
  NativeSelectRoot,
} from '@/components/ui/native-select';

interface ChakraNewItemFormProps {}

export default function ChakraNewItemForm(props: ChakraNewItemFormProps) {
  return (
    <>
      <Field label="Nome">
        <Input name="nome..." />
      </Field>
      <Field label="Pais">
        <NativeSelectRoot>
          <NativeSelectField
            className="text-gray-400"
            name="pais.."
            items={['United Kingdom (UK)', 'Canada (CA)', 'United States (US)']}
          />
        </NativeSelectRoot>
      </Field>
      <Field label="notas">
        <Textarea name="notas..." />
      </Field>
    </>
  );
}
