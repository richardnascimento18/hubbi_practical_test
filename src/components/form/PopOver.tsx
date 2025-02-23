import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import ChakraButton from '../crud/Button';
import { ReactElement, SVGProps } from 'react';
import { Button, HStack } from '@chakra-ui/react';

interface ChakraPopOverProps {
  children?: any;
  buttonIcon?: ReactElement<SVGProps<SVGSVGElement>>;
  buttonText?: string;
  style?: string;
  dialogTitle: string;
  popOverSize: 'cover' | 'full' | 'lg';
  contentAlignment: 'self-center' | 'self-start';
}

export default function ChakraPopOver(props: ChakraPopOverProps) {
  return (
    <DialogRoot
      size={props.popOverSize}
      placement="center"
      motionPreset="slide-in-bottom"
    >
      <DialogTrigger asChild>
        {props.buttonText ? (
          <HStack wrap="wrap" gap="6">
            <Button
              variant="solid"
              className="mt-4 bg-green-400 hover:bg-green-500 hover:text-gray-700 transition-colors text-black"
            >
              {props.buttonText}
            </Button>
          </HStack>
        ) : (
          <Button variant="plain" className="p-0 mr-4">
            <ChakraButton
              buttonIcon={props.buttonIcon}
              style={props.style}
            ></ChakraButton>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-white">{props.dialogTitle}</DialogTitle>
          <DialogCloseTrigger />
        </DialogHeader>
        <DialogBody className={props.contentAlignment}>
          {props.children}
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
}
