import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function EditComment() {
    const { commentid, id } = useParams();

    // comment object
    const [commentFormValues, setCommentFormValues] = useState({ author: '', body: '' });

    // form errors
    const [commentAuthorError, setCommentAuthorError] = useState('');
    const [commentBodyError, setCommentBodyError] = useState('');


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
            // fetch post
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
        }
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getComment();
    }, []);

    return (
        <>
            <h2>Page to edit comment {commentid}</h2>
            <EditCommentForm handleUpdateComment={handleUpdateComment} commentFormValues={commentFormValues} setCommentFormValues={setCommentFormValues} commentAuthorError={commentAuthorError} commentBodyError={commentBodyError} />
        </>
    )
};

// comment edit form*
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