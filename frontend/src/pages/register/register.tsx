import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRegister } from "./hooks/use-register";
import { useLogin } from "../login/hooks/use-login";
import { Link, useNavigate } from "react-router-dom";

const registerFormSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(8, "Password must be at least 8 characters long")
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: "custom",
            message: "The passwords did not match",
            path: ['confirmPassword']
        });
    }
});

export default function Register() {
    const navigate = useNavigate();
    const { register } = useRegister()
    const { login } = useLogin()

    const form = useForm<z.infer<typeof registerFormSchema>>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
    })

    async function onSubmit(values: z.infer<typeof registerFormSchema>) {
        const data = await register(
            values.name,
            values.email,
            values.password
        )

        // evitamos que aparezca el doble error de email ya registrado y no se ha podido logear
        // ya que si hacemos registro nos logeamos directamente pero si falla nos saltara el error
        // dentro del login en las siguientes lineas por su funcion que tambien tiene otro error de toast
        if (!data) {
            return;
        }

        const success = await login(data.email, values.password);

        if (success) {
            navigate("/");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-6 text-white">Register</h2>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-300">Name</FormLabel>
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

                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-300">Confirm password</FormLabel>
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
                            <span className="text-gray-400">Already have an account? </span>
                            <Link to="/login" className="text-blue-400 hover:underline">Log in</Link>
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