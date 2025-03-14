"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";



const EditMajor = () => {
  const [parent, setParent] = useState({ 
    student_id: "",
    father_name: "",
    mother_name: "",
    phone: "",
    address: ""
  });
  const [student, setStudent] = useState(null);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const fetchParentAndStudent = async () => {
      try {
        // Fetch parent data
        const parentResponse = await fetch(`/api/parents/${id}`);
        if (!parentResponse.ok) {
          throw new Error('Network response was not ok');
        }
        const parentData = await parentResponse.json();
        setParent(parentData);

        // Fetch student data based on student_id from parent data
        const p=parentData.student_id.id;
        const studentResponse = await fetch(`/api/students/${p}`);
        if (!studentResponse.ok) {
          throw new Error('Network response was not ok');
        }
        const studentData = await studentResponse.json();
        setStudent(studentData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchParentAndStudent();
  }, [id]);


  const handleUpdateStudent = async () => {
    try {
      const updatedParent = {
        ...parent,
        student_id: parent.student_id.id
      };

      const response = await fetch(`/api/parents/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedParent),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();

      router.push('/parents');
    } catch (error) {
      console.error('Error updating parent:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setParent({ ...parent, [name]: value });
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Edit Data Orang Tua</h2>
      <div className="mb-4">
        <label htmlFor="full_name" className="block text-gray-600 font-medium mb-2">
          Nama Siswa
        </label>
        <input
          type="text"
          name="full_name"
          value={student ? student.full_name : ''}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="father_name" className="block text-gray-600 font-medium mb-2">
          Nama Ayah
        </label>
        <input
          type="text"
          name="father_name"
          placeholder="Masukkan NISN"
          value={parent.father_name}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="mother_name" className="block text-gray-600 font-medium mb-2">
          Nama Ibu
        </label>
        <input
          type="text"
          name="mother_name"
          placeholder="Masukkan Nama Ibu"
          value={parent.mother_name}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="phone" className="block text-gray-600 font-medium mb-2">
          No. Tlpn
        </label>
        <input
          type="number"
          name="phone"
          placeholder="Masukkan No. Tlpn"
          value={parent.phone}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="address" className="block text-gray-600 font-medium mb-2">
          Alamat
        </label>
        <textarea
          type="text"
          name="address"
          placeholder="Masukkan Alamat"
          value={parent.address}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
        />
      </div>
      
      
      <button
        onClick={handleUpdateStudent}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
      >
        Update Data Orang Tua
      </button>
    </div>

  );
};

export default EditMajor;