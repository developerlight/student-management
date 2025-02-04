"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

const EditClass = () => {
  const [cl, setCl] = useState({ name: "" });
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const fetchClass = async () => {
      try {
        const response = await fetch(`/api/classes/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCl(data);
      } catch (error) {
        console.error('Error fetching cl:', error);
      }
    };

    fetchClass();
  }, [id]);

  const handleUpdateClass = async () => {
    try {
      const response = await fetch(`/api/classes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cl),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();

      router.push('/classes');
    } catch (error) {
      console.error('Error updating cl:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCl({ ...cl, [name]: value });
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Edit Kelas</h2>
      <div className="mb-4">
        <label htmlFor="className" className="block text-gray-600 font-medium mb-2">
          Nama Kelas
        </label>
        <input
          type="text"
          name="name"
          placeholder="Masukkan nama jurusan"
          value={cl.name}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
        />
      </div>
      <button
        onClick={handleUpdateClass}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
      >
        Tambah Jurusan
      </button>
    </div>
  );
};

export default EditClass;