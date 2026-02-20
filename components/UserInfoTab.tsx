import { ITabIconProps, IUserInfoTabProps } from "@/utils/models";
import { LogOut, Settings } from "lucide-react";

export default function UserInfoTab({ tabs, currentTab, setCurrentTab }: IUserInfoTabProps) {
    return (
        <ul
            className="mt-6 flex flex-col gap-1"
        >
            {tabs.map((tab) => (
                <li
                    key={tab}
                    className={`flex items-center gap-3 p-2 rounded-sm cursor-pointer hover:bg-zinc-900 ${currentTab === tab ? "bg-zinc-800" : "bg-zinc-950"}`}
                    onClick={() => setCurrentTab(tab)}
                >
                    <TabIcon tabName={tab} />
                    {tab}
                </li>
            ))}
        </ul>
    )
}

function TabIcon({ tabName }: ITabIconProps) {
    switch (tabName) {
        case "Profile":
            return (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                </svg>
            )
        case "Orders":
            return (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
                </svg>
            )
        case "Settings":
            return (
                <Settings width={24} height={24} />
            )
        case "Sign Out":
            return (
                <LogOut width={24} height={24} />
            )
    }
}