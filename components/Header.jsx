import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <>
            <header className="main-header">

                <div className="bottom-header-1">
                    <div className="container">
                        <div className="main-header-wapper">
                            <div className="site-logo">
                                <Link href="/" >
                                    {/* <Image src="/images/White logo.gif" alt="" width={250} height={30} /> */}
                                        <Image src="/images/White logo.gif" alt="White logo" width={250} height={30} unoptimized />
                                </Link>

                            </div>
                            <div className="main-header-info">
                                <div className="header-menu-wrap ">
                                    <ul className="nav-menu">
                                        <li>
                                            <Link href="" data-text="Newsroom" className="open-sans">Newsroom</Link>
                                            <ul>
                                                <li className="bg-hover-black"><Link href="ads-reporting"
                                                    className="open-sans">AD Reporting</Link></li>
                                                <li className="bg-hover-black"><Link href="members-dispatch"
                                                    className="open-sans">Member Dispatch</Link>
                                                </li>
                                                <li className="bg-hover-black"><Link href="#" className="open-sans">Topics <span
                                                    style={{ paddingLeft: '57px' }}> &#8594;</span></Link>
                                                    <ul>
                                                        <li className="bg-hover-black"><Link href="category/13"
                                                            className="open-sans">Climate
                                                            change</Link></li>
                                                        <li className="bg-hover-black"><Link href="category/10"
                                                            className="open-sans">People Right's</Link></li>
                                                        <li className="bg-hover-black"><Link href="category/5"
                                                            className="open-sans">Science &
                                                            Technology</Link></li>
                                                        <li className="bg-hover-black"><Link href="category/11"
                                                            className="open-sans">Health</Link></li>
                                                        <li className="bg-hover-black"><Link href="category/9"
                                                            className="open-sans">Politics &
                                                            Governance</Link></li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>

                                        <li>
                                            <Link href="" data-text="
                            About Us"
                                                className="open-sans">About Us</Link>
                                            <ul>
                                                <li className="bg-hover-black"><Link href="who-we-are"
                                                    className="open-sans">Who we are
                                                </Link></li>
                                                <li className="bg-hover-black"><Link href="our-team"
                                                    className="open-sans">Our team</Link></li>
                                                <li className="bg-hover-black"><Link href="contact-us"
                                                    className="open-sans">contact us</Link></li>
                                                <li className="bg-hover-black"><Link href="work-with-us"
                                                    className="open-sans">Work with us </Link></li>
                                                <li className="bg-hover-black"><Link href="press"
                                                    className="open-sans">Press</Link></li>
                                            </ul>
                                        </li>
                                        <li>
                                            <Link href="#" data-text="Network" className="open-sans">Network</Link>
                                            <ul>
                                                <li className="bg-hover-black"><Link href="members"
                                                    className="open-sans">Members</Link></li>
                                            </ul>
                                        </li>
                                    </ul>



                                </div>

                                <div className="menu-right-item">

                                    <button className="mobile-menu-action">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div >

            </header >
        </>
    );
}
