import React from 'react';
import { Link } from 'react-router-dom'

import './SideBar.scss'

const SideBar = () => {

  return (
    <section className="sidebar_container">
      <div className="sidebar_header">
        <Link to='/' className="link"><h3>Winged It</h3></Link>
        <hr className="sidebar__separator sidebar--centered" />
      </div>

    </section>
  )
}

export default SideBar;
