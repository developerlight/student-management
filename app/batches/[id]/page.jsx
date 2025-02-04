"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

const EditBatch = () => {
  const [batch, setBatch] = useState({ year: null});
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const fetchClass = async () => {
      try {
        const response = await fetch(`/api/batches/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBatch(data);
      } catch (error) {
        console.error('Error fetching batch:', error);
      }
    };

    fetchClass();
  }, [id]);

  const handleUpdateBatches = async () => {
    try {
      const response = await fetch(`/api/batches/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(batch),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      router.push('/batches');
    } catch (error) {
      console.error('Error updating batch:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBatch({ ...batch, [name]: value });
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Edit Angkatan</h2>
      <div className="mb-4">
        <label htmlFor="className" className="block text-gray-600 font-medium mb-2">
          Tahun Angkatan
        </label>
        <input
          type="number"
          name="year"
          placeholder="Masukkan nama jurusan"
          value={batch.year}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
        />
      </div>
      <button
        onClick={handleUpdateBatches}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
      >
        Submit
      </button>
    </div>
  );
};

export default EditBatch;