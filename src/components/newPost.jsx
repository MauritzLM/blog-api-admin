import { useState } from "react";
import { Link } from "react-router-dom";

export default function NewPost({ isAuthenticated }) {
    const [postCreated, setPostCreated] = useState(false);

    // error state variables*

    // create post handle function*
    async function handleNewPost(event) {
        event.preventDefault();

        try {
            // get form data
            const form = event.target;
            const formData = new FormData(form);

            // fetch request with credentials*
            const response = await fetch('http://localhost:3001/admin/posts/new', {
                method: form.method,
                credentials: "include",
                body: formData,
            });

            const data = await response.json();

            // if errors display errors*
            if (data.errors) {
                data.errors.forEach(err => {
                    console.log(err);
                    return;
                });
            }

            // if
            console.log(data);

        }
        catch (error) {
            console.log(error)
        }

    }
    if (postCreated) {
        return (
            <>
                <h2>Post created</h2>
                <Link to="/posts">back to posts</Link>
            </>
        )
    }

    else if (isAuthenticated) {
        return (
            <>
                <h2>New blog post</h2>

                <form onSubmit={(e) => { handleNewPost(e) }} method="post">
                    <label htmlFor="title">Title
                        <input type="text" name="title" id="title" />
                    </label>

                    <label htmlFor="author">Author
                        <input type="text" name="author" id="author" />
                    </label>

                    <label htmlFor="postContent"></label>
                    <textarea name="postContent" id="postContent" cols="30" rows="10"></textarea>

                    <button type="submit">submit</button>
                </form>
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