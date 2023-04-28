import Component from "@/lib/Component";
import React from "react";

const Profil = () => {
    return (
        <Component title={"Profil"}>
            <div className="flex items-center justify-center h-screen">
                <div className="bg-white dark:bg-[#1f2937] rounded shadow-lg p-10">
                    <h1 className="text-2xl font-bold mb-5">Profil</h1>
                </div>
            </div>
        </Component>
    );
};

export default Profil;
