import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

const PermissionEditor = ({ role, onSave }) => {
  const [permissions, setPermissions] = useState(role.permissions || []);
  const [showModal, setShowModal] = useState(false);

  const handleSave = () => {
    onSave({ ...role, permissions });
    setShowModal(false);
  };

  return (
    <>
      <Button onClick={() => setShowModal(true)}>Edit Permissions</Button>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Permissions for {role.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Permissions (Comma Separated)</Form.Label>
              <Form.Control
                type="text"
                value={permissions.join(", ")}
                onChange={(e) =>
                  setPermissions(e.target.value.split(",").map((p) => p.trim()))
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSave}>Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PermissionEditor;
