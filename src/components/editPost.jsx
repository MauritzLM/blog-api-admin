import { useParams } from "react-router-dom";

export default function EditPost({ isAuthenticated }) {
    const { id } = useParams();
    // make fetch request to get post details(id)*

    if (isAuthenticated) {
        return (
            <>
                <h2>Page to edit or delete post {id}</h2>
            </>
        )
    }
};