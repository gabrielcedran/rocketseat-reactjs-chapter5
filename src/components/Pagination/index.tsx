import { Box, Stack, Text } from "@chakra-ui/react";
import { last } from "lodash";
import { PaginationItem } from "./PaginationItem";

interface PaginationProps {
    totalItems: number;
    pageSize?: number;
    currentPage?: number;
    changeCurrentPage: (page: number) => void;
}

const numberOfPaginationButtons = 1;

function generatePageButtonsArray(from: number, to: number) {
    // generatePageButtonsArray(2,5)
    // 1st an array with 3 positions is created
    // 2nd each position is filled in with its related index. (E.g from = 2, index = 0, constant = 1 equates to 3, the next to 4, the next to 5)
    // 3rd any negative value is discarded as there is no negative page
    // result [3, 4, 5]

    return [...new Array(to - from)]
        .map((_, index) => {
            return from + index + 1
        })
        .filter(page => page > 0);
}

export function Pagination({totalItems, pageSize = 10, currentPage = 1, changeCurrentPage}: PaginationProps) {
    
    const previousPages = currentPage > 1 
                        ? generatePageButtonsArray(currentPage - 1 - numberOfPaginationButtons, currentPage - 1) 
                        : [];
    
    const lastPage = Math.floor(totalItems / pageSize);
    const nextPages = currentPage < lastPage 
                        ? generatePageButtonsArray(currentPage, Math.min(currentPage + numberOfPaginationButtons, lastPage))
                        : [];


    return(
        <Stack
            direction={["column", "row"]}
            mt="8"
            justify="space-between"
            align="center"
            spacing="6"
        >
            <Box>
                <strong>0</strong> - <strong>10</strong> of <strong>100</strong>
            </Box>
            <Stack direction="row" spacing="2">

                {currentPage > (1 + numberOfPaginationButtons) && (
                    <>
                        <PaginationItem pageNumber={1} changeCurrentPage={changeCurrentPage}/>
                        {currentPage > (2 + numberOfPaginationButtons) && <Text color="gray.300" w="8" textAlign="center">...</Text>}
                    </>
                )}

                {previousPages.length > 0 && previousPages.map(page => {
                    return <PaginationItem key={page} pageNumber={page} changeCurrentPage={changeCurrentPage} />;
                })}

                <PaginationItem pageNumber={currentPage} changeCurrentPage={changeCurrentPage} isCurrent />

                {nextPages.length > 0 && nextPages.map(page => {
                    return <PaginationItem key={page} pageNumber={page} changeCurrentPage={changeCurrentPage} />;
                })}

                {currentPage + numberOfPaginationButtons < lastPage && (
                    <>
                        {currentPage + 1 + numberOfPaginationButtons < lastPage && <Text color="gray.300" w="8" textAlign="center">...</Text>}
                        <PaginationItem pageNumber={lastPage} changeCurrentPage={changeCurrentPage} />
                    </>
                )}
            </Stack>
        </Stack>
    )
}