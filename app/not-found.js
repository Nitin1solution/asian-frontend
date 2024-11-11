import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div style={{display:'flex',flexDirection:'column',justifyContent:'center',gap:'30px',alignItems:'center',marginTop:'200px',marginBottom:'200px'}}>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}