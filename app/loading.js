import Image from 'next/image';
import LoadImage from '../public/images/Black-logo.gif';
import RemoveActiveClass from '@/components/RemoveActiveClass';

export default function Loading() {
  return (
    <div className="main-loader">
      <RemoveActiveClass/>
      {/* <div style={{ width: 'auto', height: '70px' }}>
        <Image src={LoadImage} width={200} height={100} alt="Loading" />
      </div> */}
    </div>
  );
}
