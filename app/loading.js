import Image from 'next/image';
import LoadImage from '../public/images/Black-logo.gif';

export default function Loading() {
  return (
    <div className="main-loader">
      <div style={{ width: 'auto', height: '100px' }}>
        <Image src={LoadImage} width={200} height={100} alt="Loading" />
      </div>
    </div>
  );
}
