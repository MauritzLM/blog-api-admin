import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Comments({ isAuthenticated }) {

    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [comments, setComments] = useState([]);

    // fetch post
    async function getComments() {

        try {
            // fetch request* (better to get post or just comments? - need post title/author) 
            const response = await fetch(`http://localhost:3001/admin/posts/${id}/comments`, {
                method: 'GET',
                credentials: "include",
            });
            // if errors*
            const post = await response.json();


            // update comments state* (better way to do it?)
            setComments([...post.comments]);
            setTitle(post.title);
            setAuthor(post.author);
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

            // errors*
            if (data.errors) {
                data.errors.forEach(err => {
                    console.log(err.msg);
                });
                return;
            };

            // success* (comment added message?)
            console.log(data)

        }
        catch (error) {
            console.log(error);
        }
    };

    // get all comments on mount (how to update when new comment posted?)*
    useEffect(() => {
        getComments();
    }, []);

    // update comment function*(edit comment component - to edit or remove)

    // delete comment function*

    // create list of comments
    if (isAuthenticated) {
        return (
            <>
                <h2>Viewing comments of {title} by {author}</h2>
                <Link to={`/posts/${id}`}>back to post</Link>
                <div className="comment-container">
                    {comments.map(comment => {
                        return <CommentCard comment={comment} />
                    })}
                </div>
                <h3>Add new comment</h3>
                <CreateCommentForm handleCommentCreate={handleCommentCreate} />
            </>
        )
    }
};


// create comment form
function CreateCommentForm({ handleCommentCreate }) {
    return (
        <>
            <form onSubmit={(e) => handleCommentCreate(e)} method="post" noValidate>
                <label htmlFor="commentAuthor">name
                    <input type="text" name="commentAuthor" id="commentAuthor"></input>
                </label>

                <label htmlFor="commentBody">
                    <textarea name="commentBody" id="commentBody" cols="30" rows="10" />
                </label>

                <button type="submit">Post comment</button>
            </form>
        </>
    )
};

// comment card*
function CommentCard({ comment }) {
    return (
        <>
            <div className="comment-card">
                <p>{comment.body}</p>
                <p>{comment.author}</p>
                <p>{comment.timestamp}</p>
                {/* <Link to={`/posts/${id}/comments/${comment._id}`}>edit</Link> */}
            </div>
        </>
    )
};