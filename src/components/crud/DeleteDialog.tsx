import { Button } from '@/components/ui/button';
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface ChakraDeleteDialogProps {
  tableType: string;
}

export default function ChakraDeleteDialog(props: ChakraDeleteDialogProps) {
  return (
    <DialogRoot>
      <DialogTrigger asChild>
        <Button
          variant="solid"
          size="sm"
          className="bg-red-700 text-white hover:bg-red-800 hover:text-red-400 transition-colors"
        >
          Excluir
        </Button>
      </DialogTrigger>
      <DialogContent className="text-white">
        <DialogHeader>
          <DialogTitle>
            Você tem certeza que quer{' '}
            <span className="text-red-600">deletar</span> essa {props.tableType}
            ?
          </DialogTitle>
        </DialogHeader>
        <DialogBody>
          <p>
            Ao deletar essa {props.tableType} você nunca mais poderá restaurá-la
            novamente. Deseja prosseguir?
          </p>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogActionTrigger>
          <Button className="bg-red-700 text-white hover:bg-red-800 hover:text-red-400 transition-colors">
            Deletar
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
