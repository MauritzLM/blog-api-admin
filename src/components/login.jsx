import { useState } from "react"

export default function Login({ isAuthenticated, handleAuthenticated }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // errors
    const [loginStatus, setLoginStatus] = useState('');

    // handle login 
    async function handleLogin(event) {
        event.preventDefault();

        // get form data
        const form = event.target;
        const formData = new FormData(form);

        try {
            const response = await fetch('http://localhost:3001/admin/login', {
                method: form.method,
                body: formData,
            });

            const data = await response.json();

            setLoginStatus(data.msg)

            // successfully logged in
            if (data.authenticated) {
                handleAuthenticated();

                // redirect to homepage*
                return;
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    // already logged in?

    if (isAuthenticated) {
        return (
            <>
                <h2>You are logged in!</h2>
            </>
        )
    } else {
        return (
            <>
                <h2>Login Form</h2>
                <form method="post" onSubmit={(e) => handleLogin(e)} noValidate>
                    <div>
                        <label htmlFor="username">username
                            <input type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required></input>
                        </label>
                    </div>

                    <div>
                        <label htmlFor="password">password
                            <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required></input>
                        </label>

                    </div>
                    <span>{loginStatus}</span>

                    <button type="submit">login</button>
                </form>
            </>
        )
    }
}