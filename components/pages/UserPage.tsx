"use client"

import { IUserPageProps } from "@/utils/models";
import UserInfoTab from "../UserInfoTab";
import Profile from "../Profile";
import Orders from "../Orders";
import SignOut from "../SignOut";
import Settings from "../Settings";
import { useRouter, usePathname, useSearchParams } from "next/navigation"

const tabs = [
    "Profile",
    "Orders",
    "Settings",
    "Sign Out"
]

export default function UserPage({
    email,
    phoneNumber,
    firstName,
    lastName,
    address,
    city,
    country,
    zipCode,
    cardNumber,
    expireDate,
    cvv,
    nameOfCard,
    orders,
    slug,
    statuses
}: IUserPageProps) {
    const pathname = usePathname()

    const currentTab = decodeURIComponent(pathname.split("/").slice(-1)[0] ?? "")
        .toLowerCase()
        .replace(/\s+/g, "")

    function renderSelectedSection() {
        switch (currentTab) {
            case "profile":
                return (
                    <Profile
                        email={email}
                        phoneNumber={phoneNumber}
                        firstName={firstName}
                        lastName={lastName}
                        address={address}
                        city={city}
                        country={country}
                        zipCode={zipCode}
                        cardNumber={cardNumber}
                        expireDate={expireDate}
                        cvv={cvv}
                        nameOfCard={nameOfCard}
                    />
                )
            case "orders":
                return (
                    <Orders orders={orders} slug={slug} statuses={statuses} />
                )
            case "settings":
                return (
                    <Settings />
                )
            case "signout":
                return (
                    <SignOut />
                )
        }
    }

    return (
        <section>
            <div className="section-container py-0">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-[0_0_20%] w-full">
                        <div className="sticky top-24 flex flex-col gap-4">
                            <h2 className="text-left">Account</h2>
                            <UserInfoTab slug={slug} tabs={tabs} currentTab={currentTab} />
                        </div>
                    </div>
                    <div className="flex-[0_0_80%] w-full flex flex-col gap-4 pt-20">
                        {renderSelectedSection()}
                    </div>
                </div>
            </div>
        </section>
    )
}
