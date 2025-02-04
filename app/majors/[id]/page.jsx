"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import './page.css';

const EditMajor = () => {
  const [major, setMajor] = useState({ name: "" });
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const fetchMajor = async () => {
      try {
        const response = await fetch(`/api/majors/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMajor(data);
      } catch (error) {
        console.error('Error fetching major:', error);
      }
    };

    fetchMajor();
  }, [id]);

  const handleUpdateMajor = async () => {
    try {
      const response = await fetch(`/api/majors/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(major),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();

      router.push('/majors');
    } catch (error) {
      console.error('Error updating major:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMajor({ ...major, [name]: value });
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Edit Jurusan</h2>
      <div className="mb-4">
        <label htmlFor="className" className="block text-gray-600 font-medium mb-2">
          Nama Jurusan
        </label>
        <input
          type="text"
          name="name"
          placeholder="Masukkan nama jurusan"
          value={major.name}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <button
        onClick={handleUpdateMajor}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
      >
        Update Jurusan
      </button>
    </div>

  );
};

export default EditMajor;