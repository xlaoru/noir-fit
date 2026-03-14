import { ITabIconProps, IUserInfoTabProps } from "@/utils/models";
import { LogOut, Settings, ShoppingCart, User } from "lucide-react";
import Link from "next/link";

export default function UserInfoTab({ slug, tabs, currentTab }: IUserInfoTabProps) {
    return (
        <ul
            className="mt-6 flex flex-col gap-1"
        >
            {tabs.map((tab) => (
                <Link href={`/account/${slug}/${tab.toLowerCase()}`} key={tab}>
                    <li
                        className={`flex items-center gap-3 p-2 rounded-sm cursor-pointer ${currentTab === tab.toLowerCase() ? "bg-zinc-800 text-zinc-100" : "bg-zinc-950 text-zinc-300 hover:bg-zinc-900"}`}
                    >
                        <TabIcon tabName={tab} />
                        {tab}
                    </li>
                </Link>
            ))}
        </ul>
    )
}

function TabIcon({ tabName }: ITabIconProps) {
    switch (tabName) {
        case "Profile":
            return (
                <User width={24} height={24} />
            )
        case "Orders":
            return (
                <ShoppingCart width={24} height={24} />
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