import { ArrowUpRight } from 'lucide-react';
import SnakeIcon from '../ui/SnakeIcon';

export default function Footer() {
  return (
    <footer className="footer content">
      <a className="brand" href="#home">
        <SnakeIcon size={25} />
        <span>serpenta.</span>
      </a>
      <p>Observe. Understand. Coexist.</p>
      <div>
        <a href="#safety">
          Safety first <ArrowUpRight size={13} />
        </a>
        <span>INDONESIA · FIELD GUIDE</span>
      </div>
    </footer>
  );
}

export { Footer };
