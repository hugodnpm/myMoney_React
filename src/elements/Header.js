import React from 'react'
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/" className="navbar-brand">
          My Money
        </Link>
      </div>
    </nav>
  )
}
export default Header
