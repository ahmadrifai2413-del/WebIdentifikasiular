import {useState} from 'react';
import {useAuth} from '../../auth/AuthContext';
import {
  ArrowUpRight,
  BookOpen,
  ChevronDown,
  GitCompareArrows,
  Globe2,
  ImageIcon,
  Leaf,
  Menu,
  ScanLine,
  Search,
  X,
} from 'lucide-react';
import SnakeIcon from '../ui/SnakeIcon';

interface HeaderProps {
  page: string;
  menu: string;
  setMenu: (menu: string) => void;
  mobile: boolean;
  setMobile: (mobile: boolean) => void;
  onOpenSearch: () => void;
}

export default function Header({
  page,
  menu,
  setMenu,
  mobile,
  setMobile,
  onOpenSearch,
}: HeaderProps) {
  const {user,logout}=useAuth();
  const [signingOut,setSigningOut]=useState(false);
  const [accountError,setAccountError]=useState('');
  async function leave(){setSigningOut(true);setAccountError('');try{await logout();}catch{setAccountError('Gagal keluar. Coba lagi.');}finally{setSigningOut(false);}}
  return (
    <>
      <header className="header">
        <a className="brand" href="#home" aria-label="Serpenta Home">
          <SnakeIcon size={29} strokeWidth={1.5} />
          <span>
            serpenta<span className="brand-dot">.</span>
          </span>
        </a>

        <nav
          className={mobile ? 'navigation mobile-open' : 'navigation'}
          aria-label="Navigasi utama"
        >
          <a className={page === 'home' ? 'active' : ''} href="#home">
            Home
          </a>
          <a className={page === 'detector' ? 'active' : ''} href="#detector">
            AI Detector
          </a>

          <div className="nav-group">
            <button
              className={['species', 'compare', 'gallery'].includes(page) ? 'active' : ''}
              onClick={() => setMenu(menu === 'pedia' ? '' : 'pedia')}
              aria-expanded={menu === 'pedia'}
              type="button"
            >
              Snakepedia <ChevronDown size={12} />
            </button>
            {menu === 'pedia' && (
              <div className="dropdown">
                <span className="eyebrow">THE FIELD GUIDE</span>
                <a href="#species" onClick={() => setMenu('')}>
                  <BookOpen size={18} />
                  <span>
                    All Species<small>Kenali setiap spesies</small>
                  </span>
                </a>
                <a href="#compare" onClick={() => setMenu('')}>
                  <GitCompareArrows size={18} />
                  <span>
                    Compare Species<small>Temukan perbedaannya</small>
                  </span>
                </a>
                <a href="#gallery" onClick={() => setMenu('')}>
                  <ImageIcon size={18} />
                  <span>
                    Image Gallery<small>Dunia ular dalam gambar</small>
                  </span>
                </a>
              </div>
            )}
          </div>

          <div className="nav-group">
            <button
              className={['map', 'similar', 'habitats'].includes(page) ? 'active' : ''}
              onClick={() => setMenu(menu === 'explore' ? '' : 'explore')}
              aria-expanded={menu === 'explore'}
              type="button"
            >
              Explore <ChevronDown size={12} />
            </button>
            {menu === 'explore' && (
              <div className="dropdown">
                <span className="eyebrow">GO A LITTLE FURTHER</span>
                <a href="#map" onClick={() => setMenu('')}>
                  <Globe2 size={18} />
                  <span>
                    Distribution Map<small>Jelajahi persebaran</small>
                  </span>
                </a>
                <a href="#similar" onClick={() => setMenu('')}>
                  <GitCompareArrows size={18} />
                  <span>
                    Similar Species<small>Serupa, belum tentu sama</small>
                  </span>
                </a>
                <a href="#habitats" onClick={() => setMenu('')}>
                  <Leaf size={18} />
                  <span>
                    Snake Habitats<small>Kenali rumah mereka</small>
                  </span>
                </a>
              </div>
            )}
          </div>

          <a className={page === 'safety' ? 'active' : ''} href="#safety">
            Safety Guide
          </a>
          <a className={page === 'history' ? 'active' : ''} href="#history">
            History
          </a>
        </nav>

        <div className="header-actions">
          <div className="sa-account">{user?<><span title={user.name}>{user.name}</span><button disabled={signingOut} onClick={()=>void leave()}>{signingOut?'…':'Keluar'}</button></>:<a href="#login">Masuk</a>}{accountError&&<span role="alert">{accountError}</span>}</div>
          <button
            className="icon-button"
            aria-label="Cari spesies"
            onClick={onOpenSearch}
            type="button"
          >
            <Search size={18} />
          </button>
          <a className="button primary small header-scan" href="#detector">
            <ScanLine size={15} /> Identify a snake <ArrowUpRight size={14} />
          </a>
          <button
            className="icon-button mobile-toggle"
            onClick={() => setMobile(!mobile)}
            aria-label="Buka navigasi"
            aria-expanded={mobile}
            type="button"
          >
            {mobile ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {menu && <div className="menu-backdrop" onClick={() => setMenu('')} />}
    </>
  );
}

export { Header };
