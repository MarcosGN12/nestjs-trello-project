import { request } from '@/lib/axios';
import axios from 'axios';

export function useRegister() {

    async function register(name: string, email: string, password: string) {
        const data = await request({
            url: "/auth/register/",
            method: "post",
            data: {
                name,
                email,
                password
            }
        })

        console.log(data)

        return data
    }

    return { register }
}