import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
const relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

export default function Comments({ isAuthenticated }) {

    // post id
    const { id } = useParams();

    // post object
    const [post, setPost] = useState({});

    // form values
    const [commentFormValues, setCommentFormValues] = useState({ name: '', body: '' });

    // validation errors
    const [commentAuthorError, setCommentAuthorError] = useState('');
    const [commentBodyError, setCommentBodyError] = useState('');


    // fetch post
    async function getComments() {

        try {
            // fetch request to get post
            const response = await fetch(`http://localhost:3001/admin/posts/${id}`, {
                method: 'GET',
                credentials: "include",
            });
            // if errors*
            const postData = await response.json();

            if (postData.error) {
                console.log(postData.error.msg);
            };

            // update state
            setPost({ ...postData });
        }
        catch (error) {
            console.log(error)
        }
    };

    // create new comment function*
    async function handleCommentCreate(event) {

        event.preventDefault();

        try {
            // get form data*
            const form = event.target;
            const formData = new FormData(form);

            // fetch request with credentials
            const response = await fetch(`http://localhost:3001/admin/posts/${id}/comments`, {
                method: form.method,
                credentials: "include",
                body: formData,
            });

            const data = await response.json();

            // validation errors
            if (data.errors) {
                data.errors.forEach(err => {
                    if (err.path === "commentAuthor") {
                        setCommentAuthorError(err.msg);
                    }
                    if (err.path === "commentBody") {
                        setCommentBodyError(err.msg);
                    }
                });
                return;
            };

            // update form input state (to reset form values)
            setCommentFormValues({ name: '', body: '' });

            // fetch updated post
            const fetchPost = await fetch(`http://localhost:3001/admin/posts/${id}`, {
                method: 'GET',
                credentials: "include",
            });

            const updatedPost = await fetchPost.json();

            // update state
            setPost({ ...updatedPost });

        }
        catch (error) {
            console.log(error);
        }
    };


    // get all comments
    useEffect(() => {
        getComments();
    }, []);


    // create list of comments
    if (isAuthenticated) {
        return (
            <>
                <h2>Viewing comments of {post.title} by {post.author}</h2>
                <Link to={`/posts/${id}`}>back to post</Link>
                <div className="comment-container">
                    {post.comments?.map(comment => {
                        return <CommentCard comment={comment} key={comment._id} postid={id} />
                    })}
                </div>
                <h3>Add new comment</h3>
                <CreateCommentForm handleCommentCreate={handleCommentCreate} commentFormValues={commentFormValues} setCommentFormValues={setCommentFormValues} commentAuthorError={commentAuthorError} commentBodyError={commentBodyError} />
            </>
        )
    }
};


// create comment form
function CreateCommentForm({ handleCommentCreate, commentFormValues, setCommentFormValues, commentAuthorError, commentBodyError }) {

    return (
        <>
            <form onSubmit={(e) => handleCommentCreate(e)} method="post" noValidate>
                <label htmlFor="commentAuthor">name
                    <input type="text" name="commentAuthor" id="commentAuthor" value={commentFormValues.name} onChange={(e) => setCommentFormValues({ ...commentFormValues, name: e.target.value })}></input>
                    <span>{!commentFormValues.name ? commentAuthorError : ""}</span>
                </label>

                <label htmlFor="commentBody">
                    <textarea name="commentBody" id="commentBody" cols="30" rows="10" value={commentFormValues.body} onChange={(e) => setCommentFormValues({ ...commentFormValues, body: e.target.value })} />
                    <span>{!commentFormValues.body ? commentBodyError : ""}</span>
                </label>

                <button type="submit">Post comment</button>
            </form>
        </>
    )
};

// comment card*
function CommentCard({ comment, postid }) {
    return (
        <>
            <div className="comment-card">
                <p>{comment.body}</p>
                <p>{comment.author}</p>
                <p>{dayjs(comment.timestamp).fromNow()}</p>
                <Link to={`/posts/${postid}/comments/${comment._id}`}>edit</Link>
            </div>
        </>
    )
};