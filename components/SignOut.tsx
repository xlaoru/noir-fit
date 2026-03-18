import { logOut } from "@/lib/actions/log-out.action";
import { ISignOutProps } from "@/utils/models";

export default function SignOut({ }: ISignOutProps) {
    return (
        <div className="flex flex-col gap-3">
            <h5>Sign Out</h5>
            <div className="flex flex-col gap-1 p-6 bg-red-950/40 border border-red-900 rounded-sm">
                <p className="text-lg text-red-100">Are you sure you want to sign out?</p>
                <form 
                    action={logOut}
                >
                    <button 
                        className="mt-3 h-11 px-3 bg-red-600 text-white cursor-pointer border border-red-600 rounded-sm hover:bg-red-500 focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400"
                        type="submit"
                    >Submit</button>
                </form>
            </div>
        </div>
    )
}
