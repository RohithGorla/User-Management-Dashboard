import { useState, useEffect, useCallback } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../api/userService';
import { generateTempId } from '../utils/helpers';
import { splitName } from '../utils/validators';
import { DEPARTMENTS } from '../utils/constants';

export default function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = useCallback(() => {
    setLoading(true);
    setError(null);
    getUsers()
      .then((response) => {
        const mapped = response.data.map((user, index) => {
          const { firstName, lastName } = splitName(user.name);
          return {
            id: user.id,
            firstName,
            lastName,
            email: user.email,
            // JSONPlaceholder has no department field; we assign a rotating
            // placeholder department so data looks realistic. Documented in README.
            department: DEPARTMENTS[index % DEPARTMENTS.length],
          };
        });
        setUsers(mapped);
      })
      .catch(() => {
        setError('Failed to load users. Please check your connection and try again.');
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const addUser = async (formData) => {
    try {
      const payload = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
      };
      const response = await createUser(payload);
      // JSONPlaceholder always echoes id: 11 for new posts; we generate
      // a real unique local id so multiple adds don't collide in the UI.
      const newUser = {
        id: response.data.id === 11 ? generateTempId(users) : response.data.id,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        department: formData.department,
      };
      setUsers((prev) => [newUser, ...prev]);
      return { success: true };
    } catch {
      setError('Could not add user. Please try again.');
      return { success: false };
    }
  };

  const editUser = async (id, formData) => {
    try {
      const payload = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
      };
      await updateUser(id, payload);
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, ...formData } : u))
      );
      return { success: true };
    } catch {
      setError('Could not update user. Please try again.');
      return { success: false };
    }
  };

  const removeUser = async (id) => {
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
      return { success: true };
    } catch {
      setError('Could not delete user. Please try again.');
      return { success: false };
    }
  };

  return { users, loading, error, setError, fetchUsers, addUser, editUser, removeUser };
}
