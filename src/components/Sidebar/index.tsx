import { Box, Icon, Link, Stack, Text } from "@chakra-ui/react";
import { RiContactsLine, RiDashboardLine, RiGitMergeLine, RiInputMethodLine } from "react-icons/ri";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function Sidebar() {
    return(
        <Box as="aside" w="64" mr="8">
            <Stack spacing="12">
                <NavSection title="MAIN">
                    <NavLink icon={RiDashboardLine}>Dashboard</NavLink>
                    <NavLink icon={RiContactsLine}>Contacts</NavLink>
                </NavSection>
                <NavSection title="AUTOMATION">
                    <NavLink icon={RiInputMethodLine}>Form</NavLink>
                    <NavLink icon={RiGitMergeLine}>Automation</NavLink>
                </NavSection>
            </Stack>
        </Box>
    )
}