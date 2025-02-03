'use client';

import { useState, useEffect } from 'react';
import './classesTable.css';
import Link from 'next/link';

const ClassesTable = () => {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        async function fetchClasses() {
            const response = await fetch('/api/classes');
            const data = await response.json();
            setClasses(data);
        }

        fetchClasses();
    }, []);

    const handleDeleteClasses = (id) => {
        if (confirm('Are you sure you want to delete this class?')) {
            fetch(`/api/classes/${id}`, {
                method: 'DELETE'
            });

            setClasses(classes.filter((cl) => cl.id !== id));
        }
    };

    return (
        <div className="classes-table">
            <h2>Kelas</h2>
            <Link href="/classes/add">
                <button>Add</button>
            </Link>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nama Kelas</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {classes.map((cl, index) => (
                        <tr key={cl.id}>
                            <td>{index+1}</td>
                            <td>{cl.name}</td>
                            <td>
                                <Link href={`/classes/${cl.id}`}>
                                    <button className='edit'>Edit</button>
                                </Link>
                                <button className="delete" onClick={() => handleDeleteClasses(cl.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ClassesTable;