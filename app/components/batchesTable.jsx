'use client';

import { useState, useEffect } from 'react';
import './batchesTable.css';
import Link from 'next/link';

const BatchesTable = () => {
    const [batches, setBatches] = useState([]);

    useEffect(() => {
        async function fetchBatches() {
            const response = await fetch('/api/batches');
            const data = await response.json();
            setBatches(data);
        }

        fetchBatches();
    }, []);

    const handleDeleteBatch = (id) => {
        if (confirm('Are you sure you want to delete this batch?')) {
            fetch(`/api/batches/${id}`, {
                method: 'DELETE'
            });

            setBatches(batches.filter((batch) => batch.id !== id));
        }
    };

    return (
        <div className="batches-table">
            <h2>Batches</h2>
            <Link href="/batches/add">
                <button>Add</button>
            </Link>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Year</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {batches.map((batch, index) => (
                        <tr key={batch.id}>
                            <td>{index+1}</td>
                            <td>{batch.year}</td>
                            <td>
                                <Link href={`/batches/${batch.id}`}>
                                    <button className='edit'>Edit</button>
                                </Link>
                                <button className="delete" onClick={() => handleDeleteBatch(batch.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BatchesTable;