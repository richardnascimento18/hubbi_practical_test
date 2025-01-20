import { DataListItem, DataListRoot } from '@/components/ui/data-list';
type Product = {
  productId: string;
  quantity: number;
};

type Sale = {
  id: string;
  price: number;
  date: string;
};

type Props = {
  itemArray: any[];
  specificItem: string;
  tableType: 'Venda' | 'Compra';
};

export default function ChakraViewMore(props: Props) {
  const item = props.itemArray.find((item) => item.id === props.specificItem);
  console.log(item);
  return (
    <DataListRoot className="text-white">
      {props.tableType === 'Compra' ? (
        item ? (
          <>
            <DataListItem key={item.id} label="ID da Compra" value={item.id} />
            <DataListItem key={item.price} label="Custo" value={item.price} />
            <DataListItem key={item.date} label="Data" value={item.date} />
            <DataListItem key="Sales Title" label="Titulo: " value="Vendas" />
            {item.sales.map((sale: Sale) => (
              <>
                <DataListItem
                  key={sale.id}
                  label="ID da Venda"
                  value={sale.id}
                />
                <DataListItem
                  key={sale.price}
                  label="Preço da Venda"
                  value={sale.price}
                />
                <DataListItem
                  key={sale.date}
                  label="Data da Venda"
                  value={sale.date}
                />
              </>
            ))}
            <DataListItem key="Products Title" label="" value="Produtos:" />
            {item.products.map((product: Product) => (
              <>
                <DataListItem
                  key={product.productId}
                  label="Nome do Produto"
                  value={product.productId}
                />
                <DataListItem
                  key={product.quantity}
                  label="Quantidade do Produto"
                  value={product.quantity}
                />
              </>
            ))}
          </>
        ) : (
          <div>Não encontrado..</div>
        )
      ) : item ? (
        <>
          <DataListItem key={item.id} label="ID da Compra" value={item.id} />
          <DataListItem key={item.price} label="Preço" value={item.price} />
          <DataListItem key={item.date} label="Data" value={item.date} />
          {item.purchaseId !== null ? (
            <DataListItem
              key={item.purchaseId}
              label="ID da Compra:"
              value={`Suprida por (id): ${item.purchaseId}`}
            />
          ) : (
            <DataListItem
              key="Status"
              label="Status da Venda:"
              value="Não suprida."
            />
          )}
          <DataListItem key="Products Title" label="" value="Produtos:" />
          {item.products.map((product: Product) => (
            <>
              <DataListItem
                key={product.productId}
                label="ID do Produto"
                value={product.productId}
              />
              <DataListItem
                key={product.quantity}
                label="Quantidade do Produto"
                value={product.quantity}
              />
            </>
          ))}
        </>
      ) : (
        <div>Não encontrado..</div>
      )}
    </DataListRoot>
  );
}
