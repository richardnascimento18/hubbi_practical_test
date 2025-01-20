import Layout from '@/components/template/Layout';
import ChakraTable from '@/components/crud/Table';
import ChakraPopOver from '@/components/form/PopOver';
import ChakraFieldSet from '@/components/form/Form';
import ChakraNewItemForm from '@/components/form/NewItemForm';

export default function Home() {
  return (
    <Layout title="Vendas" subtitle="Aqui aparecerão todas as vendas!">
      <ChakraTable
        idTitle="Venda ID"
        dateTitle="Data da Venda"
        priceTitle="Preço Total"
        tableType="Venda"
      ></ChakraTable>
      <ChakraPopOver
        popOverSize="cover"
        contentAlignment="self-center"
        buttonText="Adicione Venda"
        dialogTitle="Adicionar nova Venda"
        style="mt-4 bg-green-400 hover:bg-green-500 hover:text-gray-700 transition-colors text-black"
      >
        <ChakraFieldSet
          formLegend="Formulário de nova venda."
          helperText="Preencha este formulário para adicionar uma nova venda."
        >
          <ChakraNewItemForm tableType="Venda"></ChakraNewItemForm>
        </ChakraFieldSet>
      </ChakraPopOver>
    </Layout>
  );
}
