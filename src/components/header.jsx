
import { Link } from "react-router-dom"

export default function Header({ isAuthenticated }) {
    if (isAuthenticated) {
        return (
            <>
                <header>
                    <nav>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/signup">Sign up</Link></li>
                            <li><Link to="/posts">Posts</Link></li>
                        </ul>
                    </nav>
                </header>
            </>
        )
    } else {
        return (
            <header>
                <nav>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Sign up</Link></li>
                    </ul>
                </nav>
            </header>
        )
    }
};