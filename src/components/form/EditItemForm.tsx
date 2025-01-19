import { Input, Textarea } from '@chakra-ui/react';
import { Field } from '@/components/ui/field';
import {
  NativeSelectField,
  NativeSelectRoot,
} from '@/components/ui/native-select';

interface ChakraEditItemFormProps {}

export default function ChakraEditItemForm(props: ChakraEditItemFormProps) {
  return (
    <>
      <Field label="Nome">
        <Input name="nome..." />
      </Field>
    </>
  );
}
