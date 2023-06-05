import { useState } from "react"
import { Link } from "react-router-dom";

export default function Signup() {
    // form inputs
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [adminCode, setAdminCode] = useState('');

    // error messages
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [adminCodeError, setAdminCodeError] = useState('');

    // email Regex
    const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");

    const [adminCreated, setAdminCreated] = useState(false);
    // user already logged in?*

    // handle form submit
    async function handleSubmit(event) {

        event.preventDefault();
        // get form data
        const form = event.target;
        const formData = new FormData(form);

        try {

            const response = await fetch('http://localhost:3001/admin/signup', {
                method: form.method, body: formData
            });
            const data = await response.json();

            // if validation errors
            if (data.errors) {
                data.errors.forEach(err => {
                    // display errors
                    if (err.path === 'username') {
                        setUsernameError(err.msg);
                    }
                    if (err.path === 'password') {
                        setPasswordError(err.msg);
                    }
                    if (err.path === 'email') {
                        setEmailError(err.msg);
                    }
                    if (err.path === 'admincode') {
                        setAdminCodeError(err.msg);
                    }

                });
            } else {
                // display result* (change state if succesful / admin created, link to login page)
                setAdminCreated(true);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    if (adminCreated) {
        return (
            <AdminCreated />
        )
    } else {
        return (
            <>
                <h2>Sign up form</h2>
                <form method="post" action="http://localhost:3001/admin/signup" onSubmit={(e) => handleSubmit(e)} noValidate>
                    <div>
                        <label htmlFor="username">username
                            <input type="text" name="username" id="username" value={username} onChange={(e) => { setUsername(e.target.value) }} required></input>
                            <span className="error">{username === '' ? usernameError : ''}</span>
                        </label>
                    </div>

                    <div>
                        <label htmlFor="password">password
                            <input type="password" name="password" id="password" value={password} onChange={(e) => { setPassword(e.target.value) }} required></input>
                            <span className="error">{password === '' || password.length < 8 ? passwordError : ''}</span>
                        </label>
                    </div>

                    <div>
                        <label htmlFor="email">email
                            <input type="email" name="email" id="email" value={email} onChange={(e) => { setEmail(e.target.value) }} required></input>
                            <span className="error">{emailRegex.test(email) ? '' : emailError}</span>
                        </label>
                    </div>

                    <div>
                        <label htmlFor="admincode">enter admin code
                            <input type="password" name="admincode" id="admincode" value={adminCode} onChange={(e) => { setAdminCode(e.target.value) }} required></input>
                            <span className="error">{adminCodeError}</span>
                        </label>
                    </div>

                    <button type="submit" >Sign up</button>
                </form>
            </>
        )
    }
}

// successfully created admin component
function AdminCreated() {
    return (
        <>
            <h2>Admin Created!</h2>
            <Link to='/login'>login</Link>
        </>
    )
}