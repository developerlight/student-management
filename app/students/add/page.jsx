"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CloudinaryUploader from "@/app/components/cloudinaryUploader";
const AddMajor = () => {
  const [newStudent, setNewStudent] = useState({ 
    nisn: "",
    full_name: "",
    birth_date: "",
    major_id: "",
    class_id: "",
    batch_id: "",
    image_id: ""
  });
  const [majors, setMajors] = useState([{id:'', name:''}]);
  const [classes, setClasses] = useState([{id:'', name:''}]);
  const [batches, setBatches] = useState([{id:'', year:null}]);
  const [image, setImage] = useState({public_id: '', signature: '', url: ''});
  const [getId, setGetId] = useState(null);

  const router = useRouter();
  useEffect(() => {
    async function fetchMajors() {
      try {
        const response = await fetch('/api/majors');
        const data = await response.json();
        setMajors(data.majors || []);
      } catch (error) {
        console.error('Error fetching majors:', error);
      }
    }

    async function fetchClasses() {
      try {
        const response = await fetch('/api/classes');
        const data = await response.json();
        setClasses(data.classes || []);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    }

    async function fetchBatches() {
      try {
        const response = await fetch('/api/batches');
        const data = await response.json();
        setBatches(data.batches || []);
      } catch (error) {
        console.error('Error fetching batches:', error);
      }
    }

    fetchMajors();
    fetchClasses();
    fetchBatches();
  }, []);

  // const getIdImage = (id) => {
  //   useEffect(() => {
  //     async function fetchImage() {
  //       try {
  //         const response = await fetch('/api/cloudinary/' + id);
  //         const data = await response.json();
  //         console.log('idImg', data);
  //         // setImage(data.image || []);
  //       } catch (error) {
  //         console.error('Error fetching image:', error);
  //       }
  //     }
  //     fetchImage();
  //   }, [id]);
  // };

  useEffect(() => {
    if (!getId?.id) return; // Mencegah eksekusi jika signature tidak ada

    const fetchImage = async () => {
      try {
        const response = await fetch(`/api/cloudinary/${getId.id}`);
        const data = await response.json();
        console.log("idImg", data);
        setGetId((prev) => ({ ...prev, ...data }));
        console.log('getId:', getId);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, [getId?.id]);

  const handleAddStudent = async () => {
    try {
      const resImg = await fetch('/api/cloudinary/',
        {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(image)
        }
      );
      if (!resImg.ok) {
        throw new Error('Network response was not ok');
      }
      const imgData = await resImg.json();
      setGetId(true);
      const updatedStudent = { ...newStudent, image_id: imgData?.id };
      console.log('postStudent', updatedStudent);
      // const response = await fetch('/api/students',
      //   {
      //     method: 'POST',
      //     headers: {
      //       'Content-type': 'application/json'
      //     },
      //     body: JSON.stringify(updatedStudent)
      //   }
      // );

      // if (!response.ok) {
      //   throw new Error('Network response was not ok');
      // }

      // router.push('/students');
      // setNewStudent({
      //   nisn: "",
      //   full_name: "",
      //   birth_date: "",
      //   major_id: "",
      //   class_id: "",
      //   batch_id: "",
      //   image_id: ""
      // });
    } catch (error) {
      console.error(error);
    }
  };
   
  const handleUploadComplete = (imageData) => {
    setImage({
      public_id: imageData.info.public_id,
      signature: imageData.info.signature,
      url: imageData.info.secure_url
    })
    // setNewStudent({ ...newStudent, image_id: imageData.publicId });
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };
  
  console.log('image:', image);
  console.log('newStudent:', newStudent);

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Tambah Data Siswa</h2>
      <div className="mb-4">
        <CloudinaryUploader onUploadComplete={handleUploadComplete} />
      </div>
      <div className="mb-4">
        <label htmlFor="nisn" className="block text-gray-600 font-medium mb-2">
          NISN
        </label>
        <input
          type="text"
          name="nisn"
          placeholder="Masukkan NISN"
          value={newStudent.nisn}
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
          value={newStudent.full_name}
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
          value={newStudent.birth_date}
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
          value={newStudent.major_id}
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
          value={newStudent.class_id}
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
          value={newStudent.batch_id}
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
        onClick={handleAddStudent}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
      >
        Tambah Siswa
      </button>
    </div>
  );
};

export default AddMajor;
