"use client";
import { useState } from "react";
import './page.css';
import { useRouter } from "next/navigation";
const AddMajor = () => {
  const [newMajor, setNewMajor] = useState({ name: "" });
  const router = useRouter();

  const handleAddMajor = async () => {
    try {
      const response = await fetch('/api/majors',
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(newMajor)
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      console.log('Major added');
      router.push('/majors');
      setNewMajor({ name: "" });
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMajor({ ...newMajor, [name]: value });
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Tambah Jurusan</h2>
      <div className="mb-4">
        <label htmlFor="className" className="block text-gray-600 font-medium mb-2">
          Nama Jurusan
        </label>
        <input
          type="text"
          name="name"
          placeholder="Masukkan nama jurusan"
          value={newMajor.name}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <button
        onClick={handleAddMajor}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
      >
        Tambah Jurusan
      </button>
    </div>
  );
};

export default AddMajor;
