import React, { useEffect, useState, useContext } from "react";
import { getPollsApi, deletePollApi, updatePollApi, getUsersApi } from "../services/allapi";
import { UserContext } from "../context/UserContext";
import PollModal from "./PollModal";
import Swal from "sweetalert2";
import { validatePollForm } from "../helpers.js/formvalidations";

const Dashboard = () => {
    const [polls, setPolls] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editingPollId, setEditingPollId] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalOptions, setModalOptions] = useState([""]);
    const [modalDuration, setModalDuration] = useState(30);
    const [modalVisibility, setModalVisibility] = useState("public");
    const [modalAllowedUsers, setModalAllowedUsers] = useState([]);
    const [userOptions, setUserOptions] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const reqHeader = user?.token
                ? { Authorization: `Bearer ${user.token}` }
                : {};
            const pollsRes = await getPollsApi(reqHeader);
            setPolls(pollsRes.data || []);
            const usersRes = await getUsersApi(reqHeader);
            if (usersRes?.data?.data) {
                setUserOptions(usersRes.data.data.filter((u) => u.role === "user"));
            }
            setLoading(false);
        };
        fetchData();
    }, [user?.token]);

    const now = new Date();

    const getPollStatus = (poll) => {
        if (poll.visibility === "private") return "Private";
        return new Date(poll.expiresAt) > now ? "Active" : "Expired";
    };

    const formatDate = (dateStr) => {
        const d = new Date(dateStr);
        return d.toLocaleDateString();
    };

    const formatTime = (dateStr) => {
        const d = new Date(dateStr);
        return d.toLocaleTimeString();
    };

    const filteredPolls = polls.filter((p) => {
        const status = getPollStatus(p).toLowerCase();
        return (
            p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            status.includes(searchTerm.toLowerCase())
        );
    });

    if (loading) return <div>Loading...</div>;

    const resetForm = () => {
        setModalTitle("");
        setModalOptions([""]);
        setModalDuration(30);
        setModalVisibility("public");
        setModalAllowedUsers([]);
    };

    const handleEditPoll = (poll) => {
        setEditingPollId(poll._id);
        setIsEditing(true);
        setModalTitle(poll.title);
        setModalOptions(poll.options.map(opt => typeof opt === "string" ? opt : opt.text));
        setModalDuration(poll.duration || 30);
        setModalVisibility(poll.visibility || "public");
        setModalAllowedUsers(poll.allowedUsers || []);
        setShowModal(true);
    };

    const handleClose = () => {
        resetForm();
        setShowModal(false);
        setIsEditing(false);
        setEditingPollId(null);
    };

    const handleUpdatePoll = async () => {
        const validation = validatePollForm({
            title: modalTitle,
            options: modalOptions,
            duration: modalDuration,
            visibility: modalVisibility,
            allowedUsers: modalAllowedUsers
        });
        if (!validation.valid) {
            Swal.fire({
                title: validation.message,
                icon: "error"
            });
            return;
        }
        try {
            const reqHeader = user?.token
                ? { Authorization: `Bearer ${user.token}` }
                : {};
            let payload = {
                title: modalTitle,
                options: modalOptions.filter((o) => o.trim() !== ""),
                duration: Number(modalDuration),
                visibility: modalVisibility,
                allowedUsers: modalVisibility === "private" ? modalAllowedUsers : [],
            };
            const result = await updatePollApi(editingPollId, payload, reqHeader);
            if (result.status === 200) {
                Swal.fire({
                    title: `Poll updated successfully!`,
                    icon: "success"
                });
                setPolls((prev) =>
                    prev.map((p) => (p._id === editingPollId ? result.data : p))
                );
                handleClose();
            } else {
                Swal.fire({
                    title: "Error updating poll",
                    text: result.response?.data?.message || "Unknown error",
                    icon: "error"
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Failed to update poll",
                icon: "error"
            });
        }
    };

    const handleDeletePoll = async (pollId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const reqHeader = user?.token ? { Authorization: `Bearer ${user.token}` } : {};
                    const res = await deletePollApi(pollId, reqHeader);
                    if (res.status === 200) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Poll has been deleted successfully.",
                            icon: "success"
                        });
                        setPolls((prev) => prev.filter((p) => p._id !== pollId));
                    } else {
                        Swal.fire({
                            title: "Failed to delete poll",
                            text: res.response?.data?.message || "Unknown error",
                            icon: "error"
                        });
                    }
                } catch (error) {
                    Swal.fire({
                        title: "Something went wrong while deleting",
                        icon: "error"
                    });
                }
            }
        });
    };

    return (
        <div className="container-fluid mt-4">
            <h2 className="mb-4">Dashboard</h2>

            {/* Current User Info */}
            <div className="mb-4 p-3 border rounded bg-light">
                <h4>Current User</h4>
                <div>
                    <strong>Name:</strong> {user?.username}
                    <br />
                   
                    <strong>Role:</strong> {user?.role}
                </div>
            </div>

            {/* Search Filter */}
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by title or status..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ maxWidth: "300px" }}
                />
            </div>

            {/* Unified Polls Table */}
            <h5>All Polls</h5>
            <table className="table table-bordered table-striped w-100">
                <thead className="table-dark">
                    <tr>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPolls.length > 0 ? (
                        filteredPolls.map((p) => (
                            <tr key={p._id}>
                                <td>{p.title}</td>
                                <td>
                                    {getPollStatus(p) === "Active" && (
                                        <span className="badge bg-success">Active</span>
                                    )}
                                    {getPollStatus(p) === "Private" && (
                                        <span className="badge bg-primary">Private</span>
                                    )}
                                    {getPollStatus(p) === "Expired" && (
                                        <span className="badge bg-danger">Expired</span>
                                    )}
                                </td>
                                <td>{formatDate(p.expiresAt)}</td>
                                <td>{formatTime(p.expiresAt)}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-primary me-2"
                                        onClick={() => handleEditPoll(p)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => handleDeletePoll(p._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center text-muted">
                                No polls found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <PollModal
                showModal={showModal}
                handleClose={handleClose}
                title={modalTitle}
                setTitle={setModalTitle}
                options={modalOptions}
                setOptions={setModalOptions}
                duration={modalDuration}
                setDuration={setModalDuration}
                visibility={modalVisibility}
                setVisibility={setModalVisibility}
                allowedUsers={modalAllowedUsers}
                setAllowedUsers={setModalAllowedUsers}
                userOptions={userOptions}
                handleCreatePoll={isEditing ? handleUpdatePoll : undefined}
                resetForm={resetForm}
                isEditing={isEditing}
            />
        </div>
    );
};

export default Dashboard;
