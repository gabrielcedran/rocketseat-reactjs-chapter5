import { FormControl, FormErrorMessage, FormLabel, Input as ChakraInput, InputProps as ChakraInputProps } from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";

interface InputProps extends ChakraInputProps {
    name: string;
    label?: string;
    error?: FieldError


    // ref?: element; would never work because refs are an special component in react and needs special handling (known as ref forwarding)
    // 1st convert regular function into arrow function if necessary - forwardRef only works with arrow function.
    // 2nd wrap the component with react's forwardRef function - it will add the ref property.
    // 3rd receive ref as the second parameter of the function (after props)
    // 4th to type the ref parameter (and avoid any) and use the native ForwardRefRenderFunction component (first generics is the ref type e.g HTMLInputElement, second the props type)
} 

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({name, label, error = null, ...rest}, ref) => {
    return(
        <FormControl isInvalid={!!error}>
            {!!label &&<FormLabel htmlFor={name}>{label}</FormLabel>}
            <ChakraInput 
                name={name}
                id={name}
                type="text"
                focusBorderColor="pink.500"
                bgColor="gray.900"
                variant="filled"
                _hover={{
                    bgCOlor: "gray.900"
                }}
                size="lg"
                ref={ref}
                { ...rest }
            />
            {!!error &&
            <FormErrorMessage>
                {error.message}
            </FormErrorMessage>
            }
        </FormControl>
    )
}

export const Input = forwardRef(InputBase);