import React, { useEffect, useState } from "react";
import { getRoles, addRole, updateRole } from "../mock/api";
import { Table, Button, Modal, Form } from "react-bootstrap";

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);

  useEffect(() => {
    getRoles().then(setRoles);
  }, []);

  const handleSave = () => {
    if (currentRole.id) {
      updateRole(currentRole.id, currentRole).then(setRoles);
    } else {
      addRole(currentRole).then(setRoles);
    }
    setShowModal(false);
    setCurrentRole(null);
  };

  return (
    <div>
      <h2>Role Management</h2>
      <Button onClick={() => setShowModal(true)}>Add Role</Button>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Permissions</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td>{role.name}</td>
              <td>{role.permissions.join(", ")}</td>
              <td>
                <Button
                  onClick={() => {
                    setCurrentRole(role);
                    setShowModal(true);
                  }}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{currentRole?.id ? "Edit Role" : "Add Role"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Role Name</Form.Label>
              <Form.Control
                type="text"
                value={currentRole?.name || ""}
                onChange={(e) =>
                  setCurrentRole({ ...currentRole, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Permissions (Comma Separated)</Form.Label>
              <Form.Control
                type="text"
                value={currentRole?.permissions.join(", ") || ""}
                onChange={(e) =>
                  setCurrentRole({
                    ...currentRole,
                    permissions: e.target.value.split(",").map((p) => p.trim()),
                  })
                }
              />
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

export default RoleManagement;
