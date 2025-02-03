"use client";
import { useState } from "react";
import './page.css';
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

      console.log('Class added');
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
    <div className="add-batch">
      <div className="form-group">
        <label htmlFor="name">Nama Kelas</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name Class"
          value={newClass.name}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
      <button onClick={handleAddClass} className="btn btn-primary">
        Add Batch
      </button>
    </div>
  );
};

export default AddBatch;
