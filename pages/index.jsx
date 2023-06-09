import Component from "@/lib/Component";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Home = () => {
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
        <Component title={"Dashboard"}>
            <div className="w-full flex justify-center items-center flex-wrap flex-row gap-5 ">
                {dataDrive.map((dir) => {
                    return (
                        <>
                            {dir.fileName.split(".")[1] == "png" ||
                            dir.fileName.split(".")[1] == "jpg" ||
                            dir.fileName.split(".")[1] == "jpeg" ? (
                                <KelolaImage dir={dir} loading={loading} />
                            ) : (
                                <>
                                    {dir.fileName.split(".")[1] === "mp4" ||
                                    dir.fileName.split(".")[1] === "MP4" ? (
                                        <></>
                                    ) : (
                                        <KelolaFile
                                            dir={dir}
                                            loading={loading}
                                        />
                                    )}
                                </>
                            )}
                        </>
                    );
                })}
            </div>
        </Component>
    );
};

// dir.fileName.split(".")[1] == "mp4" ||
//         (dir.fileName.split(".")[1] == "MP4")

const KelolaImage = ({ loading, dir }) => {
    loading = false;
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
                    className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 md:flex md:items-center "
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
                    className="card card-compact w-96 bg-cyan-800 backdrop-blur-sm shadow-md my-[2rem] z-10 glass "
                    key={dir.fileId}
                >
                    <Link href={dir.webViewLink}>
                        <figure>
                            <LazyLoadImage
                                src={dir.webContentLink}
                                alt={dir.fileName}
                                className=" rounded-t-xl h-[15rem] "
                            />
                        </figure>
                    </Link>
                    <div className="card-body text-center">
                        <Link href={dir.webViewLink}>
                            <span className="text-blue-200 font-semibold hover:underline ">
                                {dir.fileName}
                            </span>
                        </Link>
                        <div className="absolute right-0 px-2">
                            <div className="dropdown dropdown-bottom dropdown-end ">
                                <label
                                    tabIndex={0}
                                    className="btn btn-xs btn-secondary"
                                >
                                    opsi
                                </label>
                                <ul
                                    tabIndex={0}
                                    className="dropdown-content menu p-2 shadow rounded-box w-52 bg-gray-200 text-gray-800 z-50 hover:bg-gray-400"
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

const KelolaFile = ({ loading, dir }) => {
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
                    className="card card-compact w-96 bg-cyan-800 shadow-md my-[2rem] glass backdrop-blur-sm"
                    key={dir.fileId}
                >
                    <figure>
                        <LazyLoadImage
                            src={"./assets/Icon-pdf.png"}
                            alt={dir.fileName}
                            className="h-[15rem]"
                        />
                    </figure>
                    <div className="card-body text-center">
                        <Link href={dir.webViewLink}>
                            <span className="text-blue-200 font-semibold hover:underline ">
                                {dir.fileName}
                            </span>
                        </Link>
                        <div className="absolute right-0 px-2">
                            <div className="dropdown dropdown-bottom dropdown-end ">
                                <label
                                    tabIndex={0}
                                    className="btn btn-xs btn-secondary"
                                >
                                    opsi
                                </label>
                                <ul
                                    tabIndex={0}
                                    className="dropdown-content menu p-2 shadow rounded-box w-52 bg-gray-200 text-gray-800 z-50 hover:bg-gray-400"
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

export default Home;
