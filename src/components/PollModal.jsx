import React from "react";
import { Modal, Form, Button } from "react-bootstrap";
import Select from "react-select";

function PollModal({
  showModal,
  handleClose,
  title,
  setTitle,
  options,
  setOptions,
  duration,
  setDuration,
  visibility,
  setVisibility,
  allowedUsers,
  setAllowedUsers,
  userOptions,
  handleCreatePoll,
  resetForm,
  isEditing = false,
}) {
  const addOptionField = () => setOptions([...options, ""]);
  const updateOption = (idx, value) => {
    const newOpts = [...options];
    newOpts[idx] = value;
    setOptions(newOpts);
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{isEditing ? "Edit Poll" : "Create Poll"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Label>Options</Form.Label>
          {options.map((opt, idx) => (
            <div key={idx} className="d-flex align-items-center mb-2">
              <Form.Control
                type="text"
                value={opt}
                onChange={(e) => updateOption(idx, e.target.value)}
              />
              <Button
                variant="outline-danger"
                size="sm"
                className="ms-2"
                onClick={() => {
                  const newOpts = [...options];
                  newOpts.splice(idx, 1);
                  setOptions(newOpts);
                }}
                disabled={options.length <= 1}
              >
                ✕
              </Button>
            </div>
          ))}

          {options.length < 5 && (
            <Button size="sm" variant="primary" onClick={addOptionField}>
              + Add Option
            </Button>
          )}

          <Form.Group className="mt-3">
            <Form.Label>Duration (minutes)</Form.Label>
            <Form.Control
              type="number"
              min="1"
              max="120"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Visibility</Form.Label>
            <Form.Select
              value={visibility}
              onChange={(e) => {
                const val = e.target.value;
                setVisibility(val);
                if (val === "public") {
                  setAllowedUsers([]);
                }
              }}
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </Form.Select>
          </Form.Group>

          {visibility === "private" && (
            <Form.Group className="mt-3">
              <Form.Label>Select Users</Form.Label>
              <Select
                isMulti
                options={userOptions.map((u) => ({
                  value: u._id,
                  label: u.username,
                }))}
                value={userOptions
                  .filter((u) => allowedUsers.includes(u._id))
                  .map((u) => ({ value: u._id, label: u.username }))}
                onChange={(selected) => {
                  setAllowedUsers(selected.map((opt) => opt.value));
                }}
                placeholder="Select users..."
              />
            </Form.Group>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            handleCreatePoll();
          }}
        >
          {isEditing ? "Update Poll" : "Create Poll"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PollModal;
