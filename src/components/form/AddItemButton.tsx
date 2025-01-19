import { Button } from '@/components/ui/button';
import { HStack } from '@chakra-ui/react';

interface ChakraAddItemButtonProps {
  buttonText: String;
  style?: string;
}

export default function ChakraAddItemButton(props: ChakraAddItemButtonProps) {
  return (
    <HStack wrap="wrap" gap="6">
      <Button variant="solid" className={props.style}>
        {props.buttonText}
      </Button>
    </HStack>
  );
}
