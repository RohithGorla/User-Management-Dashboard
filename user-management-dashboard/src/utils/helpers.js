// Generates a temporary unique id for client-side-only created/edited records
// (JSONPlaceholder is read-only and doesn't persist new IDs reliably).
export const generateTempId = (existingUsers) => {
  const maxId = existingUsers.reduce((max, u) => (u.id > max ? u.id : max), 0);
  return maxId + 1;
};
