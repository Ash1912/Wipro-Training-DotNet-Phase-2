import { useState, useEffect } from "react";
import { getBatches, addBatch, deleteBatch, updateBatch } from "../api/batchApi";
import "../assets/BatchManagement.css";

const BatchManagement = () => {
  const [batches, setBatches] = useState([]);
  const [newBatch, setNewBatch] = useState({ name: "", startDate: "", seats: 0 });
  const [editingBatch, setEditingBatch] = useState(null);
  const [updatedBatch, setUpdatedBatch] = useState({ name: "", startDate: "", seats: 0 });

  useEffect(() => {
    fetchBatches();
  }, []);

  const fetchBatches = async () => {
    try {
      const data = await getBatches();
      setBatches(data);
    } catch (error) {
      console.error("Error fetching batches:", error);
    }
  };

  const handleAddBatch = async () => {
    if (!newBatch.name || !newBatch.startDate || newBatch.seats < 0) return;
    try {
      await addBatch(newBatch);
      setNewBatch({ name: "", startDate: "", seats: 0 });
      fetchBatches();
    } catch (error) {
      console.error("Error adding batch:", error);
    }
  };

  const handleDeleteBatch = async (batchId) => {
    try {
      await deleteBatch(batchId);
      fetchBatches();
    } catch (error) {
      console.error("Error deleting batch:", error);
    }
  };

  const handleUpdateBatch = async () => {
    if (!editingBatch) return;
    try {
      await updateBatch(editingBatch, updatedBatch);
      setEditingBatch(null);
      fetchBatches();
    } catch (error) {
      console.error("Error updating batch:", error);
    }
  };

  return (
    <div>
      <div className="batch-container">
        <h2>Batch Management</h2>
        <div className="batch-form">
          <input type="text" placeholder="Batch Name" value={newBatch.name} onChange={(e) => setNewBatch({ ...newBatch, name: e.target.value })} />
          <input type="date" value={newBatch.startDate} onChange={(e) => setNewBatch({ ...newBatch, startDate: e.target.value })} />
          <input type="number" placeholder="Seats" value={newBatch.seats} onChange={(e) => setNewBatch({ ...newBatch, seats: e.target.value })} />
          <button onClick={handleAddBatch}>Add Batch</button>
        </div>

        <table className="batch-table">
          <thead>
            <tr>
              <th>Batch ID</th>
              <th>Name</th>
              <th>Start Date</th>
              <th>Seats</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {batches.map((batch) => (
              <tr key={batch.batchId}>
                <td>{batch.batchId}</td>
                <td>{batch.name}</td>
                <td>{batch.startDate}</td>
                <td>{batch.seats}</td>
                <td>
                  <button onClick={() => { setEditingBatch(batch.batchId); setUpdatedBatch(batch); }}>Edit</button>
                  <button onClick={() => handleDeleteBatch(batch.batchId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {editingBatch && (
          <div className="batch-form">
            <input type="text" value={updatedBatch.name} onChange={(e) => setUpdatedBatch({ ...updatedBatch, name: e.target.value })} />
            <input type="date" value={updatedBatch.startDate} onChange={(e) => setUpdatedBatch({ ...updatedBatch, startDate: e.target.value })} />
            <input type="number" value={updatedBatch.seats} onChange={(e) => setUpdatedBatch({ ...updatedBatch, seats: e.target.value })} />
            <button onClick={handleUpdateBatch}>Update</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BatchManagement;
