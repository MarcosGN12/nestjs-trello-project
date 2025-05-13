import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useLogin } from "./hooks/use-login";
import { Link, useNavigate } from "react-router-dom";


const loginFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters long")
})

export default function Login() {
    const navigate = useNavigate();
    const { login } = useLogin()

    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    async function onSubmit(values: z.infer<typeof loginFormSchema>) {

        const success = await login(values.email, values.password);

        if (success) {
            navigate("/");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-6 text-white">Log In</h2>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-300">Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-400" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-300">Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            className="bg-gray-700 text-white border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-400" />
                                </FormItem>
                            )}
                        />

                        <div className="text-sm text-center">
                            <span className="text-gray-400">You haven't registered yet? </span>
                            <Link to="/register" className="text-blue-400 hover:underline">Register now</Link>
                        </div>

                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                            Submit
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}