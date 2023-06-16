import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function EditPost({ isAuthenticated }) {
    // get post id from params
    const { id } = useParams();

    // set initial state of inputs
    const [post, setPost] = useState({ title: '', author: '', body: '', published: '' });

    // post updated state
    const [postUpdated, setPostUpdated] = useState(false);

    // post removed state
    const [postRemoved, setPostRemoved] = useState(false);

    // validation errors
    // update form
    const [titleError, setTitleError] = useState('');
    const [authorError, setAuthorError] = useState('');
    const [contentError, setContentError] = useState('');

    // remove form
    const [removePostError, setRemovePostError] = useState('');


    // make fetch request to get post
    async function getPost() {

        try {
            // fetch request with credentials
            const response = await fetch(`http://localhost:3001/admin/posts/${id}`, {
                method: "GET",
                credentials: "include",
            });

            const postData = await response.json();

            // set post state with postData
            setPost({ ...postData });

        }
        catch (error) {
            console.log(error);
        }
    };

    // run get post function
    useEffect(() => {
        getPost();
    }, []);

    //  function to handle post update
    async function handlePostUpdate(event) {
        event.preventDefault();

        // get form data
        try {
            const form = event.target;
            const formData = new FormData(form);

            // fetch request with credentials
            const response = await fetch(`http://localhost:3001/admin/posts/${id}`, {
                method: form.method,
                credentials: "include",
                body: formData,
            });

            const data = await response.json();

            // if validation errors
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
            };

            // if updated successfully
            setPostUpdated(true);

        }
        catch (error) {
            console.log(error);
        }
    }

    // function to handle removing post
    async function handlePostRemove(event) {
        event.preventDefault();
        try {
            // get form data
            const form = event.target;
            const formData = new FormData(form);

            // post request
            const response = await fetch(`http://localhost:3001/admin/posts/${id}/delete`, {
                method: form.method,
                credentials: "include",
                body: formData,
            });

            const data = await response.json();

            // validation errors
            if (data.errors) {
                setRemovePostError(data.errors[0].msg)
                return;
            }

            // success - change state
            setPostRemoved(true);
        }
        catch (error) {
            console.log(error)
        }
    }


    if (postUpdated && isAuthenticated) {
        return (
            <>
                <h2>Post updated</h2>
                <Link to='/posts'>Back to posts</Link>
            </>
        )
    } else if (postRemoved && isAuthenticated) {
        return (
            <>
                <h2>Post removed</h2>
                <Link to='/posts'>Back to posts</Link>
            </>
        )
    } else if (isAuthenticated) {
        return (
            <>
                <h2>Editing {post.title} by {post.author}</h2>

                {/* update post form*/}
                <form onSubmit={(e) => handlePostUpdate(e)} method="post" className="update-post-form">

                    <label htmlFor="title">
                        <input type="text" name="title" id="title" value={post.title} onChange={(e) => setPost({ ...post, title: e.target.value })} />
                        <span>{!post.title ? titleError : ''}</span>
                    </label>

                    <label htmlFor="author">
                        <input type="text" name="author" id="author" value={post.author} onChange={(e) => setPost({ ...post, author: e.target.value })} />
                        <span>{!post.author ? authorError : ''}</span>
                    </label>

                    <label htmlFor="postContent">
                        <textarea className="text-area-edit" name="postContent" id="postContent" value={post.body} onChange={(e) => setPost({ ...post, body: e.target.value })} />
                        <span>{!post.body ? contentError : ''}</span>
                    </label>

                    <label htmlFor="publish">publish post
                        <input type="checkbox" name="publish" id="publish" checked={post.published} onChange={(e) => setPost({ ...post, published: post.published ? false : true })} />
                    </label>

                    <button type="submit">Update post</button>

                </form>

                <Link to={`/posts/${id}/comments`}>View comments</Link>

                {/* remove post form */}
                <form onSubmit={(e) => handlePostRemove(e)} method="post" className="remove-post-form">

                    <label htmlFor="admincode">admin code
                        <input type="password" name="admincode"></input>
                        <span>{removePostError}</span>
                    </label>

                    <button type="submit">Remove post</button>

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