/**
 * Returns the option text that the user voted for in a poll, or null if not voted.
 * @param {Object} poll - Poll object with votes.
 * @param {string} userId - User's _id.
 * @returns {string|null} - Option text or null.
 */
export function getUserVotedOption(poll, userId) {
  if (!poll.votes || !userId) return null;
  for (const [option, userIds] of Object.entries(poll.votes)) {
    if (Array.isArray(userIds) && userIds.includes(userId)) {
      return option;
    }
  }
  return null;
}
