import Navbar from "@/components/navbar";
import Head from "next/head";
import React from "react";

const LayoutRouter = ({ children, router }) => {
    return (
        <>
            <Head>
                <title>{`Jagres - Admin`}</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar router={router}>
                {children}
            </Navbar>
        </>
    );
};

export default LayoutRouter;
