import { Flex, Icon, Input } from "@chakra-ui/react";
import { RiSearchLine } from "react-icons/ri";

export function SearchBox() {
    return (
        <Flex
            as="label"
            flex="1"
            py={4}
            px={8}
            ml={6}
            maxW={400}
            alignSelf="center"
            color="gray.200"
            position="relative"
            bg="gray.800"
            borderRadius="full"
            alignItems="center"
        >
            <Input 
                color="gray.50"
                variant="unstyled"
                px={4}
                mr={4}
                placeholder="Search"
                _placeholder={{ color: "gray.400"}}
            /> 

            {/**It is a recommendation from chakra to use Icon component wrapping the icons instead of using them directly (e.g: <RiSearchLine />) */}
            <Icon as={RiSearchLine} fontSize={20}/>
        </Flex>
    )
}