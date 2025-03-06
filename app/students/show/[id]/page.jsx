'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const StudentTable = () => {
    const [student, setStudent] = useState({
        nisn: "",
        full_name: "",
        birth_date: "",
        majors: { name: "" },
        classes: { name: "" },
        batches: { year: "" }
    });
    const { id } = useParams();
    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await fetch(`/api/students/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log(data);
                setStudent(data);
            } catch (error) {
                console.error('Error fetching student:', error);
            }
        };

        fetchStudent();
    }, []);


    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Siswa</h2>

            {/* Tabel */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200">
                    <tbody>
                        <tr className="bg-gray-100">
                            <td className="border border-gray-300 px-4 py-2 text-gray-700 font-semibold"><span>NISN</span></td>
                            <td className="border border-gray-300 px-4 py-2 text-gray-700">{student.nisn}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2 text-gray-700 font-semibold"><span>Nama Lengkap</span></td>
                            <td className="border border-gray-300 px-4 py-2 text-gray-700">{student.full_name}</td>
                        </tr>
                        <tr className="bg-gray-100">
                            <td className="border border-gray-300 px-4 py-2 text-gray-700 font-semibold"><span>Tanggal Lahir</span></td>
                            <td className="border border-gray-300 px-4 py-2 text-gray-700">{student.birth_date}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2 text-gray-700 font-semibold"><span>Kelas</span></td>
                            <td className="border border-gray-300 px-4 py-2 text-gray-700">{student.classes.name}</td>
                        </tr>
                        <tr className="bg-gray-100">
                            <td className="border border-gray-300 px-4 py-2 text-gray-700 font-semibold"><span>Jurusan</span></td>
                            <td className="border border-gray-300 px-4 py-2 text-gray-700">{student.majors.name}</td>
                        </tr>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2 text-gray-700 font-semibold"><span>Angkatan</span></td>
                            <td className="border border-gray-300 px-4 py-2 text-gray-700">{student.batches.year}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Tombol Kembali */}
            <Link href={"/students"}>
                <button className="text-white bg-blue-500 hover:bg-blue-600 rounded-md px-4 py-2 mt-4 transition duration-300 ease-in-out transform hover:scale-105">
                    kembali
                </button>
            </Link>
        </div>
    );
};

export default StudentTable;