import { Box, Button, Checkbox, Flex, Heading, Icon, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react";
import Link from "next/link";
import { RiAddLine, RiPencilFill } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { useUsers } from "../../services/hooks/useUsers";

export default function UserList() {

    const {data, isLoading, isFetching, error, refetch} = useUsers();


    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true
    })

    return(
        <Box>
            <Header />
            <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
                <Sidebar />

                <Box flex="1" borderRadius={8} bg="gray.800" p="8">
                    <Flex mb="8" justify="space-between" align="center">
                        <Heading size="lg" fontWeight="normal">
                            Users

                            {!isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4" />}
                        </Heading>
                        <Button onClick={() => {refetch()}} ml="auto" mr="4" size="sm" fontSize="sm">
                            Refresh
                        </Button>
                        <Link href="/users/create" passHref>
                            <Button 
                                as="a" 
                                size="sm" 
                                fontSize="sm" 
                                colorScheme="pink" 
                                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                            >
                                Create
                            </Button>
                        </Link>
                    </Flex>

                    {isLoading ? (
                        <Flex justify="center">
                            <Spinner/>
                        </Flex>
                    ) : error ? (
                        <Flex justify="center">
                            <Text>Unexpected error while fetching data.</Text>
                        </Flex>
                    ) : (
                        <>
                        <Table colorScheme="whiteAlpha">
                            <Thead>
                                <Tr>
                                    <Th px={["4", "4", "6"]} color="gray.300" w={8}>
                                        <Checkbox colorScheme="pink"/>
                                    </Th>
                                    <Th>
                                        User
                                    </Th>
                                    {isWideVersion &&<Th>
                                        Creation Date
                                    </Th>}
                                    <Th w="8">

                                    </Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {data.map(user => {
                                    return (
                                        <Tr key={user.id}>
                                        <Td px={["4", "4", "6"]}>
                                            <Checkbox colorScheme="pink"/>
                                        </Td>
                                        <Td>
                                            <Box>
                                                <Text fontWeight="bold">{user.name}</Text>
                                                <Text fontSize="sm" color="gray.300">{user.email}</Text>
                                            </Box>
                                        </Td>
                                        {isWideVersion &&
                                        <Td>
                                            {user.created_at}
                                        </Td>}
                                        <Td>
                                            <Button 
                                                as="a" 
                                                size="sm" 
                                                fontSize="sm" 
                                                colorScheme="purple" 
                                                leftIcon={<Icon as={RiPencilFill} fontSize="16" />}
                                            >
                                                {isWideVersion ? 'Edit' : ''}
                                            </Button>
                                        </Td>
                                    </Tr>
                                    )
                                })}

                            </Tbody>
                        </Table>
                        <Pagination 
                            totalItems={200}
                            currentPage={5}
                            onPageChange={() => {}}
                        />
                        </>
                    )}
                </Box>
            </Flex>
        </Box>
    );
}