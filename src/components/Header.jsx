import Link from "next/link";
import '@/app/globals.css'
export default function Header(){
    return(
        
            <header className="head-mainbox">
                <p>Stock <span className="head-logo">Manager</span></p>
                <div className="head-navbox">
                    <nav className="head-navbar">
                        <ul>
                            <li className="head-link"><Link href= "/" >Home</Link></li>
                            <li className="head-link"><Link href= "/increment" >Increment</Link></li>
                            <li className="head-link"><Link href= "/decrement" >Decrement</Link></li>
                            {/* <li className="head-link"><Link href= "/products" >Product lists</Link></li> */}
                        </ul>
                    </nav>
                </div>
            </header>
        
    )
}