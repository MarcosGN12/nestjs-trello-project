import { Toaster } from "sonner";
import CustomRouterProvider from "./router";

export default function Providers() {
    return (
        <>
            <CustomRouterProvider />
            <Toaster />
        </>
    )
}
