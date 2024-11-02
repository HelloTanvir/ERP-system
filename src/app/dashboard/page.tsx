'use client';

import { useState } from 'react';

interface RowData {
    id: number;
    name: string;
    quantity: number;
    price: number;
}

function Dashboard() {
    const [rows, setRows] = useState<RowData[]>([]);

    // Function to add a new row
    const addRow = () => {
        setRows((prevRows) => [...prevRows, { id: Date.now(), name: '', quantity: 0, price: 0 }]);
    };

    // Function to handle row deletion
    const deleteRow = (id: number) => {
        setRows((prevRows) => prevRows.filter((row) => row.id !== id));
    };

    // Function to handle input changes
    const handleInputChange = (id: number, field: keyof RowData, value: any) => {
        setRows((prevRows) =>
            prevRows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
        );
    };

    return (
        <div>
            <button type="button" onClick={addRow}>
                Add Row
            </button>
            <table>
                <thead>
                    <tr>
                        <th>SL</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                        <tr key={row.id}>
                            <td>{index + 1}</td>
                            <td>
                                <input
                                    type="text"
                                    value={row.name}
                                    onChange={(e) =>
                                        handleInputChange(row.id, 'name', e.target.value)
                                    }
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    value={row.quantity}
                                    onChange={(e) =>
                                        handleInputChange(
                                            row.id,
                                            'quantity',
                                            Number(e.target.value)
                                        )
                                    }
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    value={row.price}
                                    onChange={(e) =>
                                        handleInputChange(row.id, 'price', Number(e.target.value))
                                    }
                                />
                            </td>
                            <td>
                                <button type="button" onClick={() => deleteRow(row.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <pre>{JSON.stringify(rows, null, 2)}</pre>
        </div>
    );
}

export default Dashboard;
