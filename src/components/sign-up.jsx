import { useState } from "react"

export default function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [adminCode, setAdminCode] = useState('');
    // user logged in?*

    // handle form submit
    async function handleSubmit(event) {

        event.preventDefault();
        // get form data
        const form = event.target;
        const formData = new FormData(form);

        try {

            const response = await fetch('http://localhost:3001/admin/signup', {
                method: form.method, body: formData
            })
            const data = await response.json();

            // if validation errors
            if (data.errors) {
                data.errors.forEach(err => {
                    console.log(err.msg);
                });
            } else {
                console.log("admin created!")
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <h2>Sign up form</h2>
            <form method="post" action="http://localhost:3001/admin/signup" onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label htmlFor="username">username
                        <input type="text" name="username" id="username" value={username} onChange={(e) => { setUsername(e.target.value) }} required></input>
                    </label>
                </div>

                <div>
                    <label htmlFor="password">password
                        <input type="password" name="password" id="password" value={password} onChange={(e) => { setPassword(e.target.value) }} required></input>
                    </label>
                </div>

                <div>
                    <label htmlFor="email">email
                        <input type="email" name="email" id="email" value={email} onChange={(e) => { setEmail(e.target.value) }} required></input>
                    </label>
                </div>

                <div>
                    <label htmlFor="admincode">enter admin code
                        <input type="password" name="admincode" id="admincode" value={adminCode} onChange={(e) => { setAdminCode(e.target.value) }} required></input>
                    </label>
                </div>

                <button type="submit" >Sign up</button>
            </form>
        </>
    )
}