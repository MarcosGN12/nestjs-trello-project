import { request } from '@/lib/axios';

export function useLogin() {
    async function login(email: string, password: string) {
        const data = await request({
            url: "/auth/login/",
            method: "post",
            data: { email, password }
        })

        console.log({ data });

        const token = data.token;

        if (token) {
            localStorage.setItem('token', token);
        }

        else {
            console.error('No token received from response');
        }

        // !! para transformar un string a booleano (doble negacion)
        return !!token;
    }

    return { login }
}