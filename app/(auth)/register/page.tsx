import { registerEmail } from "@/lib/actions/register.action";

export default function Register() {
    return (
        <form action={registerEmail}>
            <input name="email" />
            <input name="password" type="password" />
            <input name="firstName" />
            <input name="lastName" />
            <button type="submit">Register</button>
        </form>
    )
}
