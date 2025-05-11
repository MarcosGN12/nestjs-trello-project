import React from "react";
import CustomRouterProvider from "./router";

export default function Providers() {
    return (
        <React.StrictMode>
            <CustomRouterProvider />
        </React.StrictMode>
    )
}
