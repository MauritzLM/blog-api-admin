import { useState } from "react";
import { Link } from "react-router-dom";

export default function NewPost({ isAuthenticated }) {
    const [postCreated, setPostCreated] = useState(false);

    // error state variables
    const [titleError, setTitleError] = useState('');
    const [authorError, setAuthorError] = useState('');
    const [contentError, setContentError] = useState('');

    // create post handle function*
    async function handleNewPost(event) {
        event.preventDefault();

        try {
            // get form data
            const form = event.target;
            const formData = new FormData(form);

            // fetch request with credentials
            const response = await fetch('http://localhost:3001/admin/posts/new', {
                method: form.method,
                credentials: "include",
                body: formData,
            });

            const data = await response.json();

            // if errors display errors
            if (data.errors) {
                data.errors.forEach(err => {
                    if (err.path === 'title') {
                        setTitleError(err.msg);
                    }
                    if (err.path === 'author') {
                        setAuthorError(err.msg);
                    }
                    if (err.path === 'postContent') {
                        setContentError(err.msg);
                    }

                });
                return;
            }

            // if succcessful
            setPostCreated(true);

        }
        catch (error) {
            console.log(error)
        }
    }

    // change post created state
    function handlePostCreatedChange() {
        setPostCreated(false);
    }

    // conditional rendering
    if (postCreated) {
        return (
            <>
                <h2>Post created</h2>
                <div className="post-created-options">
                    <button onClick={() => handlePostCreatedChange()}>Create another post</button>
                    <Link to="/posts">back to posts</Link>
                </div>
            </>
        )
    }

    else if (isAuthenticated) {
        return (
            <>
                <h2>New blog post</h2>

                <form onSubmit={(e) => handleNewPost(e)} method="post">
                    <label htmlFor="title">Title
                        <input type="text" name="title" id="title" />
                        <span>{titleError}</span>
                    </label>

                    <label htmlFor="author">Author
                        <input type="text" name="author" id="author" />
                        <span>{authorError}</span>
                    </label>

                    <label htmlFor="postContent">Post
                        <textarea name="postContent" id="postContent" cols="30" rows="10" />
                        <span>{contentError}</span>
                    </label>

                    {/* add publish checkbox */}

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