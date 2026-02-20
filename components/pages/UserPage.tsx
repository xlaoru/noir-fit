"use client"

import { IUserPageProps } from "@/utils/models";
import { useState } from "react";
import UserInfoTab from "../UserInfoTab";
import Profile from "../Profile";
import Orders from "../Orders";
import SignOut from "../SignOut";
import Settings from "../Settings";

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
    orders
}: IUserPageProps) {
    const [currentTab, setCurrentTab] = useState(tabs[0])

    function renderSelectedSection() {
        switch (currentTab) {
            case "Profile":
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
            case "Orders":
                return (
                    <Orders />
                )
            case "Settings":
                return (
                    <Settings />
                )
            case "Sign Out":
                return (
                    <SignOut />
                )
        }
    }

    return (
        <section>
            <div className="section-container">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-[0_0_20%] w-full flex flex-col gap-4">
                        <h2 className="text-left">Account</h2>
                        <UserInfoTab tabs={tabs} currentTab={currentTab} setCurrentTab={setCurrentTab} />
                    </div>
                    <div className="flex-[0_0_80%] w-full flex flex-col gap-4">
                        {renderSelectedSection()}
                    </div>
                </div>
            </div>
        </section>
    )
}
