import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { cloneElement, ReactElement } from "react";

interface ActiveLinkProps extends LinkProps {
    // ReactElement forces the type to be a react component
    // ReactNode accepts react component and other types like string, number, etc.
    children: ReactElement;
    matchExactPath?: boolean
}

export function ActiveLink({children, matchExactPath = false, ...rest}: ActiveLinkProps) {
    // asPath = active path
    const {asPath} = useRouter()

    let isActive = false;

    if (matchExactPath && asPath === rest.href || asPath === rest.as) {
        isActive = true;
    } else if (!matchExactPath && 
                (asPath.startsWith(String(rest.href)) || 
                asPath.startsWith(String(rest.as)))) {
        isActive = true;
    }

    // cloneElement allows an element to be cloned and have properties overridden as it is not possible
    // to change properties on the fly. 
    return (
        <Link {...rest}>
            {cloneElement(children, {
                color: isActive ? 'pink.400' : 'gray.50'
            })}
        </Link>
    )
}