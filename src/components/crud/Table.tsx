import { Table } from '@chakra-ui/react';
import ChakraButton from './Button';
import { DeleteIcon, EditIcon, ViewMoreIcon } from '@/components/icons';
import ChakraDeleteDialog from './DeleteDialog';
import ChakraPopOver from '../form/PopOver';
import ChakraFieldSet from '../form/Form';
import ChakraViewMore from './ViewMore';
import ChakraEditItemForm from '../form/EditItemForm';

interface ChakraTableProps {
  idTitle: String;
  dateTitle: String;
  priceTitle: String;
  tableType: 'Venda' | 'Compra';
  onViewMore?: () => void;
}

export default function ChakraTable(props: ChakraTableProps) {
  let dialogTitleVariable = 'Detalhes dessa ' + props.tableType;
  return (
    <Table.Root size="sm" striped>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>{props.idTitle}</Table.ColumnHeader>
          <Table.ColumnHeader>{props.dateTitle}</Table.ColumnHeader>
          <Table.ColumnHeader>{props.priceTitle}</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="end">Ações</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {items.map((item) => (
          <Table.Row key={item.id}>
            <Table.Cell>{item.id}</Table.Cell>
            <Table.Cell>{item.date}</Table.Cell>
            <Table.Cell>{item.totalPrice}</Table.Cell>
            <Table.Cell textAlign="end">
              <ChakraPopOver
                popOverSize="lg"
                contentAlignment="self-start"
                dialogTitle={dialogTitleVariable}
                buttonIcon={ViewMoreIcon}
                style="hover:bg-gray-300 transition-colors"
              >
                <ChakraViewMore></ChakraViewMore>
              </ChakraPopOver>
              <ChakraPopOver
                popOverSize="cover"
                contentAlignment="self-center"
                dialogTitle="Formulário de Edição"
                buttonIcon={EditIcon}
                style="bg-yellow-400 hover:bg-yellow-500 transition-colors"
              >
                <ChakraFieldSet
                  formLegend="Formulário de Edição de Item."
                  helperText="Preencha este formulário para editar este item."
                >
                  <ChakraEditItemForm></ChakraEditItemForm>
                </ChakraFieldSet>
              </ChakraPopOver>
              <ChakraDeleteDialog tableType={props.tableType} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}

const items = [
  {
    id: 1193819231983291823,
    date: '11/10/2025',
    totalPrice: 'R$ 999.99',
  },
];
