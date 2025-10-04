import React, { useState, useEffect, useContext } from "react";
import { getPollsApi, getUsersApi, createPollApi, deletePollApi, updatePollApi, votePollApi, getPollResultsApi } from "../services/allapi";
import { UserContext } from "../context/UserContext";
import PollCard from "../components/PollCard";
import PollModal from "../components/PollModal";
import CustomNavbar from "../components/CustomNavbar";
import Sidebar from "../components/Sidebar";
import Swal from "sweetalert2";
import { validatePollForm } from "../helpers.js/formvalidations";
import { getUserVotedOption } from "../helpers.js/getUserVotedOption";

function Pollingpage() {
  const [loading, setLoading] = useState(true);
  const [polls, setPolls] = useState([]);
  const { user } = useContext(UserContext);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState([""]);
  const [duration, setDuration] = useState(30);
  const [visibility, setVisibility] = useState("public");
  const [allowedUsers, setAllowedUsers] = useState([]);

  const [userOptions, setUserOptions] = useState([]);

  const [editingPollId, setEditingPollId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [votedPolls, setVotedPolls] = useState({}); // { [pollId]: optionId }
  const [pollResults, setPollResults] = useState({}); // { [pollId]: results }

  const isAdmin = user?.permissions?.isAdmin;
  const canEdit = user?.permissions?.canEdit;

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const reqHeader = user?.token
          ? { Authorization: `Bearer ${user.token}` }
          : {};

        const userloadoptions = await getUsersApi(reqHeader);

        // Filter users with role 'user' and store in state
        if (userloadoptions?.data?.data) {
          setUserOptions(
            userloadoptions.data.data.filter((u) => u.role === "user")
          );
        }

        const result = await getPollsApi(reqHeader);
        if (result.status === 200) {
          setPolls(result.data);

          // Set votedPolls for all polls
          const voted = {};
          result.data.forEach(poll => {
            const votedOption = getUserVotedOption(poll, user?._id);
            if (votedOption) voted[poll._id] = votedOption;
          });
          setVotedPolls(voted);

          // Fetch poll results
          const resultsRes = await getPollResultsApi(reqHeader);
          if (resultsRes.status === 200 && Array.isArray(resultsRes.data)) {
            // Map results by poll id for easy lookup
            const resultsMap = {};
            resultsRes.data.forEach(poll => {
              resultsMap[poll.id] = poll.results;
            });
            setPollResults(resultsMap);
          }
        } else {
          console.error("Error fetching polls:", result.response?.data);
        }
      } catch (err) {
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPolls();
  }, [user]);

  const handleVote = async (pollId, optionId) => {
    if (votedPolls[pollId]) return;

    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, vote!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const reqHeader = user?.token
            ? { Authorization: `Bearer ${user.token}` }
            : {};

          const voteResult = await votePollApi(pollId, optionId, reqHeader);
          const getpolls = await getPollsApi(reqHeader);

          if (voteResult?.data?.success === true) {
            setPolls(getpolls.data);

            // Find voted options for all polls
            const voted = {};
            getpolls.data.forEach(poll => {
              const votedOption = getUserVotedOption(poll, user?._id);
              if (votedOption) voted[poll._id] = votedOption;
            });
            setVotedPolls(voted);
            const resultsRes = await getPollResultsApi(reqHeader);
            if (resultsRes.status === 200 && Array.isArray(resultsRes.data)) {
              const resultsMap = {};
              resultsRes.data.forEach(poll => {
                resultsMap[poll.id] = poll.results;
              });
              setPollResults(resultsMap);
            }

            Swal.fire({
              title: "Vote submitted!",
              icon: "success",
            });
          } else {
            Swal.fire({
              title: "Vote failed",
              text: voteResult?.data?.message || "Unknown error",
              icon: "error",
            });
          }
        } catch (err) {
          Swal.fire({
            title: "Vote error",
            text: err?.response?.data?.message || "Unknown error",
            icon: "error",
          });
        }
      }
    });
  };

  const addOptionField = () => setOptions([...options, ""]);
  const updateOption = (idx, value) => {
    const newOpts = [...options];
    newOpts[idx] = value;
    setOptions(newOpts);
  };

  const resetForm = () => {
    setTitle("");
    setOptions([""]);
    setDuration("");
    setVisibility("public");
    setAllowedUsers([]);
  };

  const handleEditPoll = (poll) => {
    setEditingPollId(poll._id);
    setIsEditing(true);
    setTitle(poll.title);
    setOptions(poll.options.map(opt => typeof opt === "string" ? opt : opt.text));
    setDuration(poll.duration || 30);
    setVisibility(poll.visibility || "public");
    setAllowedUsers(poll.allowedUsers || []);
    setShowModal(true);
  };

  const handleClose = () => {
    resetForm();
    setShowModal(false);
    setIsEditing(false);
    setEditingPollId(null);
  };

  const handleCreatePoll = async () => {
    const validation = validatePollForm({
      title,
      options,
      duration,
      visibility,
      allowedUsers
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

      const payload = {
        title,
        options: options.filter((o) => o.trim() !== ""),
        duration: Number(duration),
        visibility,
        allowedUsers: visibility === "private" ? allowedUsers : [],
      };


      const result = await createPollApi(payload, reqHeader);

      if (result.status === 200 || result.status === 201) {
        Swal.fire({
          title: `Poll created successfully! 🎉`,
          icon: "success"
        });
        setPolls((prev) => [...prev, result.data]);
        handleClose();
      } else {
        Swal.fire({
          title: "Error creating poll",
          text: result.response?.data?.message || "Unknown error",
          icon: "error"
        });
      }
    } catch (error) {
      console.error("Create Poll Error:", error);
      Swal.fire({
        title: "Failed to create poll",
        icon: "error"
      });
    }
  };

  const handleUpdatePoll = async () => {

    const validation = validatePollForm({
      title,
      options,
      duration,
      visibility,
      allowedUsers
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
        title,
        options: options.filter((o) => o.trim() !== ""),
        duration: Number(duration),
        visibility,
        allowedUsers: visibility === "private" ? allowedUsers : [],
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
      console.error("Update Poll Error:", error);
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
          const result = await deletePollApi(pollId, reqHeader);

          if (result.status === 200) {
            Swal.fire({
              title: "Deleted!",
              text: "Poll has been deleted successfully.",
              icon: "success"
            });
            setPolls((prev) => prev.filter((p) => p._id !== pollId));
          } else {
            Swal.fire({
              title: "Failed to delete poll",
              text: result.response?.data?.message || "Unknown error",
              icon: "error"
            });
          }
        } catch (error) {
          console.error("Delete Poll Error:", error);
          Swal.fire({
            title: "Something went wrong while deleting",
            icon: "error"
          });
        }
      }
    });
  };

  if (loading) return <div>Loading polls...</div>;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#fff" }}>
      {/* Main Polls Content */}
      <div style={{ flex: 1, padding: "80px 40px 40px 40px" }}>
        <h2 className="mb-4 text-center">Available Polls</h2>
        {polls.length === 0 ? (
          <p className="text-center">No polls available</p>
        ) : (
          <div className="row">
            {polls.map((poll) => {
              const pollWithOptionObjects = {
                ...poll,
                options: poll.options.map((opt) => ({ text: opt, _id: opt })),
                allowedUsers: poll.allowedUsers || [],
                visibility: poll.visibility || "public",
              };
              return (
                <PollCard
                  key={poll._id}
                  poll={pollWithOptionObjects}
                  onVote={handleVote}
                  onEdit={() => handleEditPoll(poll)}
                  onDelete={handleDeletePoll}
                  user={user}
                  votedOption={votedPolls[poll._id]}
                  results={pollResults[poll._id] || pollResults[poll.id] || {}}
                />
              );
            })}
          </div>
        )
        }
      </div>

      {/* Sidebar for Admin */}
      {isAdmin && canEdit && (
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          user={user}
          setShowModal={setShowModal}
        />
      )}

      {(!isAdmin || !canEdit) && <CustomNavbar user={user} />}

      {/* Poll Modal */}
      <PollModal
        showModal={showModal}
        handleClose={handleClose}
        title={title}
        setTitle={setTitle}
        options={options}
        setOptions={setOptions}
        duration={duration}
        setDuration={setDuration}
        visibility={visibility}
        setVisibility={setVisibility}
        allowedUsers={allowedUsers}
        setAllowedUsers={setAllowedUsers}
        userOptions={userOptions}
        handleCreatePoll={isEditing ? handleUpdatePoll : handleCreatePoll}
        resetForm={resetForm}
        isEditing={isEditing}
      />
    </div>
  );
}

export default Pollingpage;

