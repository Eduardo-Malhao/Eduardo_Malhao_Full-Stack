import React from 'react'

import notFound from '../../../public/404.png';

const NotFound: React.FC = () => {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <img
        src={notFound}
        alt="Página não encontrada"
        className="img-fluid"
      />
    </div>
  )
}

export default NotFound;