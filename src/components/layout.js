import React, { useState } from "react"
import { Link } from "gatsby"
import DropdownContainer from "./Dropdown"
// import client from "../client"

const logonoAddClear = require("../images/logono_add_clear.png")
const Layout = props => {
  const { title, children } = props
  const [toggleNav, setToggleNav] = useState(false)

  return (
    <div className={`site-wrapper ${toggleNav ? `site-head-open` : ``}`}>
      <React.Fragment>
        <div className="logo">
          <div class="col-md-4">
            <img src={logonoAddClear} alt="logo" />
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
          <nav id="swup" class="site-head-left">
            <ul className="nav" role="menu">
              <li className="nav-home" role="menuitem">
                <span>
                  <Link to={`/`}>Home</Link>
                </span>
              </li>

              {/* <li className="nav-elements" role="menuitem"> */}
              {/* <li className="nav-elements" role="menuitem">
                <Link to={`/elements`}>Elements</Link>
              </li> */}

              <li className="nav-elements" role="menuitem">
                <DropdownContainer title="Men" gender="male" key={title} />
              </li>
              <li className="nav-elements" role="menuitem">
                <DropdownContainer title="Women" gender="female" key={title} />
              </li>
              {/* <li className="nav-elements" role="menuitem">
                  <Link to={`/accessories`}>Accessories</Link>
                </li>
                <li className="nav-elements" role="menuitem">
                  <Link to={`/kids`}>Kids</Link>
                </li> */}
              {/* </li> */}
            </ul>
          </nav>
          {/* <div className="site-head-center">
            <Link className="site-head-logo" to={`/`}>
              {title}
            </Link>
          </div> */}
          <div className="site-head-right">
            <li className="nav-elements" role="menuitem">
              <span>
                <Link to={`/blog`}>Blog</Link>
              </span>
            </li>
            <li className="nav-about" role="menuitem">
              <span>
                <Link to={`/about`}>About</Link>
              </span>
            </li>
            <li className="nav-elements" role="menuitem">
              <span>
                <Link to={`/contact`}>Contact</Link>
              </span>
            </li>
            <div className="social-links">
              <a href="https://www.facebook.com/pg/thewoollymammothshoes">
                <i class="fa fa-facebook" />
              </a>
              <a href="https://www.instagram.com/thewoollymammothshoes/">
                <i class="fa fa-instagram" />
              </a>
              <a href="https://twitter.com/woolly_shoes">
                <i class="fa fa-twitter" />
              </a>
            </div>
          </div>
        </div>
      </header>
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
