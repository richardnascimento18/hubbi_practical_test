import { DataListItem, DataListRoot } from '@/components/ui/data-list';

const stats = [
  { label: 'Nome:', value: 'George' },
  { label: 'Total Price:', value: '£12,340' },
];

export default function ChakraViewMore() {
  return (
    <DataListRoot className="text-white">
      {stats.map((item) => (
        <DataListItem key={item.label} label={item.label} value={item.value} />
      ))}
    </DataListRoot>
  );
}
