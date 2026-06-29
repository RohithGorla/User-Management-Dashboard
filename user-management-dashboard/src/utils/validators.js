// Basic email regex - good enough for client-side sanity checking
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateUserForm = (formData) => {
  const errors = {};

  if (!formData.firstName || !formData.firstName.trim()) {
    errors.firstName = 'First name is required';
  }

  if (!formData.lastName || !formData.lastName.trim()) {
    errors.lastName = 'Last name is required';
  }

  if (!formData.email || !formData.email.trim()) {
    errors.email = 'Email is required';
  } else if (!EMAIL_REGEX.test(formData.email.trim())) {
    errors.email = 'Enter a valid email address';
  }

  if (!formData.department || !formData.department.trim()) {
    errors.department = 'Department is required';
  }

  return errors;
};

export const hasErrors = (errors) => Object.keys(errors).length > 0;

// Splits the JSONPlaceholder "name" field into first/last name.
// Assumption: first word = first name, remainder = last name.
export const splitName = (fullName = '') => {
  const parts = fullName.trim().split(' ');
  return {
    firstName: parts[0] || '',
    lastName: parts.slice(1).join(' ') || '',
  };
};
