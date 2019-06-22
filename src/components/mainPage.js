import React from 'react';
import { NavLink } from 'react-router-dom';

export default function MainPage() {
  return (
    <div>
      <NavLink
        to={`/table/`}
      >
        <button>
          Перейти на табличный контрол
        </button>
      </NavLink>
    </div>
  )
}
