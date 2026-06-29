import UserRow from './UserRow';
import { SORT_FIELDS } from '../utils/constants';

export default function UserTable({ users, sortField, sortOrder, onSortChange, onEdit, onDelete }) {
  const handleHeaderClick = (field) => {
    if (sortField === field) {
      onSortChange(field, sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      onSortChange(field, 'asc');
    }
  };

  const arrow = (field) => {
    if (sortField !== field) return '';
    return sortOrder === 'asc' ? ' ▲' : ' ▼';
  };

  const sortableHeaders = [
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'email', label: 'Email' },
    { key: 'department', label: 'Department' },
  ];

  return (
    <div className="table-wrapper">
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            {sortableHeaders.map((h) => (
              <th key={h.key} onClick={() => handleHeaderClick(h.key)} className="sortable">
                {h.label}
                {arrow(h.key)}
              </th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="6" className="empty-state">
                No users found.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <UserRow key={user.id} user={user} onEdit={onEdit} onDelete={onDelete} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export { SORT_FIELDS };
