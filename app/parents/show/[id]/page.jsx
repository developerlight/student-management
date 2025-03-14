'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const ParentTable = () => {
    const [parent, setParent] = useState({
        student_id: { full_name: "" },
        father_name: "",
        mother_name: "",
        phone: "",
        address: "",
    });
    const { id } = useParams();
    useEffect(() => {
        const fetchParent = async () => {
            try {
                const response = await fetch(`/api/parents/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setParent(data);
            } catch (error) {
                console.error('Error fetching parent:', error);
            }
        };

        fetchParent();
    }, []);


    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Siswa</h2>

            {/* Tabel */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200">
                    <tbody>
                        <tr className="bg-gray-100">
                            <td className="border border-gray-300 px-4 py-2 text-gray-700 font-semibold"><span>Nama Siswa</span></td>
                            <td className="border border-gray-300 px-4 py-2 text-gray-700">{parent.student_id.full_name}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2 text-gray-700 font-semibold"><span>Nama Ayah</span></td>
                            <td className="border border-gray-300 px-4 py-2 text-gray-700">{parent.father_name}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2 text-gray-700 font-semibold"><span>Nama Ibu</span></td>
                            <td className="border border-gray-300 px-4 py-2 text-gray-700">{parent.mother_name}</td>
                        </tr>
                        <tr className="bg-gray-100">
                            <td className="border border-gray-300 px-4 py-2 text-gray-700 font-semibold"><span>No.Tlpn</span></td>
                            <td className="border border-gray-300 px-4 py-2 text-gray-700">{parent.phone}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2 text-gray-700 font-semibold"><span>Alamat</span></td>
                            <td className="border border-gray-300 px-4 py-2 text-gray-700">{parent.address}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Tombol Kembali */}
            <Link href={"/parents"}>
                <button className="text-white bg-blue-500 hover:bg-blue-600 rounded-md px-4 py-2 mt-4 transition duration-300 ease-in-out transform hover:scale-105">
                    kembali
                </button>
            </Link>
        </div>
    );
};

export default ParentTable;