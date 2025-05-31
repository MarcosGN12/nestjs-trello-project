import { request } from '@/lib/axios';
import { toast } from 'sonner';

export function useLogin() {
    async function login(email: string, password: string) {
        try {
            const data = await request({
                url: "/auth/login/",
                method: "post",
                data: { email, password }
            })

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

        catch (error) {
            console.error("Login error:", error);
            toast("Failed to log in", {
                description: "Email or password incorrect",
            });
            return false;
        }
    }

    return { login }
}