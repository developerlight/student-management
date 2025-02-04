"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
const AddBatch = () => {
  const [newBatch, setNewBatch] = useState({ year: null });
  const router = useRouter();

  const handleAddBatch = async () => {
    try {
      console.log('newBatch', newBatch);
      const response = await fetch('/api/batches',
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(newBatch)
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      console.log('Class added');
      router.push('/batches');
      setNewBatch({ year: null });
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBatch({ ...newBatch, [name]: value });
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Tambah Tahun Angkatan</h2>
      <div className="mb-4">
        <label htmlFor="className" className="block text-gray-600 font-medium mb-2">
          Tahun Angkatan
        </label>
        <input
          type="number"
          name="year"
          placeholder="Masukkan nama jurusan"
          value={newBatch.year}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
        />
      </div>
      <button
        onClick={handleAddBatch}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
      >
        Submit
      </button>
    </div>
  );
};

export default AddBatch;
