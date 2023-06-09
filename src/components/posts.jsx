import { Link } from "react-router-dom"
import { useEffect } from "react";
import { useState } from "react";

export default function Posts({ isAuthenticated }) {
    const [posts, setPosts] = useState([]);

    // fetch all posts function and update state
    async function getPosts() {
        try {
            const response = await fetch('http://localhost:3001/admin/posts', {
                method: 'GET',
                credentials: 'include'
            });

            const allPosts = await response.json();

            setPosts([...allPosts]);
        }
        catch (error) {
            console.log(error);
        }
    };

    // run function 
    useEffect(() => {
        getPosts();
    }, []);

    // render list of posts
    const postsDisplay = posts.map(post => {
        return <li key={post._id}>
            <Link to={`/posts/${post._id}`}>{post.title}</Link> <span>({post.published ? 'published' : 'not published'})</span>
            <p >by {post.author} posted on {post.date}</p>
        </li>
    });

    // logged in?
    if (isAuthenticated) {

        return (
            <>
                <h2>Posts</h2>
                <Link to='/posts/new'>New post</Link>
                <h3>Edit post:</h3>
                <ol>{postsDisplay}</ol>
            </>
        )
    } else {
        return (
            <>
                <h2>Unauthorized</h2>
            </>
        )
    }
};