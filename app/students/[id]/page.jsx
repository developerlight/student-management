"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

const EditMajor = () => {
  const [student, setStudent] = useState({ nisn: "", full_name: "", birth_date: "", major_id: "", class_id: "", batch_id: "" });
  const [majors, setMajors] = useState([{ id: '', name: '' }]);
  const [classes, setClasses] = useState([{ id: '', name: '' }]);
  const [batches, setBatches] = useState([{ id: '', year: null }]);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(`/api/students/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setStudent(data);
      } catch (error) {
        console.error('Error fetching student:', error);
      }
    };

    const fetchMajors = async () => {
      try {
        const response = await fetch('/api/majors');
        const data = await response.json();
        setMajors(data.majors || []);
      } catch (error) {
        console.error('Error fetching majors:', error);
      }
    }

    const fetchClasses = async () => {
      try {
        const response = await fetch('/api/classes');
        const data = await response.json();
        setClasses(data.classes || []);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    }

    const fetchBatches = async () => {
      try {
        const response = await fetch('/api/batches');
        const data = await response.json();
        setBatches(data.batches || []);
      } catch (error) {
        console.error('Error fetching batches:', error);
      }
    }


    fetchStudent();
    fetchMajors();
    fetchClasses();
    fetchBatches();
  }, [id]);

  const handleUpdateStudent = async () => {
    try {
      const response = await fetch(`/api/students/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();

      router.push('/students');
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Edit Data Siswa</h2>
      <div className="mb-4">
        <label htmlFor="nisn" className="block text-gray-600 font-medium mb-2">
          NISN
        </label>
        <input
          type="text"
          name="nisn"
          placeholder="Masukkan NISN"
          value={student.nisn}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="full_name" className="block text-gray-600 font-medium mb-2">
          Nama Lengkap
        </label>
        <input
          type="text"
          name="full_name"
          placeholder="Masukkan nama lengkap"
          value={student.full_name}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="birth_date" className="block text-gray-600 font-medium mb-2">
          Tanggal Lahir
        </label>
        <input
          type="date"
          name="birth_date"
          value={student.birth_date}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="major_id" className="block text-gray-600 font-medium mb-2">
          Jurusan
        </label>
        <select
          name="major_id"
          value={student.major_id}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
        >
          <option value="">Pilih Jurusan</option>
          {majors.map((major) => (
            <option key={major.id} value={major.id}>
              {major.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="class_id" className="block text-gray-600 font-medium mb-2">
          Kelas
        </label>
        <select
          name="class_id"
          value={student.class_id}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
        >
          <option value="">Pilih Kelas</option>
          {classes.map((cl) => (
            <option key={cl.id} value={cl.id}>
              {cl.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="batch_id" className="block text-gray-600 font-medium mb-2">
          Angkatan
        </label>
        <select
          name="batch_id"
          value={student.batch_id}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
        >
          <option value="">Pilih Angkatan</option>
          {batches.map((batch) => (
            <option key={batch.id} value={batch.id}>
              {batch.year}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleUpdateStudent}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
      >
        Update Jurusan
      </button>
    </div>

  );
};

export default EditMajor;