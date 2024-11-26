import React, { useEffect, useState } from "react";
import { getUsers, addUser, updateUser, deleteUser } from "../mock/api";
import { Table, Button, Modal, Form } from "react-bootstrap";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  const handleSave = () => {
    if (currentUser.id) {
      updateUser(currentUser.id, currentUser).then(setUsers);
    } else {
      addUser(currentUser).then(setUsers);
    }
    setShowModal(false);
    setCurrentUser(null);
  };

  const handleDelete = (id) => {
    deleteUser(id).then(setUsers);
  };

  return (
    <div>
      <h2>User Management</h2>
      <Button onClick={() => setShowModal(true)}>Add User</Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>
                <Button onClick={() => {
                  setCurrentUser(user);
                  setShowModal(true);
                }}>Edit</Button>
                <Button variant="danger" onClick={() => handleDelete(user.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{currentUser?.id ? "Edit User" : "Add User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={currentUser?.name || ""}
                onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                value={currentUser?.role || ""}
                onChange={(e) => setCurrentUser({ ...currentUser, role: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                value={currentUser?.status || ""}
                onChange={(e) => setCurrentUser({ ...currentUser, status: e.target.value })}
              >
                <option>Active</option>
                <option>Inactive</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSave}>Save</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserManagement;
