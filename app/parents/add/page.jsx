"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const AddMajor = () => {
  const [newParent, setNewParent] = useState({ 
    student_id: "",
    father_name: "",
    mother_name: "",
    phone: "",
    address: "",
  });
  const [students, setStudents] = useState([{id:'', full_name:''}]);
  const router = useRouter();

  useEffect(() => {
    async function fetchMajors() {
      try {
        const response = await fetch('/api/students');
        const data = await response.json();
        setStudents(data.students || []);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    }
    
    fetchMajors();
  }, []);

  const handleAddStudent = async () => {
    try {
      const response = await fetch('/api/parents',
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(newParent)
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      router.push('/parents');
      setNewParent({
        student_id: "",
        father_name: "",
        mother_name: "",
        phone: "",
        address: "",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewParent({ ...newParent, [name]: value });
  };
  
  console.log(newParent);

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Tambah Data Orang Tua</h2>
      <div className="mb-4">
        <label htmlFor="student_id" className="block text-gray-600 font-medium mb-2">
          Nama Siswa
        </label>
        <select
          name="student_id"
          value={newParent.student_id}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
        >
          <option value="">Pilih Siswa</option>
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.full_name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="father_name" className="block text-gray-600 font-medium mb-2">
          Nama Ayah
        </label>
        <input
          type="text"
          name="father_name"
          placeholder="Masukkan Nama Ayah"
          value={newParent.father_name}
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
          value={newParent.mother_name}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="phone" className="block text-gray-600 font-medium mb-2">
          Nomor Hp
        </label>
        <input
          type="text"
          name="phone"
          placeholder="Masukkan Nomor Hp"
          value={newParent.phone}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="address" className="block text-gray-600 font-medium mb-2">
          Alamat
        </label>
        <input
          type="text"
          name="address"
          placeholder="Masukkan Alamat"
          value={newParent.address}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-700"
        />
      </div>
      
      <button
        onClick={handleAddStudent}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
      >
        Tambah Orang Tua
      </button>
    </div>
  );
};

export default AddMajor;
