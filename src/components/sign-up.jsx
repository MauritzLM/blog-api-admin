// import { useEffect } from "react"

export default function Signup() {
    // user logged in?*

    // errors?*

    // handle form submit
    function handleSubmit() {
        // post request to localhost:3001/admin/signup
    }
    return (
        <>
            <h2>Sign up form</h2>
            <form method="post">
                <div>
                    <label htmlFor="username">username</label>
                    <input type="text" name="username" required></input>
                </div>

                <div>
                    <label htmlFor="password">password</label>
                    <input type="password" name="password" required></input>
                </div>

                <div>
                    <label htmlFor="email">email</label>
                    <input type="email" name="email" required></input>
                </div>

                <div>
                    <label htmlFor="admincode">enter admin code</label>
                    <input type="password" name="admincode" required></input>
                </div>

                <button type="submit">Sign up</button>
            </form>
        </>
    )
}