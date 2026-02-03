import { logInEmail } from "@/lib/actions/log-in.action";

export default function LogIn() {
    return (
        <form action={logInEmail}>
            <input name="email" />
            <input name="password" type="password" />
            <button type="submit">Log In</button>
        </form>
    )
}
