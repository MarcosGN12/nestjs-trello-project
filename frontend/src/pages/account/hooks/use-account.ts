import { request } from '@/lib/axios';

export function useAccount() {


    async function getName() {
        const name = await request({
            url: "/auth/login/",
            method: "get",
        });
        return name;
    }

    return { getName };
}