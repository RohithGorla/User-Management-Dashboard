import { useState, useMemo } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import FilterPopup from './components/FilterPopup';
import UserTable from './components/UserTable';
import Pagination from './components/Pagination';
import UserForm from './components/UserForm';
import ConfirmDelete from './components/ConfirmDelete';
import useUsers from './hooks/useUsers';

const emptyFilters = { firstName: '', lastName: '', email: '', department: '' };

export default function App() {
  const { users, loading, error, setError, addUser, editUser, removeUser } = useUsers();

  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState(emptyFilters);
  const [showFilterPopup, setShowFilterPopup] = useState(false);

  const [sortField, setSortField] = useState('firstName');
  const [sortOrder, setSortOrder] = useState('asc');

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [formState, setFormState] = useState(null); // { mode: 'add' | 'edit', user?: {...} }
  const [userToDelete, setUserToDelete] = useState(null);

  // ---- Search ----
  const searchedUsers = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.firstName.toLowerCase().includes(q) ||
        u.lastName.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q)
    );
  }, [users, searchQuery]);

  // ---- Filter ----
  const filteredUsers = useMemo(() => {
    return searchedUsers.filter((u) => {
      if (filters.firstName && !u.firstName.toLowerCase().includes(filters.firstName.toLowerCase())) return false;
      if (filters.lastName && !u.lastName.toLowerCase().includes(filters.lastName.toLowerCase())) return false;
      if (filters.email && !u.email.toLowerCase().includes(filters.email.toLowerCase())) return false;
      if (filters.department && u.department !== filters.department) return false;
      return true;
    });
  }, [searchedUsers, filters]);

  // ---- Sort ----
  const sortedUsers = useMemo(() => {
    return [...filteredUsers].sort((a, b) => {
      const valA = (a[sortField] || '').toString().toLowerCase();
      const valB = (b[sortField] || '').toString().toLowerCase();
      return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });
  }, [filteredUsers, sortField, sortOrder]);

  // ---- Pagination ----
  const totalPages = Math.max(1, Math.ceil(sortedUsers.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const visibleUsers = sortedUsers.slice(startIndex, startIndex + pageSize);

  const handleSortChange = (field, order) => {
    setSortField(field);
    setSortOrder(order);
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
  };

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  // ---- Add / Edit submit ----
  const handleFormSubmit = async (formData) => {
    let result;
    if (formState.mode === 'edit') {
      result = await editUser(formState.user.id, formData);
    } else {
      result = await addUser(formData);
    }
    if (result.success) {
      setFormState(null);
    }
  };

  const handleConfirmDelete = async () => {
    await removeUser(userToDelete.id);
    setUserToDelete(null);
  };

  return (
    <div className="app">
      <Header onAddClick={() => setFormState({ mode: 'add' })} />

      {error && (
        <div className="alert alert-error">
          {error}
          <button className="alert-close" onClick={() => setError(null)}>
            ×
          </button>
        </div>
      )}

      <SearchBar
        value={searchQuery}
        onChange={(val) => {
          setSearchQuery(val);
          setCurrentPage(1);
        }}
        onFilterClick={() => setShowFilterPopup(true)}
      />

      {loading ? (
        <div className="loading-state">Loading users...</div>
      ) : (
        <>
          <UserTable
            users={visibleUsers}
            sortField={sortField}
            sortOrder={sortOrder}
            onSortChange={handleSortChange}
            onEdit={(user) => setFormState({ mode: 'edit', user })}
            onDelete={(user) => setUserToDelete(user)}
          />

          <Pagination
            currentPage={safePage}
            totalPages={totalPages}
            pageSize={pageSize}
            totalItems={sortedUsers.length}
            onPageChange={setCurrentPage}
            onPageSizeChange={handlePageSizeChange}
          />
        </>
      )}

      {showFilterPopup && (
        <FilterPopup
          initialFilters={filters}
          onApply={handleApplyFilters}
          onClose={() => setShowFilterPopup(false)}
        />
      )}

      {formState && (
        <UserForm
          mode={formState.mode}
          initialData={formState.mode === 'edit' ? formState.user : null}
          onSubmit={handleFormSubmit}
          onClose={() => setFormState(null)}
        />
      )}

      {userToDelete && (
        <ConfirmDelete
          user={userToDelete}
          onConfirm={handleConfirmDelete}
          onCancel={() => setUserToDelete(null)}
        />
      )}
    </div>
  );
}
