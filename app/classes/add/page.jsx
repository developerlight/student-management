"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
const AddBatch = () => {
  const [newClass, setNewClass] = useState({ name: "" });
  const router = useRouter();

  const handleAddClass = async () => {
    try {
      const response = await fetch('/api/classes',
        {
          method: 'POST',
          headers: {
            'Content-type' : 'application/json'
          },
          body: JSON.stringify(newClass)
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      router.push('/classes');
      setNewClass({ name: "" });
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewClass({ ...newClass, [name]: value });
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Tambah Kelas</h2>
      <div className="mb-4">
        <label htmlFor="className" className="block text-gray-600 font-medium mb-2">
          Nama Kelas
        </label>
        <input
          type="text"
          name="name"
          placeholder="Masukkan nama jurusan"
          value={newClass.name}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
        />
      </div>
      <button
        onClick={handleAddClass}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
      >
        Tambah Jurusan
      </button>
    </div>
  );
};

export default AddBatch;
