import { useParams } from "react-router-dom";

export default function Comments({ isAuthenticated }) {

    const { id } = useParams();

    // fetch comments of post*

    // create new comment*

    // update comment*

    // delete comment*

    // create list of comments
    return (
        <>
            <h2>Viewing comments of post {id}</h2>
        </>
    )
};


// create way to display individual comments*