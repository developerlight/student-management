"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import './page.css';

const EditBatch = () => {
  const [batch, setBatch] = useState({ year: 0});
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
        console.log('Batch fetched:', data);
      } catch (error) {
        console.error('Error fetching batch:', error);
      }
    };

    fetchClass();
  }, [id]);

  const handleUpdateClass = async () => {
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
    <div className="edit-cl-container">
      <h2>Edit Angkatan</h2>
      <div className="form-group">
        <label htmlFor="className">Angkatan</label>
        <input
          type="number"
          name="year"
          placeholder="Year"
          value={batch.year}
          onChange={handleInputChange}
          className="form-control"
        />
      </div>
      <button onClick={handleUpdateClass} className="btn btn-primary">Update Kelas</button>
    </div>
  );
};

export default EditBatch;