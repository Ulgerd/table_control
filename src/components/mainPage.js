import React from 'react';
import { NavLink } from 'react-router-dom';

import '../assets/CSS/mainPage.css';

export default function MainPage() {
  return (
    <div>
      <NavLink
        to={`/table/`}
        data-testid='table-link'
      >
        <button
          className='main_button'
          data-testid='table-button'
        >
          Перейти на табличный контрол
        </button>
      </NavLink>
    </div>
  )
}
