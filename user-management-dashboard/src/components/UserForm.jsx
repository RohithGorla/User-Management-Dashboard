import { useState } from 'react';
import { validateUserForm, hasErrors } from '../utils/validators';
import { DEPARTMENTS } from '../utils/constants';

const emptyForm = { firstName: '', lastName: '', email: '', department: '' };

export default function UserForm({ mode, initialData, onSubmit, onClose }) {
  const [formData, setFormData] = useState(initialData || emptyForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateUserForm(formData);
    setErrors(validationErrors);
    if (hasErrors(validationErrors)) return;

    setSubmitting(true);
    await onSubmit(formData);
    setSubmitting(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <form className="modal" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <h2>{mode === 'edit' ? 'Edit User' : 'Add New User'}</h2>

        <label>First Name</label>
        <input
          value={formData.firstName}
          onChange={(e) => handleChange('firstName', e.target.value)}
        />
        {errors.firstName && <span className="field-error">{errors.firstName}</span>}

        <label>Last Name</label>
        <input
          value={formData.lastName}
          onChange={(e) => handleChange('lastName', e.target.value)}
        />
        {errors.lastName && <span className="field-error">{errors.lastName}</span>}

        <label>Email</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
        />
        {errors.email && <span className="field-error">{errors.email}</span>}

        <label>Department</label>
        <select
          value={formData.department}
          onChange={(e) => handleChange('department', e.target.value)}
        >
          <option value="">Select department</option>
          {DEPARTMENTS.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
        {errors.department && <span className="field-error">{errors.department}</span>}

        <div className="modal-actions">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Saving...' : mode === 'edit' ? 'Save Changes' : 'Add User'}
          </button>
        </div>
      </form>
    </div>
  );
}
