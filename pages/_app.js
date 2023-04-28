import LinkRouter from "@/lib/Layout-router";
import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import { AppProps } from "next/app";

export default function App({ Component, router, pageProps }, AppProps) {
    return (
        <ThemeProvider attribute="class">
            <LinkRouter router={router.asPath}>
                <Component {...pageProps} />
            </LinkRouter>
        </ThemeProvider>
    );
}
