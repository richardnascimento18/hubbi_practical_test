import { Alert } from '@/components/ui/alert';

interface ChakraAlertProps {
  title: string;
  message: string;
}

export default function ChakraAlert(props: ChakraAlertProps) {
  return (
    <Alert status="error" title={props.title} className="bg-red-900">
      {props.message}
    </Alert>
  );
}
