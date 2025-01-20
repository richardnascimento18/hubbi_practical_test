import { HStack } from '@chakra-ui/react';
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from '@/components/ui/pagination';

interface ChakraPaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function ChakraPagination(props: ChakraPaginationProps) {
  return (
    <PaginationRoot
      count={props.totalPages}
      page={props.currentPage}
      pageSize={13}
      defaultPage={1}
      onPageChange={(details: { page: number }) =>
        props.onPageChange(details.page)
      }
    >
      <HStack>
        <PaginationPrevTrigger />
        <PaginationItems />
        <PaginationNextTrigger />
      </HStack>
    </PaginationRoot>
  );
}
