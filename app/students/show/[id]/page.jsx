'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { redirect, useParams } from 'next/navigation';
import CloudinaryUploader from '@/app/components/cloudinaryUploader';
import { CldImage } from 'next-cloudinary';
import { useRouter } from "next/navigation";


const StudentTable = () => {
    const [student, setStudent] = useState({
        nisn: "",
        full_name: "",
        birth_date: "",
        majors: { name: "" },
        classes: { name: "" },
        batches: { year: "" },
        images: { id:"", url: "", public_id: "" }
    });
    const { id } = useParams();
    const [image, setImage] = useState({
        public_id: "",
        signature: "",
        url: ""
    });
    const router = useRouter();

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await fetch(`/api/students/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                console.log('student data:', data);
                setStudent(data);
            } catch (error) {
                console.error('Error fetching student:', error);
            }
        };

        fetchStudent();
    }, []);

    const handleUploadComplete = async (imageData) => {
        // setImage({
        //     public_id: imageData.info.public_id,
        //     signature: imageData.info.signature,
        //     url: imageData.info.secure_url
        // });
        console.log('image:', image);
        const updateImage = await fetch(`/api/cloudinary/${student.images.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                delete : student.images.public_id,
                public_id: imageData.info.public_id,
                signature: imageData.info.signature,
                url: imageData.info.secure_url
            }),
        });
        // belum membuat animasi loading ketika upload image
        
        if (!updateImage.ok) {
            throw new Error('Network response was not ok');
        }

        // router.refresh();
        window.location.reload();
    };
    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Siswa</h2>

            {/* Tabel */}
            <div className="overflow-x-auto">
                <div className="profile">
                    <h1 className="text-5xl text-center mt-4">
                        Profile Siswa
                    </h1>
                </div>
                {student.images.url && (
                    <div className="relative w-80 h-80 mx-auto mb-4">
                        <CldImage
                            src={student.images.url}
                            alt="Student Image"
                            width={300}
                            height={300}
                            className="rounded-full w-full h-full object-cover"
                            priority
                        />
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-gray-300 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
                        >
                            <CloudinaryUploader onUploadComplete={handleUploadComplete} />
                        </div>
                    </div>
                )};
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