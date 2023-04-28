import Component from "@/lib/Component";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Pribadi = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [kondisi, setKondisi] = useState(false);
    const [alertLogin, setAlertLogin] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (username == "jagres" && password == "jagres112.") {
            setKondisi(true);
        } else {
            setAlertLogin(true);
            setKondisi(false);
        }
    };
    return (
        <Component title={"Pribadi"}>
            {!kondisi ? (
                <div className="flex items-center justify-center h-screen">
                    <div className="bg-white dark:bg-[#1f2937] rounded shadow-lg p-10 flex flex-col gap-5">
                        {alertLogin && (
                            <div className="mockup-code">
                                <pre data-prefix=">" className="text-warning">
                                    <code>Passowrd Salah</code>
                                </pre>
                            </div>
                        )}
                        <input
                            type="text"
                            placeholder="Username.."
                            className="input input-bordered w-full max-w-xs"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password.."
                            className="input input-bordered w-full max-w-xs"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            className="btn btn-primary"
                            onClick={(e) => handleLogin(e)}
                        >
                            Login
                        </button>
                    </div>
                </div>
            ) : (
                <>
                    <Konss />
                </>
            )}
        </Component>
    );
};

const Konss = () => {
    const [dataDrive, setDataDrive] = useState([]);
    const [loading, setLoading] = useState(false);
    const result = async () => {
        setLoading(true);
        const response = await axios.get("/api/drive");
        setDataDrive(response.data);
        setLoading(false);
    };
    useEffect(() => {
        result();
    }, []);
    return (
        <div className="w-full flex justify-center items-center flex-wrap flex-row gap-5 ">
            {dataDrive.map((dir) => (
                <div key={dir.fileId}>
                    {dir.fileName.split(".")[1] == "mp4" && (
                        <KelolaImage dir={dir} loading={loading} />
                    )}
                </div>
            ))}
        </div>
    );
};

const KelolaImage = ({ loading, dir }) => {
    loading = false;
    console.log(dir.webContentLink);
    const handleDelete = async (e) => {
        e.preventDefault();
        const response = await axios.delete(`/api/drive/delete/${dir.fileId}`);
        if (response.data.done == "sukses") {
            console.log(response.data);
            window.location.reload();
        }
    };
    return (
        <>
            {loading ? (
                <div
                    key={dir.fileId}
                    role="status"
                    className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center"
                >
                    <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
                        <svg
                            className="w-12 h-12 text-gray-200"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 640 512"
                        >
                            <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                        </svg>
                    </div>
                    <span className="sr-only">Loading...</span>
                </div>
            ) : (
                <div
                    className="card card-compact w-96 bg-cyan-800 backdrop-blur-sm shadow-md my-[2rem] z-10 glass"
                    key={dir.fileId}
                >
                    <Link href={dir.webViewLink}>
                        <figure>
                            <LazyLoadImage
                                src={"../assets/Calendar.png"}
                                alt={dir.fileName}
                                className=" rounded-t-xl h-[15rem]"
                            />
                        </figure>
                    </Link>
                    <div className="card-body text-center">
                        <Link href={dir.webViewLink}>
                            <span className="text-blue-200 font-semibold hover:underline ">
                                {dir.fileName}
                            </span>
                        </Link>
                        <div className="absolute right-0 top-0 pt-2 px-2">
                            <div className="dropdown dropdown-bottom dropdown-end ">
                                <label
                                    tabIndex={0}
                                    className="btn btn-xs btn-secondary"
                                >
                                    opsi
                                </label>
                                <ul
                                    tabIndex={0}
                                    className="dropdown-content menu p-2 shadow rounded-box w-52 bg-cyan-200 text-gray-800 z-50 hover:bg-cyan-400"
                                >
                                    <li>
                                        <span onClick={(e) => handleDelete(e)}>
                                            Delete
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Pribadi;
