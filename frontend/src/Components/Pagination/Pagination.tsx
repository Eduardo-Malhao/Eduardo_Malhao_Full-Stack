import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number, paginate: number) => void;
  rowsPerPage: number;
  onRowsPerPageChange: (rows: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  rowsPerPage = 10,
  onRowsPerPageChange,
}) => {
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1, rowsPerPage);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1, rowsPerPage);
    }
  };

  const handlePageClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page, rowsPerPage);
    }
  };

  // Função para renderizar os números das páginas
  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5; // Número máximo de páginas visíveis
    let startPage = 1;
    let endPage = totalPages;

    if (totalPages > maxVisiblePages) {
      const half = Math.floor(maxVisiblePages / 2);
      startPage = Math.max(currentPage - half, 1);
      endPage = Math.min(currentPage + half, totalPages);

      if (currentPage <= half + 1) {
        endPage = maxVisiblePages;
      } else if (currentPage >= totalPages - half) {
        startPage = totalPages - maxVisiblePages + 1;
      }
    }

    // Botão para a primeira página
    if (startPage > 1) {
      pages.push(
        <li key={1} className={`page-item ${1 === currentPage ? 'active' : ''}`}>
          <button className="page-link" onClick={() => handlePageClick(1)}>
            1
          </button>
        </li>
      );
      if (startPage > 2) {
        pages.push(
          <li key="start-ellipsis" className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        );
      }
    }

    // Páginas principais
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li key={i} className={`page-item ${i === currentPage ? 'active' : ''}`}>
          <button className="page-link" onClick={() => handlePageClick(i)}>
            {i}
          </button>
        </li>
      );
    }

    // Botão para a última página
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <li key="end-ellipsis" className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        );
      }
      pages.push(
        <li key={totalPages} className={`page-item ${totalPages === currentPage ? 'active' : ''}`}>
          <button className="page-link" onClick={() => handlePageClick(totalPages)}>
            {totalPages}
          </button>
        </li>
      );
    }

    return pages;
  };

  return (
    <div className="d-flex justify-content-end align-items-center my-3">

      {/* Seletor de linhas por página */}
      <div className="d-flex align-items-start align-items-md-end px-4">

        <label
          htmlFor='rows_per_page'
          className="me-2 d-none d-md-block"
          style={{ color: '#000', fontSize: '16px', cursor: 'pointer' }}
          >
            Linhas por página:
          </label>

        <select
          className="form-select form-select-md"
          style={{ width: '80px' }}
          id="rows_per_page"
          value={rowsPerPage}
          onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
        >
          {[2, 5, 10, 20].map((rows) => (
            <option key={rows} value={rows}>
              {rows}
            </option>
          ))}
        </select>
      </div>

      {/* Navegação de páginas */}
      <nav aria-label="Page navigation">
        <ul className="pagination mb-0">

          {/* Botão Anterior */}
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              aria-label="Previous"
            >
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>

          {/* Números das páginas */}
          {renderPageNumbers()}

          {/* Botão Próximo */}
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button
              className="page-link"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              aria-label="Next"
            >
              <span aria-hidden="true">&raquo;</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;