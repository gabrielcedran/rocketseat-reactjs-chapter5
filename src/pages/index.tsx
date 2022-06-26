import { Button, Flex, Stack } from "@chakra-ui/react";
import { Input } from "../components/Form/Input";

export default function SignIn() {
  return (
    <Flex 
      w="100vw" 
      h="100vh" 
      alignItems="center" 
      justifyContent="center"
    >
      <Stack
        as="form"
        w="100%"
        maxW={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        spacing={4}
      >
        <Input             
          name="email" 
          type="email" 
          label="Email"/>

        <Input             
          name="password" 
          type="password" 
          label="Password"/>
          
        <Button 
          type="submit" 
          colorScheme="pink"
          size="lg"
        >
          Entrar
        </Button>
      </Stack>
    </Flex>
  )
}
