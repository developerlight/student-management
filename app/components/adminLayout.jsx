"use client";
import Link from "next/link";
import { useState } from "react";

const AdminLayout = ({children}) => {
    const [open, setOpen] = useState(true);
    const Menus = [
        {   title: "Dashboard", 
            // icon: <HomeIcon className="w-6 h-6" />, 
            url: "/" },
        {
            title: "Data Siswa",
            // icon: <DocumentPlusIcon className="w-6 h-6" />,
            url: "/students",
        },
        {
            title: "Kelas",
            // icon: <PhotoIcon className="w-6 h-6" />,
            url: "/classes",
        },
        {
            title: "Jurusan",
            // icon: <VideoCameraIcon className="w-6 h-6" />,
            url: "/majors",
        },
        {
            title: "Angkatan",
            // icon: <UsersIcon className="w-6 h-6" />,
            url: "/batches",
        },
        {
            title: "Orang Tua Siswa",
            // icon: <UsersIcon className="w-6 h-6" />,
            url: "/parents",
        },
        {
            title: "Log Out",
            // icon: <ArrowLeftOnRectangleIcon className="w-6 h-6" />,
            
            url: "/banner",
        },
    ];
    return (
        <div className="flex">
            <div
                className={` ${open ? "w-72" : "w-[6rem] "
                    } bg-dark min-h-screen p-5  pt-8 relative duration-300`}
            >
                <div
                    className={`absolute cursor-pointer -right-3 top-10 w-7 border-dark text-dark border-2 rounded-full  ${!open && "rotate-180"
                        }`}
                    onClick={() => setOpen(!open)}
                >
                    {/* <Image src="/control.png" width={40} height={40} /> */}
                </div>
                <div className="flex gap-x-4 items-center">
                    {/* <Image
                        src="/bem.png"
                        width={300}
                        height={300}
                        className={`cursor-pointer duration-500 w-10 h-10 ${open && "rotate-[360deg] w-10 h-10 pr-0.5"
                            }`}
                    /> */}
                    <h1
                        className={`text-white origin-left font-semibold text-sm duration-200 ${!open && "scale-0"
                            }`}
                    >
                        SMKS 17 AGUSTUS 1945
                    </h1>
                </div>
                <ul className="pt-6">
                    {Menus.map((Menu, index) => (
                        <li
                            key={index}
                            className={`flex rounded-md p-2 cursor-pointer hover:bg-light hover:text-dark text-gray-300 text-sm items-center gap-x-4 ${Menu.gap ? "mt-9" : "mt-2"
                                }`}
                        >
                            {/* Icon */}
                            {/* {Menu.icon} */}
                            {/* Title */}
                            <Link href={Menu.url}>
                                <span
                                    className={`${!open && "hidden"} origin-left duration-200`}
                                >
                                    {Menu.title}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="h-full mx-auto mt-14">{children}</div>
            
        </div>
    );
}

export default AdminLayout;