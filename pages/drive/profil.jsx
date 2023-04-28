import Component from "@/lib/Component";
import axios from "axios";
import { useEffect, useState } from "react";

const Profil = () => {
    const [nameFile, setNameFile] = useState("");
    const [miniType, setMiniType] = useState("");
    const [selectFile, setSelectFile] = useState(null);
    const [fileInput, setFileInput] = useState(null);

    const validateFile = (e) => {
        setFileInput(URL.createObjectURL(e.target.files[0]));
        const render = new FileReader();
        render.onload = (e) => {
            // console.log(e.target.result);
            setSelectFile(e.target.result);
        };
        render.readAsDataURL(e.target.files[0]);
        setNameFile(e.target.files[0].name);
        setMiniType(e.target.files[0].type);
    };

    const formHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("file", fileInput);
        formData.append("name", nameFile);
        formData.append("miniType", miniType);

        const res = await axios("/api/drive/upload", {
            method: "POST",
            body: formData,
        })
        
    };

    return (
        <Component title={"Dashboard"}>
            
        </Component>
    );
};

export default Profil;
