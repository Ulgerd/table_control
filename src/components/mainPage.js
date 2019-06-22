import React from 'react';
import { NavLink } from 'react-router-dom';

import '../assets/CSS/mainPage.css';

export default function MainPage() {
  return (
    <div>
      <NavLink
        to={`/table/`}
      >
        <button className='main_button'>
          Перейти на табличный контрол
        </button>
      </NavLink>
    </div>
  )
}
