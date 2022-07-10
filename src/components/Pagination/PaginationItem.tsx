import { Button } from "@chakra-ui/react";

interface PaginationItemProps {
    pageNumber: number;
    isCurrent?: boolean;
    changeCurrentPage: (page: number) => void;
}

export function PaginationItem(
    {isCurrent = false, pageNumber, changeCurrentPage}: PaginationItemProps
) {
    if (isCurrent) {
        return(
            <Button 
                size="sm"
                fontSize="xs"
                w="4"
                colorScheme="pink"
                disabled
                _disabled={{
                    bgColor: "pink.500",
                    cursor: "default"
                }}
            >
                {pageNumber}
            </Button>
        )
    }
    return (
        <Button 
            size="sm"
            fontSize="xs"
            w="4"
            bgColor="gray.700"
            _hover={{
                bg: "gray.500"
            }}
            onClick={() => changeCurrentPage(pageNumber)}
        >
            {pageNumber}
        </Button>
    )
}