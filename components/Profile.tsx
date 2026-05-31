"use client"

import { editUserProfileData } from "@/lib/actions/edit-user-profile-data.action";
import { maskCardNumber } from "@/utils/maskCardNumber";
import { IProfileProps } from "@/utils/models";
import { CreditCard, MapPin } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import PaymentForm from "./PaymentForm";
import ShippingForm from "./ShippingForm";

export default function Profile({
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
    avatar
}: IProfileProps) {
    const [isEditingShipping, setEditingShipping] = useState(false)
    const [isEditingPayment, setEditingPayment] = useState(false)

    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)

    const formRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if ((isEditingShipping || isEditingPayment) && formRef.current) {
            formRef.current.scrollIntoView({
                behavior: "smooth",
                block: "center",
            })
        }
    }, [isEditingShipping, isEditingPayment])

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] ?? null
        setSelectedFile(file)
        setPreviewUrl(file ? URL.createObjectURL(file) : null)
    }

    return (
        <div>
            {isEditingShipping && <div ref={formRef}><ShippingForm phoneNumber={phoneNumber} address={address} city={city} country={country} zipCode={zipCode} setEditingShipping={setEditingShipping} /></div>}
            {isEditingPayment && <div ref={formRef}><PaymentForm cardNumber={cardNumber} expireDate={expireDate} cvv={cvv} nameOfCard={nameOfCard} setEditingPayment={setEditingPayment} /></div>}
            {(isEditingShipping || isEditingPayment) && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
            )}
            <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-6 z-1">
                    <div className="flex flex-col gap-6 p-6 bg-zinc-900 border border-zinc-800 rounded-sm">
                        <div className="flex justify-between gap-3">
                            <form
                                className="flex flex-col gap-3 flex-1"
                                action={editUserProfileData}
                            >
                                <div className="flex items-center gap-6">
                                    <div className="relative">
                                        <input
                                            id="avatar"
                                            type="file"
                                            name="avatar"
                                            accept="image/*"
                                            required
                                            className="peer sr-only"
                                            onChange={handleFileChange}
                                        />
                                        <label
                                            htmlFor="avatar"
                                        >
                                            {previewUrl && selectedFile ? (
                                                <Image
                                                    src={previewUrl}
                                                    alt="preview"
                                                    width={8}
                                                    height={8}
                                                    className="size-20 rounded-full object-cover border border-zinc-700"
                                                />
                                            ) : avatar
                                                ? (
                                                    <Image
                                                        src={avatar}
                                                        alt="avatar"
                                                        width={8}
                                                        height={8}
                                                        className="size-20 rounded-full object-cover border border-zinc-700"
                                                    />
                                                )
                                                : (
                                                    (
                                                        <div className="w-fit bg-zinc-800 text-zinc-100 border border-zinc-700 p-6 rounded-full">
                                                            <svg className="size-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                                                <circle cx="12" cy="8" r="4" />
                                                                <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                                                            </svg>
                                                        </div>
                                                    )
                                                )
                                            }
                                        </label>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <h5>{firstName} {lastName}</h5>
                                        <p>{email}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <div className="flex flex-col gap-2 flex-1">
                                        <label
                                            htmlFor="firstName"
                                            className="text-sm text-zinc-400"
                                        >
                                            Firts Name
                                        </label>
                                        <input
                                            id="firstName"
                                            name="firstName"
                                            type="firstName"
                                            required
                                            defaultValue={firstName}
                                            placeholder="John"
                                            className="h-11 px-3 bg-zinc-800 border border-zinc-700 rounded-sm text-zinc-100
                               placeholder:text-zinc-500
                               focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 flex-1">
                                        <label
                                            htmlFor="lastName"
                                            className="text-sm text-zinc-400"
                                        >
                                            Last Name
                                        </label>
                                        <input
                                            id="lastName"
                                            name="lastName"
                                            type="lastName"
                                            required
                                            defaultValue={lastName}
                                            placeholder="Doe"
                                            className="h-11 px-3 bg-zinc-800 border border-zinc-700 rounded-sm text-zinc-100
                               placeholder:text-zinc-500
                               focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
                                        />
                                    </div>
                                </div>
                                <label
                                    htmlFor="email"
                                    className="text-sm text-zinc-400"
                                >
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    defaultValue={email}
                                    placeholder="example@mail.com"
                                    className="h-11 px-3 bg-zinc-800 border border-zinc-700 rounded-sm text-zinc-100
                               placeholder:text-zinc-500
                               focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
                                />
                                <button type="submit" className="w-fit mt-2 bg-zinc-100 text-zinc-950 rounded px-4 py-2 cursor-pointer hover:bg-zinc-300 transition-colors">Save Changes</button>
                            </form>
                        </div>
                    </div>
                </div >
                <div className="flex flex-col gap-6 p-6 bg-zinc-900 border border-zinc-800 rounded-sm">
                    <div className="flex justify-between">
                        <h6 className="flex items-center gap-2"><MapPin width={16} height={16} className="text-zinc-400" />Shipping Address</h6>
                        <button
                            className="cursor-pointer hover:text-zinc-300"
                            onClick={() => { setEditingShipping(true); setEditingPayment(false) }}
                        >
                            Edit
                        </button>
                    </div>
                    <ul>
                        <li className="text-zinc-400">{address}</li>
                        <li className="text-zinc-400">{city}</li>
                        <li className="text-zinc-400">{country}</li>
                    </ul>
                </div>
                <div className="flex flex-col gap-6 p-6 bg-zinc-900 border border-zinc-800 rounded-sm">
                    <div className="flex justify-between">
                        <h6 className="flex items-center gap-2"><CreditCard width={16} height={16} className="text-zinc-400" />Payment Method</h6>
                        <button
                            className="cursor-pointer hover:text-zinc-300"
                            onClick={() => { setEditingShipping(false); setEditingPayment(true) }}
                        >
                            Edit
                        </button>
                    </div>
                    <ul>
                        <li className="text-zinc-400">{maskCardNumber(cardNumber)}</li>
                    </ul>
                </div>
            </div >
        </div >
    )
}
