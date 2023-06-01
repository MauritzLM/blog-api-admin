
export default function Login() {
    // already logged in?*
    return (
        <>
            <h2>Login Form</h2>
            <form method="post">
                <div>
                    <label htmlFor="username">username</label>
                    <input type="text" name="username" required></input>
                </div>

                <div>
                    <label htmlFor="password">password</label>
                    <input type="password" name="password" required></input>
                </div>

                <button type="submit">login</button>
            </form>
        </>
    )
}