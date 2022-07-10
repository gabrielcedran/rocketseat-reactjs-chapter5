import { Box, Button, Checkbox, Flex, Heading, Icon, Link, Spinner, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import NextLink from "next/link";
import { useState } from "react";
import { RiAddLine, RiPencilFill } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { api } from "../../services/api";
import { getUsers, User, UsersResponse, useUsers } from "../../services/hooks/useUsers";
import { queryClient } from "../../services/queryClient";

export default function UserList({users, totalCount}: UsersResponse) {

    const [currentPage, setCurrentPage] = useState(1);

    const {data, isLoading, isFetching, error, refetch} = useUsers(currentPage, {
        initialData: {users, totalCount}
    });


    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true
    })

    async function handlePrefetchUser(userId: number) {
        await queryClient.prefetchQuery(['user', userId], async () => {
            const response = await api.get(`users/${userId}`)

            return response.data;
        }, {
            staleTime: 1000 * 60 * 10 // 10 minutes
        }) 
    }

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
                        <NextLink href="/users/create" passHref>
                            <Button 
                                as="a" 
                                size="sm" 
                                fontSize="sm" 
                                colorScheme="pink" 
                                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                            >
                                Create
                            </Button>
                        </NextLink>
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
                                {data.users.map(user => {
                                    return (
                                        <Tr key={user.id}>
                                        <Td px={["4", "4", "6"]}>
                                            <Checkbox colorScheme="pink"/>
                                        </Td>
                                        <Td>
                                            <Box>
                                                <Link color="purple.400" onMouseEnter={() => handlePrefetchUser(Number(user.id))}>
                                                    <Text fontWeight="bold">{user.name}</Text>
                                                </Link>
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
                            totalItems={data.totalCount}
                            currentPage={currentPage}
                            changeCurrentPage={setCurrentPage}
                        />
                        </>
                    )}
                </Box>
            </Flex>
        </Box>
    );
}


export const getServerSideProps: GetServerSideProps = async () => {
    const {users, totalCount} = await getUsers(1);

    return {
        props: {
            users,
            totalCount
        }
    }
}
