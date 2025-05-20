import { request } from '@/lib/axios';
import { toast } from 'sonner';

export function useRegister() {

    async function register(name: string, email: string, password: string) {
        try {
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
        catch (error) {
            console.error("Login error:", error);
            toast("Email conflict", {
                description: "This email has been already registered",
            });
            return false;
        }
    }

    return { register }
}