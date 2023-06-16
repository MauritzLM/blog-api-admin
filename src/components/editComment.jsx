import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function EditComment({ isAuthenticated }) {
    // get comment id and post id from params
    const { commentid, id } = useParams();

    // comment updated state
    const [commentUpdated, setCommentUpdated] = useState(false);
    //  comment removed state
    const [commentRemoved, setCommentRemoved] = useState(false)

    // comment object state
    const [commentFormValues, setCommentFormValues] = useState({ author: '', body: '' });

    // form errors state
    const [commentAuthorError, setCommentAuthorError] = useState('');
    const [commentBodyError, setCommentBodyError] = useState('');

    const [commentRemoveError, setCommentRemoveError] = useState('');


    // fetch post and update state
    async function getComment() {
        try {
            // fetch request with credentials
            const response = await fetch(`http://localhost:3001/admin/posts/${id}`, {
                method: "GET",
                credentials: "include",
            });

            const postData = await response.json();

            // get comment
            const commentsArr = postData.comments;

            const commentObj = commentsArr.find(element => element._id === commentid);

            // set state
            setCommentFormValues({ ...commentObj });

        }
        catch (error) {
            console.log(error);
        }
    };

    // handle comment update
    async function handleUpdateComment(event) {
        event.preventDefault();

        try {
            // get form data
            const form = event.target;
            const formData = new FormData(form);

            // fetch request with credentials
            const response = await fetch(`http://localhost:3001/admin/posts/${id}/comments/${commentid}`, {
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

            setCommentUpdated(true);
        }
        catch (error) {
            console.log(error);
        }
    };

    // handle remove comment submit* 
    async function handleRemoveComment(event) {
        event.preventDefault();
        try {

            // get form data
            const form = event.target;
            const formData = new FormData(form);

            // send fetch request
            // fetch request with credentials
            const response = await fetch(`http://localhost:3001/admin/posts/${id}/comments/${commentid}/delete`, {
                method: form.method,
                credentials: "include",
                body: formData,
            });

            const data = await response.json();
            // validation errors
            if (data.errors) {
                setCommentRemoveError(data.errors[0].msg);
                return
            };

            // update state if successful
            setCommentRemoved(true);

        }
        catch (error) {
            console.log(error);
        }
    }

    // get comment on page load
    useEffect(() => {
        getComment();
    }, []);


    if (commentRemoved && isAuthenticated) {
        return (
            <>
                <h2>Comment removed</h2>
                <Link to={`/posts/${id}/comments`}>back to comments</Link>
            </>
        )
    } else if (commentUpdated && isAuthenticated) {
        return (
            <>
                <h2>Comment updated</h2>
                <Link to={`/posts/${id}/comments`}>back to comments</Link>
            </>
        )
    } else if (isAuthenticated) {
        return (
            <>
                <h2>Page to edit comment {commentid}</h2>
                <EditCommentForm handleUpdateComment={handleUpdateComment} commentFormValues={commentFormValues} setCommentFormValues={setCommentFormValues} commentAuthorError={commentAuthorError} commentBodyError={commentBodyError} />
                <RemoveCommentForm handleRemoveComment={handleRemoveComment} commentRemoveError={commentRemoveError} />
            </>
        )
    } else {
        <>
            <h2>Unauthorized</h2>
        </>
    }
};

// comment edit form
function EditCommentForm({ handleUpdateComment, commentFormValues, setCommentFormValues, commentAuthorError, commentBodyError }) {
    return (
        <>
            <form method="post" onSubmit={(e) => handleUpdateComment(e)}>
                <label htmlFor="commentAuthor">
                    <input type="text" name="commentAuthor" value={commentFormValues.author} onChange={(e) => setCommentFormValues({ ...commentFormValues, author: e.target.value })}></input>
                    <span>{!commentFormValues.author ? commentAuthorError : ""}</span>
                </label>

                <label htmlFor="commentBody">
                    <textarea name="commentBody" cols="30" rows="10" value={commentFormValues.body} onChange={(e) => setCommentFormValues({ ...commentFormValues, body: e.target.value })} />
                    <span>{!commentFormValues.body ? commentBodyError : ""}</span>
                </label>

                <button type="submit">Update comment</button>
            </form>
        </>
    )
};

// remove comment form
function RemoveCommentForm({ handleRemoveComment, commentRemoveError }) {
    return (
        <>
            <form onSubmit={(e) => handleRemoveComment(e)} method="post">
                <label htmlFor="admincode">enter admin code
                    <input type="password" name="admincode"></input>
                    <span>{commentRemoveError}</span>
                </label>
                <button type="submit">Remove comment</button>
            </form>
        </>
    )
};