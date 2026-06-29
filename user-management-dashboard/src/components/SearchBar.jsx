export default function SearchBar({ value, onChange, onFilterClick }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by first name, last name or email..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="search-input"
      />
      <button className="btn btn-secondary" onClick={onFilterClick}>
        Filter
      </button>
    </div>
  );
}
