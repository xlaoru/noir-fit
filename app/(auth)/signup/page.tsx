import { registerEmail } from "@/lib/actions/register.action";

export default function Register() {
    return (
        <section className="min-h-[70vh] flex items-center justify-center">
            <div className="w-full max-w-[460px]">
                <form
                    action={registerEmail}
                    className="flex flex-col gap-5 p-6 bg-zinc-950 border border-zinc-800 rounded-md"
                >
                    <h2 className="text-left">
                        Sign Up
                    </h2>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1">
                            <label
                                htmlFor="firstName"
                                className="text-sm text-zinc-400"
                            >
                                First name
                            </label>
                            <input
                                name="firstName"
                                placeholder="John"
                                required
                                className="h-11 px-3 bg-zinc-900 border border-zinc-800 rounded-sm text-zinc-100
                                       placeholder:text-zinc-500
                                       focus:outline-none focus:border-zinc-600"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label
                                htmlFor="lastName"
                                className="text-sm text-zinc-400"
                            >
                                Last name
                            </label>
                            <input
                                name="lastName"
                                placeholder="Doe"
                                required
                                className="h-11 px-3 bg-zinc-900 border border-zinc-800 rounded-sm text-zinc-100
                                       placeholder:text-zinc-500
                                       focus:outline-none focus:border-zinc-600"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="email"
                            className="text-sm text-zinc-400"
                        >
                            Email
                        </label>
                        <input
                            name="email"
                            type="email"
                            placeholder="example@mail.com"
                            required
                            className="h-11 px-3 bg-zinc-900 border border-zinc-800 rounded-sm text-zinc-100
                                   placeholder:text-zinc-500
                                   focus:outline-none focus:border-zinc-600"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="password"
                            className="text-sm text-zinc-400"
                        >
                            Password
                        </label>
                        <input
                            name="password"
                            type="password"
                            placeholder="********"
                            required
                            className="h-11 px-3 bg-zinc-900 border border-zinc-800 rounded-sm text-zinc-100
                                   placeholder:text-zinc-500
                                   focus:outline-none focus:border-zinc-600"
                        />
                    </div>
                    <button
                        type="submit"
                        className="cursor-pointer mt-2 h-11 bg-zinc-100 text-zinc-950 font-semibold rounded-sm
                                   hover:bg-zinc-300 transition-colors"
                    >
                        Submit
                    </button>
                    <p className="text-sm text-zinc-400 text-center">
                        Already have an account?{" "}
                        <a
                            href="/login"
                            className="text-zinc-100 hover:underline underline-offset-4"
                        >
                            Log in
                        </a>
                    </p>
                </form>
            </div>
        </section>
    );
}
