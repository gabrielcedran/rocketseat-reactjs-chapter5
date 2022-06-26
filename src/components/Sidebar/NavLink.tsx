import { Icon, Link, LinkProps as ChakraLinkProps, Text } from "@chakra-ui/react";
import { ElementType } from "react";
import { RiDashboardLine } from "react-icons/ri";

interface NavLinkProps extends ChakraLinkProps {
    // ElementType is used when the component reference is passed down (e.g RiDashboardLine), not the declaration (e.g <RiDashboardLine />).
    icon: ElementType;
    children: string;
}

export function NavLink({icon, children, ...rest}) {
    return(
        <Link display="flex" alignItems="center" {...rest}>
            <Icon as={icon} fontSize="20"/>
            <Text ml="4" fontWeight="medium">{children}</Text>
        </Link>  
    )
}