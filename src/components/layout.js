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
      <React.Fragment>
        <div className="logo">
          <div>
            <img className="imgLogo" src={logonoAddClear} alt="logo" />
          </div>
        </div>
      </React.Fragment>
      <header className="site-head">
        <div className="site-head-container" style={{ marginTop: 20 }}>
          <a
            className="nav-burger"
            href={`#`}
            onClick={() => setToggleNav(!toggleNav)}
          >
            <div
              className="hamburger hamburger--collapse"
              aria-label="Menu"
              role="button"
              aria-controls="navigation"
            >
              <div className="hamburger-box">
                <div className="hamburger-inner" />
              </div>
            </div>
          </a>
          <nav id="swup" className="site-head-left">
            <ul className="nav" role="menu">
              <li className="nav-home" role="menuitem">
                <Link to={`/`}>Home</Link>
              </li>

              <li className="nav-about" role="menuitem">
                <Link to={`/about`}>About</Link>
              </li>
              <li className="nav-elements" role="menuitem">
                <Link to={`/contact`}>Contact</Link>
              </li>
            </ul>
          </nav>
          <nav className="site-head-right">
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
      <footer className="site-foot">
        &copy; {new Date().getFullYear()} <Link to={`/`}>{title}</Link>
      </footer>
    </div>
  )
}

export default Layout
