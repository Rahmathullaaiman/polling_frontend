import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaCircle } from "react-icons/fa";

const PollCard = ({ poll, onVote, onEdit, onDelete, user, votedOption, results }) => {
  const canManage = user?.permissions?.isAdmin && user?.permissions?.canEdit;
  const [remaining, setRemaining] = useState(
    new Date(poll.expiresAt) - new Date()
  );

  useEffect(() => {
    const timer = setInterval(() => {
      const diff = new Date(poll.expiresAt) - new Date();
      setRemaining(diff > 0 ? diff : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, [poll.expiresAt]);

  const formatTime = (ms) => {
    if (ms <= 0) return "Expired";
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}m ${seconds}s`;
  };

  const isExpired = remaining <= 0;
  const hasVoted = !!votedOption;

  const isUserAllowed =
    poll.visibility !== "private" ||
    (poll.allowedUsers && poll.allowedUsers.includes(user?._id));

  const getVoteCount = (optionText) =>
    results?.[optionText] !== undefined ? results[optionText] : 0;

  return (
    <div className="col-6 mb-4 d-flex">
      <div className="card flex-fill mx-auto" style={{ maxWidth: "750px" }}>
        {/* HEADER */}
        <div className="card-header d-flex justify-content-between align-items-center">
          <strong>{poll.title}</strong>

          <div className="d-flex align-items-center">
            {canManage && (
              <>
                {!isExpired && (
                  <FaEdit
                    size={20}
                    className="me-3 text-primary icon-hover"
                    style={{ cursor: "pointer" }}
                    onClick={() => onEdit?.(poll)}
                    title="Edit Poll"
                  />
                )}
                <FaTrash
                  size={20}
                  className="me-3 text-danger icon-hover"
                  style={{ cursor: "pointer" }}
                  onClick={() => onDelete?.(poll._id)}
                  title="Delete Poll"
                />
              </>
            )}

            <span
              className="badge ms-2 fw-bold"
              style={{
                fontSize: "0.95rem",
                padding: "8px 12px",
                backgroundColor: isExpired ? "#dc3545" : "#158cba", // red/blue
                color: "#fff",
              }}
            >
              {isExpired
                ? "Expired"
                : `Expires in ⏳ ${formatTime(remaining)}`}
            </span>
          </div>
        </div>

        {/* POLL OPTIONS */}
        <div className="card-body">
          {poll.options.map((option, idx) => {
            const isUserVotedThis = votedOption === option.text;
            const count = getVoteCount(option.text);

            // Decide vote count color
            let countColor = "#000"; // always black

            // Button logic
            let btnClass = "btn btn-sm ";
            let btnText = "";
            if (isExpired) {
              if (isUserVotedThis) {
                btnClass += "btn-success";
                btnText = "Voted";
              } else {
                btnClass += "btn-secondary";
                btnText = "Closed";
              }
            } else if (hasVoted) {
              if (isUserVotedThis) {
                btnClass += "btn-success";
                btnText = "Voted";
              } else {
                btnClass += "btn-secondary";
                btnText = "Closed";
              }
            } else {
              btnClass += "btn-outline-primary";
              btnText = "Vote";
            }

            const voteDisabled =
              isExpired ||
              hasVoted ||
              (user.role !== "admin" && !isUserAllowed);

            return (
              <div
                key={idx}
                className="d-flex justify-content-between align-items-center mb-2"
              >
                <div className="d-flex align-items-center">
                  <FaCircle
                    size={10}
                    className="me-2"
                    color={isUserVotedThis ? "#28a745" : "#6c757d"}
                  />
                  <span className="fw-bold me-2">{option.text}</span>
                  <small style={{ color: countColor , fontWeight: 'bold'}}>
                    ({count} votes)
                  </small>
                </div>

                <button
                  className={btnClass}
                  disabled={voteDisabled}
                  onClick={() => onVote(poll._id, option._id)}
                >
                  {btnText}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PollCard;
