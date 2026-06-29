import { useState } from 'react';
import { DEPARTMENTS } from '../utils/constants';

export default function FilterPopup({ initialFilters, onApply, onClose }) {
  const [filters, setFilters] = useState(initialFilters);

  const handleChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleClear = () => {
    const cleared = { firstName: '', lastName: '', email: '', department: '' };
    setFilters(cleared);
    onApply(cleared);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Filter Users</h2>

        <label>First Name</label>
        <input
          value={filters.firstName}
          onChange={(e) => handleChange('firstName', e.target.value)}
        />

        <label>Last Name</label>
        <input
          value={filters.lastName}
          onChange={(e) => handleChange('lastName', e.target.value)}
        />

        <label>Email</label>
        <input
          value={filters.email}
          onChange={(e) => handleChange('email', e.target.value)}
        />

        <label>Department</label>
        <select
          value={filters.department}
          onChange={(e) => handleChange('department', e.target.value)}
        >
          <option value="">All Departments</option>
          {DEPARTMENTS.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={handleClear}>
            Clear
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleApply}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
