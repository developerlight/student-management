"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import './page.css';

const EditClass = () => {
  const [cl, setCl] = useState({ name: ""});
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const fetchClass = async () => {
      try {
        const response = await fetch(`/api/classes/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCl(data);
        console.log('Batch fetched:', data);
      } catch (error) {
        console.error('Error fetching cl:', error);
      }
    };

    fetchClass();
  }, [id]);

  const handleUpdateClass = async () => {
    try {
      const response = await fetch(`/api/classes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cl),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Batch updated:', result);

      router.push('/classes');
    } catch (error) {
      console.error('Error updating cl:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCl({ ...cl, [name]: value });
  };

  return (
    <div className="edit-cl-container">
      <h2>Edit Class</h2>
      <div className="form-group">
        <label htmlFor="className">Nama Kelas</label>
        <input
          type="text"
          name="name"
          placeholder="Enter class name"
          value={cl.name}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
      <button onClick={handleUpdateClass} className="btn btn-primary">Update Kelas</button>
    </div>
  );
};

export default EditClass;