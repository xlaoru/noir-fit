import { updatePassword } from "@/lib/actions/update-password.action";
import { ISettingsProps } from "@/utils/models";

export default function Settings({ }: ISettingsProps) {
    return (
        <div className="flex flex-col gap-3">
            <h5>Settings</h5>
            <div className="flex flex-col gap-6 p-6 bg-zinc-900 border border-zinc-800 rounded-sm">
                <form 
                    action={updatePassword}
                    className="flex flex-col gap-2 flex-1"
                >
                    <h6 className="mb-3">Change Password</h6>
                    <label htmlFor="currentPassword">Current Password</label>
                    <input 
                        id="currentPassword"
                        name="currentPassword"
                        type="password"
                        className="h-11 px-3 bg-zinc-800 border border-zinc-700 rounded-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
                    />
                    <label htmlFor="newPassword">New Password</label>
                    <input 
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        className="h-11 px-3 bg-zinc-800 border border-zinc-700 rounded-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
                    />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input 
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        className="h-11 px-3 bg-zinc-800 border border-zinc-700 rounded-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
                    />
                    <button
                        type="submit"
                        className="mt-3 h-11 px-3 bg-zinc-100 text-zinc-900 cursor-pointer border border-zinc-100 rounded-sm hover:bg-zinc-300 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
                    >Update Password</button>
                </form>
            </div>
        </div>
    )
}
