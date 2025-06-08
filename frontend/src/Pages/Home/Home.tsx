import React from 'react'
import useAuth from '../../Hooks/useAuth';

const Home: React.FC = () => {

  const { user } = useAuth();

  return (
    <>
      <p className="hello">Bem-vindo de volta, {user?.first_name}  👋🏼</p>
    </>
  )
}

export default Home;