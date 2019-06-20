import React from 'react';
import {NavLink} from 'react-router-dom';

export default function MainPage() {
  // console.log(this.props);
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
