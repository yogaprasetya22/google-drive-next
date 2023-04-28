import { useState } from "react";
import axios from "axios";
import fs from "fs/promises";
import path from "path";
import Image from "next/image";

const Upload = ({ dirs }) => {
    const [uploading, setUploading] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    const handleUpload = async () => {
        setUploading(true);
        try {
            if (!selectedFile) return;
            const formData = new FormData();
            formData.append("File", selectedFile);
            const { data } = await axios.post("/api/drive/upload", formData);
            console.log(data);
        } catch (error) {
            console.log(error.message);
        }
        setUploading(false);
        // window.location.reload();
    };

    return (
        <div className="max-w-4xl mx-auto p-20 space-y-6">
            <label>
                <input
                    type="file"
                    hidden
                    onChange={({ target }) => {
                        if (target.files) {
                            const file = target.files[0];
                            setSelectedImage(URL.createObjectURL(file));
                            setSelectedFile(file);
                        }
                    }}
                />
                <div className="w-[20rem] aspect-video rounded flex items-center justify-center border-2 border-dashed cursor-pointer">
                    {selectedImage ? (
                        selectedFile.type.split("/")[0] == "image" ? (
                            <Image width={30} height={30} src={selectedImage} alt="" />
                        ) : (
                            <span className=" text-center">
                                {selectedFile.name}
                            </span>
                        )
                    ) : (
                        <span>Select File</span>
                    )}
                </div>
            </label>
            <button
                onClick={handleUpload}
                disabled={uploading}
                style={{ opacity: uploading ? ".5" : "1" }}
                className="bg-red-600 p-3 w-32 text-center rounded text-white"
            >
                {uploading ? "Uploading.." : "Upload"}
            </button>
            <div className="mt-20 flex flex-col space-y-3">
                {dirs.map((item) => (
                    <span
                        key={item}
                        className="text-blue-500 cursor-pointer select-none"
                    >
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
};
export const getServerSideProps = async () => {
    const props = { dirs: [] };
    try {
        const dirs = await fs.readdir(
            path.join(process.cwd(), "/public/uploads")
        );
        props.dirs = dirs;
        return { props };
    } catch (error) {
        return { props };
    }
};

export default Upload;
