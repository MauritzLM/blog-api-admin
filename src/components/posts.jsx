import { Link } from "react-router-dom"

export default function Posts({ isAuthenticated }) {

    // fetch posts*

    // logged in?
    if (isAuthenticated) {
        return (
            <>
                <h2>Posts</h2>
                <Link to='/posts/new'>New post</Link>
                <p>Edit</p>
            </>
        )
    } else {
        return (
            <>
                <h2>Unauthorized</h2>
            </>
        )
    }

}