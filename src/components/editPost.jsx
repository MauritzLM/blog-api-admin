import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function EditPost({ isAuthenticated }) {
    // get post id from params
    const { id } = useParams();

    const [post, setPost] = useState({});


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

    // run function 
    useEffect(() => {
        getPost();
    }, []);

    // implement function to update post*
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

            // if validation errors*
            if (data.errors) {
                data.errors.forEach(err => {
                    console.log(err.msg);
                });
            };

            // if updated successfully*

        }
        catch (error) {
            console.log(error);
        }
    }

    if (isAuthenticated) {
        return (
            <>
                <h2>Page to edit or delete post {id}</h2>

                <form onSubmit={(e) => handlePostUpdate(e)} method="post">
                    <label htmlFor="title">
                        <input type="text" name="title" id="title" value={post.title} />
                    </label>

                    <label htmlFor="author">
                        <input type="text" name="author" id="author" value={post.author} />
                    </label>

                    <label htmlFor="postContent">
                        <textarea className="text-area-edit" name="postContent" id="postContent" value={post.body} />
                    </label>

                    <label htmlFor="publish">publish
                        <input type="checkbox" name="publish" id="publish" />
                    </label>

                    <button type="submit">Update post</button>
                </form>
            </>
        )
    }
};