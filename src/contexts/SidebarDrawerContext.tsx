import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/react";
import { createContext, ReactNode, useContext } from "react";

interface SidebarDrawerProviderProps {
    children: ReactNode
}


type SidebarDrawerContactData = UseDisclosureReturn


const SidebarDrawerContext = createContext({} as SidebarDrawerContactData)

export function SidebarDrawerProvider({children}: SidebarDrawerProviderProps) {

    const disclosure = useDisclosure()

    return (
        <SidebarDrawerContext.Provider value={disclosure}>
            {children}
        </SidebarDrawerContext.Provider>
    )
}

export const useSidebarDrawer = () => useContext(SidebarDrawerContext)

