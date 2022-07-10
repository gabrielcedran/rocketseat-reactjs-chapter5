import { useQuery } from "react-query";
import { api } from "../api";


type User = {
    id: string;
    name: string;
    email: string;
    created_at: string;
}

type UsersResponse = {
    users: User[];
    totalCount: number;
}

export async function getUsers(currentPage: number): Promise<UsersResponse> {

    const { data, headers } = await api.get('/users', {
        params: {
            page: currentPage
        }
    });

    const totalCount = Number(headers['x-total-count']);
    
    const users = data.users.map(user => {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            created_at: new Date(user.created_at).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })
        }
    });

    return {
        totalCount,
        users
    };
}

export function useUsers(currentPage: number) {
    return useQuery(['users', currentPage], () => getUsers(currentPage), {
        staleTime: 1000 * 5
    })
}