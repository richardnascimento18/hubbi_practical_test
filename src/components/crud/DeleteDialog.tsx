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
import { useRouter } from 'next/router';

interface ChakraDeleteDialogProps {
  tableType: string;
  itemId: string;
}

export default function ChakraDeleteDialog(props: ChakraDeleteDialogProps) {
  const router = useRouter();
  async function deleteItem(itemId: string) {
    let response;
    try {
      if (props.tableType === 'Venda') {
        response = await fetch('/api/sales', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'sale-id': itemId,
          },
        });

        if (!response.ok) {
          throw new Error('Falha ao deletar Venda.');
        }
        router.reload();
      } else if (props.tableType === 'Compra') {
        response = await fetch('/api/purchases', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'purchase-id': itemId,
          },
        });

        if (!response.ok) {
          throw new Error('Falha ao deletar Compra.');
        }

        router.reload();
      }
    } catch (error) {
      console.error('Erro na deleção:', error);
    }
  }

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
          <Button
            className="bg-red-700 text-white hover:bg-red-800 hover:text-red-400 transition-colors"
            onClick={() => deleteItem(props.itemId)}
          >
            Deletar
          </Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
