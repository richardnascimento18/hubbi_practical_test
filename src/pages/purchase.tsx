import Layout from '@/components/template/Layout';
import ChakraTable from '@/components/crud/Table';
import ChakraPopOver from '@/components/form/PopOver';
import ChakraFieldSet from '@/components/form/Form';
import ChakraNewItemForm from '@/components/form/NewItemForm';

export default function Notifications() {
  return (
    <Layout title="Compras" subtitle="Todas as suas compras aparecerão aqui!">
      <ChakraTable
        idTitle="Compra ID"
        dateTitle="Data da Compra"
        priceTitle="Custo Total"
        tableType="Compra"
      ></ChakraTable>
      <ChakraPopOver
        popOverSize="cover"
        contentAlignment="self-center"
        buttonText="Adicionar Compra"
        dialogTitle="Adicionar nova Compra"
        style="mt-4 bg-green-400 hover:bg-green-500 hover:text-gray-700 transition-colors text-black"
      >
        <ChakraFieldSet
          formLegend="Formulário de nova compra."
          helperText="Preencha este formulário para adicionar uma nova compra."
        >
          <ChakraNewItemForm></ChakraNewItemForm>
        </ChakraFieldSet>
      </ChakraPopOver>
    </Layout>
  );
}
