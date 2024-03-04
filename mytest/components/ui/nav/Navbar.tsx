import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { options } from '@/context/options';

const Navbar = async () => {
  const session = await getServerSession(options);

  return (
    <div className='flex justify-between items-center gap-5 bg-slate-500'>
        <h2>My Site</h2>
        <div className='flex justify-between items-center gap-5'>
            <Link href="/">Home</Link>
            <Link href="/member">Member</Link>
            <Link href="/memberclient">MemberClient</Link>
        </div>
        <div>
          { session && (<Link href="/api/auth/signout?callbackUrl=/">Logout</Link>) }
        </div>
    </div>
  );
}

export default Navbar;