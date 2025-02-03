"use client";
import { useState } from "react";
import './page.css';
import { useRouter } from "next/navigation";
const AddBatch = () => {
  const [newClass, setNewClass] = useState({ name: "" });
  const router = useRouter();

  const handleAddClass = async () => {
    try {
      const response = await fetch('/api/batches',
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
      router.push('/batches');
      setNewClass({ year: "" });
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
        <label htmlFor="year">Tahun Angkatan</label>
        <input
          type="number"
          id="year"
          name="year"
          placeholder="Year"
          value={newClass.year}
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
