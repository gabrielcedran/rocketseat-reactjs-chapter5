import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

export function Profile() {
    return (
        
    <Flex
        align="center"
    >
        <Box mr="4" textAlign="right">
            <Text>Don Bob</Text>
            <Text
                color="gray.300"
                fontSize="small"
            >
                donbob@bobdon.com
            </Text>
        </Box>

        <Avatar size="md" name="Don Bob" src="https://github.com/gabrielcedran.png" />
    </Flex>
    )
}