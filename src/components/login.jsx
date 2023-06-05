import { useState } from "react"
import Cookies from "js-cookie";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // errors
    const [loginStatus, setLoginStatus] = useState('');


    async function handleLogin(event) {
        event.preventDefault();

        // get form data
        const form = event.target;
        const formData = new FormData(form);

        try {
            const response = await fetch('http://localhost:3001/admin/login', {
                method: form.method, body: formData
            });

            const data = await response.json();

            // pass token as header to access secure routes*
            // const token = Cookies.get('token');

            // update logged in state* 
            console.log(Cookies.get('token'));

            setLoginStatus(data.msg);
        }
        catch (error) {
            console.log(error);
        }
    }
    // already logged in?*

    // login post request

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