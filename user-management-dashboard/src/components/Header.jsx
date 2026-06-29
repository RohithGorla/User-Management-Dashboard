export default function Header({ onAddClick }) {
  return (
    <header className="header">
      <h1>User Management Dashboard</h1>
      <button className="btn btn-primary" onClick={onAddClick}>
        + Add User
      </button>
    </header>
  );
}
