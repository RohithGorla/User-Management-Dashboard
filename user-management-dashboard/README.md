# User Management Dashboard

A React-based admin dashboard for viewing, searching, filtering, sorting, adding, editing, and deleting users, built against the [JSONPlaceholder](https://jsonplaceholder.typicode.com/) mock REST API.

## Project Overview

This app fetches user data from `https://jsonplaceholder.typicode.com/users` and lets an admin perform full CRUD operations on it. Since JSONPlaceholder is a read-only mock API, all write operations (add/edit/delete) simulate success on the server and are reflected only in local React state, giving a realistic UI experience without a real backend.

## Tech Stack

- React 18 (Vite)
- Axios for HTTP requests
- Plain CSS (no UI framework) for full control over responsive behavior

## Installation

```bash
git clone <your-repo-url>
cd user-management-dashboard
npm install
```

## Running the Project

```bash
npm run dev
```

App runs at `http://localhost:5173`.

To build for production:

```bash
npm run build
npm run preview
```

## Folder Structure

```
user-management-dashboard/
├── src/
│   ├── api/userService.js       # Axios calls (GET/POST/PUT/DELETE)
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── SearchBar.jsx
│   │   ├── FilterPopup.jsx
│   │   ├── UserTable.jsx
│   │   ├── UserRow.jsx
│   │   ├── Pagination.jsx
│   │   ├── UserForm.jsx         # Used for both Add and Edit
│   │   └── ConfirmDelete.jsx
│   ├── hooks/useUsers.js        # All data-fetching + CRUD state logic
│   ├── utils/
│   │   ├── constants.js
│   │   ├── validators.js
│   │   └── helpers.js
│   ├── styles/App.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
└── package.json
```

## Libraries Used

- **axios** — all HTTP communication with JSONPlaceholder
- No CSS framework — handwritten responsive CSS in `src/styles/App.css`

## Engineering Assumptions

1. **First/Last name split**: JSONPlaceholder only provides a single `name` field (e.g. `"Leanne Graham"`). We split on the first space — everything before is `firstName`, everything after is `lastName`.
2. **Department field**: JSONPlaceholder has no department field at all. We assign each fetched user a department from a fixed list (`IT, Engineering, Sales, HR, Finance, Marketing`) in rotating order purely so the column has realistic-looking data to filter/sort on.
3. **Add User IDs**: JSONPlaceholder always returns `id: 11` for any POST request regardless of how many times you call it. To avoid duplicate-key bugs when adding multiple users in one session, we detect this and generate an incrementing local ID instead.
4. **Persistence**: Since the API doesn't actually persist writes, all add/edit/delete operations are saved only in the browser's React state for that session. Refreshing the page resets to the original JSONPlaceholder dataset.

## Features Implemented

- View users in a sortable, responsive table (ID, First Name, Last Name, Email, Department)
- Real-time search across first name, last name, and email
- Filter popup with independent fields for first name, last name, email, department
- Click-to-sort table headers (ascending/descending, toggled on repeat click)
- Pagination with selectable page size (10 / 25 / 50 / 100)
- Add User modal with client-side validation
- Edit User modal pre-populated with the selected user's data
- Delete confirmation modal before removing a user
- Friendly error banners for failed API calls (network errors, etc.), dismissible
- Fully responsive layout — tested down to ~360px width, table scrolls horizontally on small screens, buttons meet 44x44px tap target minimum

## Challenges Faced

- **Read-only backend**: JSONPlaceholder doesn't actually persist changes, and POST always returns the same fake `id: 11`. Solved by detecting this and generating a local incrementing ID so the UI behaves correctly across multiple adds in one session.
- **Missing fields**: The API has no `firstName`/`lastName`/`department` fields, requiring upfront data-mapping decisions, documented above.
- **Avoiding stale state bugs**: Search, filter, sort, and pagination all interact — used `useMemo` chains in `App.jsx` so each stage (search → filter → sort → paginate) recomputes cleanly from the previous one without redundant re-renders.

## Future Improvements (Given More Time)

- Add a real backend (e.g. Node/Express + MongoDB or PostgreSQL) for actual persistence instead of session-only state
- Add authentication/authorization for admin-only access
- Add infinite scroll as an alternative to paged pagination
- Add unit tests for validators, pagination math, and the search/filter/sort pipeline
- Add optimistic UI updates with rollback on API failure
- Add column-level multi-sort and saved filter presets
