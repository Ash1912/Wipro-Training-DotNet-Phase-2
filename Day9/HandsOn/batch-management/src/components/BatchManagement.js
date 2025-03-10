import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

const API_URL = "https://localhost:7034/api/Batch";

const BatchManagement = () => {
  const [batches, setBatches] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingBatch, setEditingBatch] = useState(null);

  useEffect(() => {
    fetchBatches();
  }, []);

  const fetchBatches = async () => {
    try {
      const response = await axios.get(API_URL);
      setBatches(response.data);
    } catch (error) {
      console.error("Error fetching batches", error);
    }
  };

  const deleteBatch = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchBatches();
  };

  const handleEdit = (batch) => {
    setEditingBatch(batch);
    setShowModal(true);
  };

  return (
    <div className="container mt-4">
      {/* <h2>Batch Management</h2> */}
      <Button variant="primary" onClick={() => setShowModal(true)}>Add Batch</Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
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
              <td>{new Date(batch.startDate).toLocaleDateString()}</td>
              <td>{batch.seats}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(batch)}>Edit</Button>{" "}
                <Button variant="danger" onClick={() => deleteBatch(batch.batchId)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <BatchForm show={showModal} onHide={() => setShowModal(false)} batch={editingBatch} fetchBatches={fetchBatches} />
    </div>
  );
};

const BatchForm = ({ show, onHide, batch, fetchBatches }) => {
  const isEdit = Boolean(batch);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? "Edit Batch" : "Add Batch"}</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={ batch || { name: "", startDate: "", seats: "" } }
        validationSchema={Yup.object({
          name: Yup.string().required("Name is required"),
          startDate: Yup.date().required("Start Date is required"),
          seats: Yup.number().required("Seats are required"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          if (isEdit) {
            await axios.put(`${API_URL}/${batch.batchId}`, values);
          } else {
            await axios.post(API_URL, values);
          }
          fetchBatches();
          setSubmitting(false);
          onHide();
        }}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <Form onSubmit={handleSubmit} className="p-3">
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" onChange={handleChange} value={values.name} />
              {errors.name && touched.name && <div className="text-danger">{errors.name}</div>}
            </Form.Group>
            <Form.Group>
              <Form.Label>Start Date</Form.Label>
              <Form.Control type="date" name="startDate" onChange={handleChange} value={values.startDate} />
              {errors.startDate && touched.startDate && <div className="text-danger">{errors.startDate}</div>}
            </Form.Group>
            <Form.Group>
              <Form.Label>Seats</Form.Label>
              <Form.Control type="number" name="seats" onChange={handleChange} value={values.seats} />
              {errors.seats && touched.seats && <div className="text-danger">{errors.seats}</div>}
            </Form.Group>
            <Button type="submit" className="mt-3">{isEdit ? "Update" : "Add"}</Button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default BatchManagement;
