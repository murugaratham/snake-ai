import React from 'react';

export interface INavBarProps {
    toggleSideBar?: (v: any) => any;
}

const NavBar: React.SFC<INavBarProps> = (props) => {
  return (
    <header>
    <nav className="navbar navbar-defaultnavbar navbar-light fixed-top bg-light">
    <ul className="nav navbar-nav">
        <button className="navbar-toggler" type="button" onClick={props.toggleSideBar}>
            <span className="navbar-toggler-icon" id="menu-toggle"/>
        </button>
        </ul>
    </nav>
</header>
  );
};

export default NavBar;