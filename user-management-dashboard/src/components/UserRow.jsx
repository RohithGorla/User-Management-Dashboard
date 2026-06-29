export default function UserRow({ user, onEdit, onDelete }) {
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.email}</td>
      <td>{user.department}</td>
      <td className="actions-cell">
        <button className="btn btn-small btn-secondary" onClick={() => onEdit(user)}>
          Edit
        </button>
        <button className="btn btn-small btn-danger" onClick={() => onDelete(user)}>
          Delete
        </button>
      </td>
    </tr>
  );
}
