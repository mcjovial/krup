import Image from 'next/image';
import Link from 'next/link';
import Logo from '../public/images/logo.png';

const Navbar = () => {
  return (
    <div className=' bg-transparent backdrop-blur absolute w-full'>
      <nav className="w-full flex items-center justify-between container mx-auto px-4 py-5">
          <a className=''>
            <Image className='items-center px-4 py-2 h-12' src={Logo} alt="Logo" />
          </a>
          <div className="text-sm text-slate-700">
            <a className='mr-4 mt-4'>About</a>
            <a className='mr-4 mt-4'>Features</a>
            <Link href='/register' className='mr-4 mt-4 hover:text-green-600'>Register</Link>
            <Link href='/login' className='mr-4 mt-4 hover:text-green-600'>Login</Link>
          </div>
      </nav>
    </div>
  )
}

export default Navbar