import React, { useState } from "react"
import { Link } from "gatsby"
import DropdownContainer from "./Dropdown"
// import client from "../client
import UseAutoComplete from "../components/search"
// import "../pages/sandbox.css"

const logonoAddClear = require("../images/logono_add_clear.png")
const Layout = props => {
  const { title, children } = props
  const [toggleNav, setToggleNav] = useState(false)

  return (
    <div className={`site-wrapper ${toggleNav ? `site-head-open` : ``}`}>
      <header>
        <div className="logo">
          <div>
            <img className="imgLogo" src={logonoAddClear} alt="logo" />
          </div>
        </div>
      </header>
      <header className="site-head">
        <div className="site-head-container">
          <a
            className="nav-burger"
            // href={`#`}
            onClick={() => setToggleNav(!toggleNav)}
            style={{ paddingTop: 50 }}
          >
            <div
              className="hamburger hamburger--collapse"
              aria-label="Menu"
              role="button"
              aria-controls="navigation"
            >
              <div className="hamburger-box">
                <div className="hamburger-inner" />
                <br />
              </div>
            </div>
          </a>
          <nav id="swup" className="site-head-left" style={{ marginTop: 70 }}>
            <ul className="nav" role="menu">
              <li
                className="nav-home"
                role="menuitem"
                onClick={() => setToggleNav(false)}
              >
                <Link to={`/`}>Home</Link>
              </li>

              <li
                className="nav-about"
                role="menuitem"
                onClick={() => setToggleNav(false)}
              >
                <Link to={`/about`}>About</Link>
              </li>
              <li className="nav-elements" role="menuitem">
                <Link to={`/contact`}>Contact</Link>
              </li>
            </ul>
          </nav>
          <nav className="site-head-right" style={{ marginTop: 70 }}>
            <ul className="nav" role="menu">
              <div className="social-links">
                <a href="https://www.facebook.com/pg/thewoollymammothshoes">
                  <i className="fa fa-facebook" />
                </a>
                <a href="https://www.instagram.com/thewoollymammothshoes/">
                  <i className="fa fa-instagram" />
                </a>
                <a href="https://twitter.com/woolly_shoes">
                  <i className="fa fa-twitter" />
                </a>
              </div>
              <li className="nav-elements" role="menuitem">
                <Link to={`/blog`}>Blog</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <div>
        <ul style={{ listStyle: "none", display: "flex" }}>
          <li>
            <DropdownContainer title="Women" gender="female" key={title} />
          </li>
          <li>
            <DropdownContainer title="Men" gender="male" key={title} />
          </li>
          <li>
            <UseAutoComplete style={{}} />
          </li>
        </ul>
      </div>
      <main id="site-main" className="site-main">
        <div id="swup" className="transition-fade">
          {children}
        </div>
      </main>
      <footer className="site-foot" style={{ marginTop: 30 }}>
        &copy; {new Date().getFullYear()} <Link to={`/`}>{title}</Link>
      </footer>
    </div>
  )
}

export default Layout
