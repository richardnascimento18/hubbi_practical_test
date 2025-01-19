import { IconButton } from '@chakra-ui/react';
import { ReactElement, SVGProps } from 'react';

interface ChakraButtonProps {
  buttonIcon: ReactElement<SVGProps<SVGSVGElement>>;
  style?: string;
}

export default function ChakraButton(props: ChakraButtonProps) {
  return (
    <IconButton aria-label="Search database" className={props.style}>
      {props.buttonIcon}
    </IconButton>
  );
}
