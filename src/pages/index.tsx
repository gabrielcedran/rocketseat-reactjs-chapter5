import { Button, Flex, Stack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../components/Form/Input";


type SignInFormData = {
  email: string;
  password: string;
}

export default function SignIn() {

  // formState has many properties to help form handling
  const {register, handleSubmit, formState } = useForm()


  // to avoid 'any' in the handle fuction parameter, the type can be declared directly in the function definition 
  // or in the parameters themselves. 
  // The first is preferable as it also covers the second parameter type (event) in case it needs to be used.
  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    await new Promise(resolve=> setTimeout(resolve, 2000));
    
    console.log(values);
  }

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
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Input             
          name="email" 
          type="email" 
          label="Email"
          {...register("email")}
        />

        <Input             
          name="password" 
          type="password" 
          label="Password"
          {...register("password")}
        />
          
        <Button 
          type="submit" 
          colorScheme="pink"
          size="lg"
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>
      </Stack>
    </Flex>
  )
}
