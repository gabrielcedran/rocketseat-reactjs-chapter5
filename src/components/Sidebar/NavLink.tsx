import { Icon, Link as ChakraLink, LinkProps as ChakraLinkProps, Text } from "@chakra-ui/react";
import Link from "next/link";
import { ElementType } from "react";
import { ActiveLink } from "../ActiveLink";

interface NavLinkProps extends ChakraLinkProps {
    // ElementType is used when the component reference is passed down (e.g RiDashboardLine), not the declaration (e.g <RiDashboardLine />).
    icon: ElementType;
    children: string;
    href: string;
}

export function NavLink({icon, children, href, ...rest}) {
    /* nextjs Link component expects a html <a> tag in its root path
       so that it can generate a preview of where that link is gonna take the user to
       on the left bottom corner of the browser.
       As we are using chakra link and it is not directly a html anchor (it will eventually render a html anchor), 
       next link does not what to display on mouse hover. To fix it,
       it is necessary to provide the property "passHref".    
    */
    return(
        <ActiveLink href={href} passHref>
            <ChakraLink display="flex" alignItems="center" {...rest}>
                <Icon as={icon} fontSize="20"/>
                <Text ml="4" fontWeight="medium">{children}</Text>
            </ChakraLink>  
        </ActiveLink>
    )
}