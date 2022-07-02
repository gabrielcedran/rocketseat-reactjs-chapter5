import { Button, Flex, Stack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../components/Form/Input";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';


type SignInFormData = {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required("Email is mandatory").email("Invalid email"),
  password: yup.string().required()
})

export default function SignIn() {

  // passing the generic type help to prevent errors when passing the parameter to register function (register('unexpected_input'))
  // formState has many properties to help form handling
  const {register, handleSubmit, formState } = useForm<SignInFormData>({resolver: yupResolver(signInFormSchema)})
  const { errors } = formState;


  // to avoid 'any' in the handle fuction parameter, the type can 
  // (1) be declared directly in the function definition or
  // (2) in the parameters themselves. 
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
          error={errors.email}
          // react hook form comes with a validation mechanism. To use it, just pass an extra parameter after the input name with the constraints
          // e.g register('email', {required: 'This field is mandatory'}) 
          {...register("email")}
        />

        <Input             
          name="password" 
          type="password" 
          label="Password"
          error={errors.password}
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
