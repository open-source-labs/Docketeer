import React from 'react';
import Docketeer from '../../../assets/docketeer-title.png';

const Navbar = () => {
  return (
    <nav className='tab'>
      <header id='title'>
        <img src={Docketeer} width={160} />
      </header>
      <div className='viewsAndButton'>
        <ul>
          <li>
            <Link
              to='/app'
              // style={selected === '/' ? selectedStyling : null}
              // onClick={() => setSelected('/')}
            >
              <i className='fas fa-settings'></i> Settings
            </Link>
          </li>
          <li>
            <Link
              to='/running'
              // style={selected === '/running' ? selectedStyling : null}
              // onClick={() => setSelected(() => '/running')}
            >
              <i className='fas fa-box-open'></i> Containers
            </Link>
          </li>
          <li>
            <Link
              to='/images'
              // style={selected === '/images' ? selectedStyling : null}
              // onClick={() => setSelected('/images')}
            >
              <i className='fas fa-database'></i> Images
            </Link>
          </li>
          <li>
            <Link
              to='/metrics'
              // style={selected === '/metrics' ? selectedStyling : null}
              // onClick={() => setSelected('/metrics')}
            >
              <i className='fas fa-chart-pie'></i> Metrics
            </Link>
          </li>
          <li>
            <Link
              to='/yml'
              // style={selected === '/yml' ? selectedStyling : null}
              // onClick={() => setSelected('/yml')}
            >
              <i className='fas fa-file-upload'></i> Docker Compose
            </Link>
          </li>
          <li>
            <Link
              to='/volume'
              // style={selected === '/volume' ? selectedStyling : null}
              // onClick={() => setSelected('/volume')}
            >
              <i className='fas fa-volume-history'></i> Volume History
            </Link>
          </li>
          <li>
            <Link
              to='/logs'
              // style={selected === '/logs' ? selectedStyling : null}
              // onClick={() => setSelected('/logs')}
            >
              <i className='fas fa-log'></i> Process Logs
            </Link>
          </li>
        </ul>
        <div>
          <button
            className='btn'
            // onClick={(e) => helper.handlePruneClick(e)}
          >
            System Prune
          </button>
          <span> </span>
          <button
            className='btn'
            // onClick={(e) => handleLogout(e)}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
