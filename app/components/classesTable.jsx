'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const ClassesTable = () => {
    const [classes, setClasses] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [limit, setLimit] = useState(10);

    useEffect(() => {
        async function fetchClasses() {
            try {
                const response = await fetch(`/api/classes?page=${currentPage}&limit=${limit}`);
                const data = await response.json();

                setClasses(data.classes || []);
                setTotalPages(data.totalPages || 1);
            } catch (error) {
                console.error('Error fetching classes:', error);
            }
        }

        fetchClasses();
    }, [currentPage, limit]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    }

    const handleLimitChange = (e) => {
        setLimit(e.target.value);
        setCurrentPage(1);
    }

    const handleDeleteClasses = (id) => {
        if (confirm('Are you sure you want to delete this class?')) {
            fetch(`/api/classes/${id}`, {
                method: 'DELETE'
            });

            setClasses(classes.filter((cl) => cl.id !== id));
        }
    };

    const filteredClasses = searchTerm
        ? classes.filter((cl) => cl.name.toLowerCase().includes(searchTerm.toLowerCase()))
        : classes;

    return (
        <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Jurusan</h2>

            {/* Input Pencarian */}
            <input
                type="text"
                placeholder="Cari Jurusan..."
                className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full text-gray-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Tombol Tambah */}
            <Link href="/classes/add">
                <button className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Tambah Jurusan
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
                            <th className="border border-gray-300 px-4 py-2 text-gray-700">Nama Jurusan</th>
                            <th className="border border-gray-300 px-4 py-2 text-gray-700">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredClasses.length > 0 ? (
                            filteredClasses.map((cl, index) => (
                                <tr key={cl.id} className="text-center">
                                    <td className="border border-gray-300 px-4 py-2 text-gray-700">
                                    {(currentPage - 1) * limit + index + 1}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-gray-700">{cl.name}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-gray-700">
                                        <Link href={`/classes/${cl.id}`}>
                                            <button className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 mx-1">
                                                Edit
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => handleDeleteClasses(cl.id)}
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

export default ClassesTable;