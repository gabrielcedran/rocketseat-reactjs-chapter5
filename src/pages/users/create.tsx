import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";

type CreateUserFormData = {
    full_name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

const createUserFormSchema = yup.object().shape({
    full_name: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().required().min(5),
    password_confirmation: yup.string().oneOf([null, yup.ref('password')], 'Password confirmation has to match password.')
})

export default function CreateUser() {

    useEffect(() => {
        console.log("test")
    }, [])

    const {register, handleSubmit, formState} = useForm<CreateUserFormData>({resolver: yupResolver(createUserFormSchema)})
    const {isSubmitting, errors} = formState;

    const handleCreateUser: SubmitHandler<CreateUserFormData> = async (data) => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log(data);
    }

    return(
        <Box>
            <Header />
            <Flex as="form" w="100%" my="6" maxW={1480} mx="auto" px="6" onSubmit={handleSubmit(handleCreateUser)}>
                <Sidebar />

                <Box flex="1" borderRadius={8} bg="gray.800" p={["6", "8"]}>
                    <Heading size="lg" fontWeight="normal">Create User</Heading>

                    <Divider my="6" borderColor="gray.700"/>

                    <VStack spacing="8">
                        <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                            <Input name="name" label="Full Name" error={errors.full_name} {...register("full_name")}/>
                            <Input name="email" label="Email" type="email" error={errors.email} {...register("email")}/>
                        </SimpleGrid>

                        <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
                            <Input name="password" label="Password" type="password" error={errors.password} {...register("password")} />
                            <Input name="password_confirmation" label="Confirm Password" type="password" error={errors.password_confirmation} {...register("password_confirmation")} />
                        </SimpleGrid>
                    </VStack>

                    <Flex mt="8" justify="flex-end">
                        <HStack spacing="4">
                            <Link href="/users" passHref>
                                <Button colorScheme="whiteAlpha">Cancel</Button>
                            </Link>
                            <Button colorScheme="pink" type="submit" isLoading={isSubmitting}>Save</Button>
                        </HStack>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    );
}