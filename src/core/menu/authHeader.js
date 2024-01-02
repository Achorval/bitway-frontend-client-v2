import React, { useEffect, useState } from "react";
import Breakpoint, { BreakpointProvider, setDefaultBreakpoints } from "react-socks";
import { 
  Link, 
  useNavigate, 
  useMatch,
  useResolvedPath
} from "react-router-dom";
import useOnclickOutside from "react-cool-onclickoutside";
import auth from '../auth';

setDefaultBreakpoints([
  { xs: 0 },
  { l: 1199 },
  { xl: 1200 }
]);

const NavLink = (props) => {
  let resolved = useResolvedPath(props.to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link
      {...props}
      className={ match ? 'active' : 'non-active'}
    />
  )
};

const Header = function({ className }) {

    const navigate = useNavigate();

    const [openMenu, setOpenMenu] = React.useState(false);
    const [openMenu1, setOpenMenu1] = React.useState(false);
    // const [openMenu2, setOpenMenu2] = React.useState(false);
    // const [openMenu3, setOpenMenu3] = React.useState(false);
    const handleBtnClick = () => {
      setOpenMenu(!openMenu);
    };
    const handleBtnClick1 = () => {
      setOpenMenu1(!openMenu1);
    };
    // const handleBtnClick2 = () => {
    //   setOpenMenu2(!openMenu2);
    // };
    // const handleBtnClick3 = () => {
    //   setOpenMenu3(!openMenu3);
    // };
    const closeMenu = () => {
      setOpenMenu(false);
    };
    const closeMenu1 = () => {
      setOpenMenu1(false);
    };
    // const closeMenu2 = () => {
    //   setOpenMenu2(false);
    // };
    // const closeMenu3 = () => {
    //   setOpenMenu3(false);
    // };

    const ref = useOnclickOutside(() => {
      closeMenu();
    });
    const ref1 = useOnclickOutside(() => {
      closeMenu1();
    });
    // const ref2 = useOnclickOutside(() => {
    //   closeMenu2();
    // });
    // const ref3 = useOnclickOutside(() => {
    //   closeMenu3();
    // });
    
    const [showmenu, btn_icon] = useState(false);
    const [showpop, btn_icon_pop] = useState(false);
    const [shownot, btn_icon_not] = useState(false);
    const closePop = () => {
      btn_icon_pop(false);
    };
    const closeNot = () => {
      btn_icon_not(false);
    };
    const refpop = useOnclickOutside(() => {
      closePop();
    });
    const refpopnot = useOnclickOutside(() => {
      closeNot();
    });

    const handleLogout = () => {
      // auth.clearAppStorage();
      navigate('/logout')
    }

    const handleNavigate = (url) => {
      return navigate(url);
    }

    useEffect(() => {
    const header = document.getElementById("myHeader");
    const totop = document.getElementById("scroll-to-top");
    const sticky = header.offsetTop;
    const scrollCallBack = window.addEventListener("scroll", () => {
        btn_icon(false);
        if (window.pageYOffset > sticky) {
          header.classList.add("sticky");
          totop.classList.add("show");
          
        } else {
          header.classList.remove("sticky");
          totop.classList.remove("show");
        } if (window.pageYOffset > sticky) {
          closeMenu();
        }
      });
      return () => {
        window.removeEventListener("scroll", scrollCallBack);
      };
    }, []);
    return (
      <header className={`navbar white bg-custom-primary ${className}`} id="myHeader">
        <div className='container'>
          <div className='row w-100-nav'>
            <div className='logo px-0'>
              <div className='navbar-title navbar-item'>
                <NavLink to="/">
                  <img
                    src="/img/bitway-logo.png"
                    className="img-fluid d-block"
                    width="120px"
                    alt="#"
                  />
                  <img
                    src="/img/logo-2.png"
                    className="img-fluid d-3"
                    alt="#"
                  />
                  <img
                    src="/img/logo-3.png"
                    className="img-fluid d-4"
                    alt="#"
                  />
                  <img
                    src="/img/bitway-logo-REVERSED.png"
                    className="img-fluid d-none" 
                    width="120px"
                    alt="#"
                  />
                </NavLink>
              </div>
            </div>
                  
            <BreakpointProvider>
              <Breakpoint l down>
                {showmenu && 
                <div className='menu'>
                  <div className='navbar-item'>
                    <div ref={ref}>
                      <div className="dropdown-custom dropdown-toggle btn" 
                        onClick={handleBtnClick}
                        >
                        Product 1
                      </div>
                      {openMenu && (
                        <div className='item-dropdown'>
                          <div className="dropdown" onClick={closeMenu}>
                            <NavLink to="/" onClick={() => btn_icon(!showmenu)}>Bitcoin</NavLink>
                            <NavLink to="/" onClick={() => btn_icon(!showmenu)}>USDT</NavLink>
                            <NavLink to="/" onClick={() => btn_icon(!showmenu)}>Academy</NavLink>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className='navbar-item'>
                    <div ref={ref1}>
                      <div className="dropdown-custom dropdown-toggle btn" 
                        onClick={handleBtnClick1}
                        >
                        Company
                      </div>
                      {openMenu1 && (
                        <div className='item-dropdown'>
                          <div className="dropdown" onClick={closeMenu1}>
                            <NavLink to="/" onClick={() => btn_icon(!showmenu)}>About</NavLink>
                            <NavLink to="/" onClick={() => btn_icon(!showmenu)}>Contact</NavLink>
                            <NavLink to="/" onClick={() => btn_icon(!showmenu)}>Career</NavLink>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className='navbar-item'>
                    <NavLink to="/help-center" style={{fontSize: '14px'}}>
                      Help Center
                      <span className='lines'></span>
                    </NavLink>
                  </div>
                </div>
                }
              </Breakpoint>

              <Breakpoint xl>
                <div className='menu'>
                  <div className='navbar-item'>
                    <div ref={ref}>
                      <div className="dropdown-custom dropdown-toggle btn" 
                        onMouseEnter={handleBtnClick} onMouseLeave={closeMenu}>
                        Product 
                        <span className='lines'></span>
                        {openMenu && (
                        <div className='item-dropdown'>
                          <div className="dropdown" onClick={closeMenu}>
                            <NavLink to="/">Bitcoin</NavLink>
                            <NavLink to="/">USDT</NavLink>
                            <NavLink to="/">Academy</NavLink>
                          </div>
                        </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='navbar-item'>
                    <div ref={ref1}>
                      <div className="dropdown-custom dropdown-toggle btn" 
                        onMouseEnter={handleBtnClick1} onMouseLeave={closeMenu1}>
                        Company
                        <span className='lines'></span>
                        {openMenu1 && (
                        <div className='item-dropdown'>
                          <div className="dropdown" onClick={closeMenu1}>
                          <NavLink to="/">About</NavLink>
                          <NavLink to="/">Contact</NavLink>
                          <NavLink to="/">Career</NavLink>
                          </div>
                        </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className='navbar-item'>
                    <NavLink to="/help-center" style={{fontSize: '14px'}}>
                      Help Center
                      <span className='lines'></span>
                    </NavLink>
                  </div>
                </div>
              </Breakpoint>
            </BreakpointProvider>

            <div className='mainside'>
              <div className='connect-wal'> 
                <Link to="/auth/login" className="btn-main inline white lead">Login</Link>
                <NavLink to="/auth/register">Get Started</NavLink>
                {/* <NavLink to="/wallet">Connect Wallet</NavLink> */}
              </div>

              <div className="logout">
                <div id="de-click-menu-notification" className="de-menu-notification" onClick={() => btn_icon_not(!shownot)} ref={refpopnot}>
                  <div className="d-count">0</div>
                  <i className="fa fa-bell"></i>
                  {shownot && 
                    <div className="popshow">
                      <div className="de-flex">
                          <h4>Notifications</h4>
                          {/* <span className="viewaall">Show all</span> */}
                      </div>
                      <div className="fs-6 mt-3">You don't have notification</div>
                      {/* <ul>
                        <li>
                            <div className="mainnot">
                                <img className="lazy" src="../../img/author/author-2.jpg" alt=""/>
                                <div className="d-desc">
                                    <span className="d-name"><b>Mamie Barnett</b> started following you</span>
                                    <span className="d-time">1 hour ago</span>
                                </div>
                            </div>  
                        </li>
                        <li>
                            <div className="mainnot">
                                <img className="lazy" src="../../img/author/author-3.jpg" alt=""/>
                                <div className="d-desc">
                                    <span className="d-name"><b>Nicholas Daniels</b> liked your item</span>
                                    <span className="d-time">2 hours ago</span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="mainnot">
                                <img className="lazy" src="../../img/author/author-4.jpg" alt=""/>
                                <div className="d-desc">
                                    <span className="d-name"><b>Lori Hart</b> started following you</span>
                                    <span className="d-time">18 hours ago</span>
                                </div>
                            </div>    
                        </li>
                        <li>
                            <div className="mainnot">
                                <img className="lazy" src="../../img/author/author-5.jpg" alt=""/>
                                <div className="d-desc">
                                    <span className="d-name"><b>Jimmy Wright</b> liked your item</span>
                                    <span className="d-time">1 day ago</span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="mainnot">
                                <img className="lazy" src="../../img/author/author-6.jpg" alt=""/>
                                <div className="d-desc">
                                    <span className="d-name"><b>Karla Sharp</b> started following you</span>
                                    <span className="d-time">3 days ago</span>
                                </div>
                            </div>    
                        </li>
                      </ul> */}
                    </div>
                  }
                </div>
                <div id="de-click-menu-profile" className="de-menu-profile" onClick={() => btn_icon_pop(!showpop)} ref={refpop}>                           
                  <img src="../../img/author_single/author_thumbnail.jpg" alt=""/>
                  {showpop && 
                    <div className="popshow">
                      <div className="d-name">
                          <h4>Monica Lucas</h4>
                          <span className="name" onClick={()=> window.open("", "_self")}>Set display name</span>
                      </div>
                      <div className="d-balance">
                          <h4>Balance</h4>
                          12.858 ETH
                      </div>
                      <div className="d-line"></div>
                      <ul className="de-submenu-profile">
                        <li onClick={() => handleNavigate('/settings')}>
                          <span>
                            <i className="fa fa-gear"></i> Settings
                          </span>
                        </li>
                        <li>
                          <span>
                            <i className="fa fa-pencil"></i> Support
                          </span>
                        </li>
                        <li onClick={handleLogout}>
                          <span>
                            <i className="fa fa-sign-out"></i> Sign out
                          </span>
                        </li>
                      </ul>
                    </div>
                  }
                </div>
              </div>
            </div>             
          </div>
          <button className="nav-icon" onClick={() => btn_icon(!showmenu)}>
            <div className="menu-line white"></div>
            <div className="menu-line1 white"></div>
            <div className="menu-line2 white"></div>
          </button>
        </div>     
      </header>
    );
}
export default Header;