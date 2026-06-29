import { PAGE_SIZE_OPTIONS } from '../utils/constants';

export default function Pagination({ currentPage, totalPages, pageSize, onPageChange, onPageSizeChange, totalItems }) {
  return (
    <div className="pagination">
      <div className="pagination-info">
        Showing page {currentPage} of {totalPages || 1} ({totalItems} users)
      </div>

      <div className="pagination-controls">
        <button
          className="btn btn-small btn-secondary"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Prev
        </button>
        <span className="page-number">{currentPage}</span>
        <button
          className="btn btn-small btn-secondary"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>

        <select value={pageSize} onChange={(e) => onPageSizeChange(Number(e.target.value))}>
          {PAGE_SIZE_OPTIONS.map((size) => (
            <option key={size} value={size}>
              {size} / page
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
