import Image from 'next/image';
import Logo from '../public/images/logo.png';

const Navbar = () => {
  return (
    <div className=' bg-gradient-to-r from-white to-green-50'>
      <nav className="w-full flex items-center justify-between container mx-auto px-4 py-5">
          <a className=''>
            <Image className='items-center px-4 py-2 h-12' src={Logo} alt="Logo" />
          </a>
          <div className="text-sm text-slate-700">
            <a className='mr-4 mt-4'>About</a>
            <a className='mr-4 mt-4'>Features</a>
            <a className='mr-4 mt-4'>Company</a>
            <a className='mr-4 mt-4'>Contact</a>
          </div>
      </nav>
    </div>
  )
}

export default Navbar