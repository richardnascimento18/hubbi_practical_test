import React, { useEffect, useState } from 'react';
import { Box, Button, Flex, Text, Input, VStack } from '@chakra-ui/react';

import { Checkbox } from '@/components/ui/checkbox';
import { useRouter } from 'next/router';
interface Product {
  id: string;
  name: string;
  price: number;
}

interface Sale {
  id: string;
  price: number;
  products: {
    id: string;
    quantity: number;
    productId: string;
    product: object;
  }[];
  date: string;
  purchaseId: string | null;
}

interface ChakraNewItemFormProps {
  tableType: 'Venda' | 'Compra';
}

export default function ChakraNewItemForm(props: ChakraNewItemFormProps) {
  const router = useRouter();
  const [sales, setSales] = useState<Sale[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedSales, setSelectedSales] = useState<string[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<
    { id: string; quantity: number; minQuantity: number }[]
  >([]);
  const [price, setPrice] = useState<number>(0);
  const [date, setDate] = useState<string>(new Date().toISOString());

  useEffect(() => {
    fetch('/api/sales')
      .then((response) => response.json())
      .then((data) => {
        const availableSales = data.sales.filter(
          (sale: Sale) => sale.purchaseId === null,
        );
        setSales(availableSales);
      });

    fetch('/api/products')
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    const totalPrice = selectedProducts.reduce((sum, product) => {
      const productData = products.find((p) => p.id === product.id);
      return sum + (productData ? productData.price * product.quantity : 0);
    }, 0);
    setPrice(totalPrice);
  }, [selectedProducts, products]);

  const handleSaleSelection = (saleId: string) => {
    if (selectedSales.includes(saleId)) {
      setSelectedSales(selectedSales.filter((id) => id !== saleId));

      const sale = sales.find((s) => s.id === saleId);
      if (sale) {
        const updatedProducts = selectedProducts.filter(
          (product) =>
            !sale.products.some(
              (saleProduct) => saleProduct.productId === product.id,
            ),
        );
        setSelectedProducts(updatedProducts);
      }
    } else {
      const sale = sales.find((s) => s.id === saleId);
      if (sale) {
        const updatedProducts = [...selectedProducts];

        sale.products.forEach(({ productId, quantity, product }) => {
          const existingProduct = updatedProducts.find(
            (p) => p.id === productId,
          );
          if (existingProduct) {
            existingProduct.minQuantity = Math.max(
              existingProduct.minQuantity,
              quantity,
            );
            existingProduct.quantity = Math.max(
              existingProduct.quantity,
              quantity,
            );
          } else {
            updatedProducts.push({
              id: productId,
              quantity,
              minQuantity: quantity,
            });
          }
        });

        setSelectedProducts(updatedProducts);
      }
      setSelectedSales([...selectedSales, saleId]);
    }
  };

  const handleProductQuantityChange = (productId: string, value: number) => {
    setSelectedProducts((prev) =>
      prev.map((product) =>
        product.id === productId
          ? { ...product, quantity: Math.max(value, product.minQuantity) }
          : product,
      ),
    );
  };

  const handleProductSelection = (productId: string) => {
    const isSelected = selectedProducts.some(
      (product) => product.id === productId,
    );

    if (isSelected) {
      setSelectedProducts((prev) =>
        prev.filter((product) => product.id !== productId),
      );
    } else {
      const minQuantity = selectedSales.reduce((sum, saleId) => {
        const sale = sales.find((s) => s.id === saleId);
        const saleProduct = sale?.products.find((p) => p.id === productId);
        return sum + (saleProduct?.quantity || 0);
      }, 0);

      setSelectedProducts([
        ...selectedProducts,
        { id: productId, quantity: minQuantity, minQuantity },
      ]);
    }
  };

  const handleSubmit = async () => {
    const endpoint =
      props.tableType === 'Venda' ? '/api/sales' : '/api/purchases';

    const payload =
      props.tableType === 'Venda'
        ? {
            price,
            products: selectedProducts.map(({ id, quantity }) => ({
              id,
              quantity,
            })),
            date,
            purchaseId: selectedSales[0],
          }
        : {
            price,
            sales: selectedSales,
            products: selectedProducts.map(({ id, quantity }) => ({
              id,
              quantity,
            })),
            date,
          };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Falha ao enviar dados.');
      }

      alert('Envio efetuado com Sucesso!');
      router.reload();
    } catch (error) {
      alert('Envio Falho: ' + error.message);
    }
  };

  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="md">
      <VStack align="stretch">
        {props.tableType === 'Compra' && (
          <Box>
            <Text>Selecione as Vendas</Text>
            {sales.map((sale) => (
              <Checkbox
                key={sale.id}
                checked={selectedSales.includes(sale.id)}
                onChange={() => handleSaleSelection(sale.id)}
              >
                Venda {sale.id} - R${sale.price}
              </Checkbox>
            ))}
          </Box>
        )}

        <Box>
          <Text>Selecione os Produtos</Text>
          {products.map((product) => (
            <Flex key={product.id} align="center" justify="space-between">
              <Checkbox
                checked={selectedProducts.some((p) => p.id === product.id)}
                onChange={() => handleProductSelection(product.id)}
              >
                {product.name}
              </Checkbox>
              {selectedProducts.some((p) => p.id === product.id) && (
                <Input
                  type="number"
                  value={
                    selectedProducts.find((p) => p.id === product.id)?.quantity
                  }
                  min={
                    selectedProducts.find((p) => p.id === product.id)
                      ?.minQuantity || 0
                  }
                  onChange={(e) =>
                    handleProductQuantityChange(
                      product.id,
                      parseInt(e.target.value, 10),
                    )
                  }
                  maxW="100px"
                />
              )}
            </Flex>
          ))}
        </Box>

        <Box>
          <Text>Preço</Text>
          <Input
            type="number"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            disabled
          />
        </Box>

        <Box>
          <Text>Data</Text>
          <Input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Box>

        <Button
          className="bg-green-400 hover:bg-green-500 hover:text-gray-700 transition-colors text-black"
          onClick={handleSubmit}
        >
          Enviar Formulário
        </Button>
      </VStack>
    </Box>
  );
}
