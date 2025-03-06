'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const StudentTable = () => {
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit, setLimit] = useState(10);

    useEffect(() => {
        async function fetchMajors() {
            try {
                const response = await fetch(`/api/students?page=${currentPage}&limit=${limit}`);
                const data = await response.json();
                console.log(data);
                setStudents(data.students || []);
                setTotalPages(data.totalPages || 1);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        }

        fetchMajors();
    }, [currentPage, limit]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    }

    const handleLimitChange = (e) => {
        setLimit(e.target.value);
        setCurrentPage(1);
    }
    
    const handleDeleteMajor = (id) => {
        if (confirm('Are you sure you want to delete this student?')) {
            fetch(`/api/students/${id}`, {
                method: 'DELETE'
            });

            setStudents(students.filter((student) => student.id !== id));
        }
    };

    const filteredMajors = searchTerm
        ? students.filter((student) => student.full_name.toLowerCase().includes(searchTerm.toLowerCase()))
        : students;

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Siswa</h2>

            {/* Input Pencarian */}
            <input
                type="text"
                placeholder="Cari Nama Siswa..."
                className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full text-gray-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Tombol Tambah */}
            <Link href="/students/add">
                <button className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Tambah Data Siswa
                </button>
            </Link>

            {/* Limit */}
            <div className="mb-4 text-gray-700 ">
                <label htmlFor="limit" className="mr-2 text-gray-700">Items per page:</label>
                <select id="limit" value={limit} onChange={handleLimitChange} className="px-2 py-1 border rounded-md">
                    <option value={5} className='text-gray-700'>5</option>
                    <option value={10} className='text-gray-700'>10</option>
                    <option value={20} className='text-gray-700'>20</option>
                </select>
            </div>

            {/* Tabel */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2 text-gray-700">#</th>
                            <th className="border border-gray-300 px-4 py-2 text-gray-700">NISN</th>
                            <th className="border border-gray-300 px-4 py-2 text-gray-700">Nama Lengkap</th>
                            <th className="border border-gray-300 px-4 py-2 text-gray-700">Kelas</th>
                            <th className="border border-gray-300 px-4 py-2 text-gray-700">Angkatan</th>
                            <th className="border border-gray-300 px-4 py-2 text-gray-700">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMajors.length > 0 ? (
                            filteredMajors.map((student, index) => (
                                <tr key={student.id} className="text-center">
                                    <td className="border border-gray-300 px-4 py-2 text-gray-700">
                                    {(currentPage - 1) * limit + index + 1}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-gray-700">{student.nisn}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-gray-700">{student.full_name}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-gray-700">{student.classes.name}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-gray-700">{student.batches.year}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-gray-700">
                                        <Link href={`/students/${student.id}`}>
                                            <button className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 mx-1">
                                                Edit
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => handleDeleteMajor(student.id)}
                                            className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 mx-1"
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center py-4 text-gray-500">
                                    Tidak ada data jurusan
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-4 space-x-2">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-md ${
                        currentPage === 1 ? 'bg-gray-300' : 'bg-gray-600 text-white hover:bg-gray-700'
                    }`}
                >
                    Prev
                </button>
                <span className="px-4 py-2 border rounded-md text-gray-600">{currentPage} / {totalPages}</span>
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-md ${
                        currentPage === totalPages ? 'bg-gray-300' : 'bg-gray-600 text-white hover:bg-gray-700'
                    }`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default StudentTable;