import { Table } from '@chakra-ui/react';
import { ViewMoreIcon } from '@/components/icons';
import ChakraDeleteDialog from './DeleteDialog';
import ChakraPopOver from '../form/PopOver';
import ChakraViewMore from './ViewMore';
import { useEffect, useState } from 'react';
import ChakraPagination from './Pagination';

interface ChakraTableProps {
  idTitle: String;
  dateTitle: String;
  priceTitle: String;
  tableType: 'Venda' | 'Compra';
  onViewMore?: () => void;
}

export default function ChakraTable(props: ChakraTableProps) {
  let dialogTitleVariable = 'Detalhes dessa ' + props.tableType;

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  async function fetchData(currentPage: number) {
    try {
      if (props.tableType === 'Compra') {
        let url = `/api/purchases?page=${currentPage}&limit=13`;
        const res = await fetch(url);
        const { purchases, total } = await res.json();
        setData(purchases);
        setTotal(total);
      } else if (props.tableType === 'Venda') {
        let url = `/api/sales?page=${currentPage}&limit=13`;
        const res = await fetch(url);
        const { sales, total } = await res.json();
        setData(sales);
        setTotal(total);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function onPageChange(newPage: number) {
    setPage(newPage);
    fetchData(newPage);
  }

  useEffect(() => {
    fetchData(page);
  }, []);
  console.log(data);

  return (
    <>
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
          {data.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>{item.id}</Table.Cell>
              <Table.Cell>
                {new Date(item.date).toLocaleDateString('pt-BR')}
              </Table.Cell>
              <Table.Cell>{`R$ ${item.price.toFixed(2)}`}</Table.Cell>
              <Table.Cell textAlign="end">
                <ChakraPopOver
                  popOverSize="lg"
                  contentAlignment="self-start"
                  dialogTitle={dialogTitleVariable}
                  buttonIcon={ViewMoreIcon}
                  style="hover:bg-gray-300 transition-colors"
                >
                  <ChakraViewMore
                    itemArray={data}
                    specificItem={item.id}
                    tableType={props.tableType}
                  ></ChakraViewMore>
                </ChakraPopOver>
                <ChakraDeleteDialog
                  tableType={props.tableType}
                  itemId={item.id}
                />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <ChakraPagination
        totalPages={total}
        currentPage={page}
        onPageChange={onPageChange}
      ></ChakraPagination>
    </>
  );
}
