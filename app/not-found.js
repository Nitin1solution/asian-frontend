import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div style={{display:'flex',flexDirection:'column',justifyContent:'center',gap:'30px',alignItems:'center',marginTop:'200px',marginBottom:'200px'}}>
      <div style={{fontSize:'100px',fontWeight:'600',letterSpacing:'5px',margin:'50px'}} className='parata'>404</div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}