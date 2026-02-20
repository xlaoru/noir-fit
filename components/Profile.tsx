import { maskCardNumber } from "@/utils/maskCardNumber";
import { IProfileProps } from "@/utils/models";
import { CreditCard, MapPin } from "lucide-react";

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
    nameOfCard
}: IProfileProps) {
    return (
        <>
            <div className="flex flex-col gap-6 p-6 bg-zinc-900 border border-zinc-800 rounded-sm">
                <div className="flex items-center gap-6">
                    <div className="w-fit bg-zinc-800 text-zinc-600 border border-zinc-700 p-6 rounded-full">
                        <svg className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                            <circle cx="12" cy="8" r="4" />
                            <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
                        </svg>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h5>{firstName} {lastName}</h5>
                        <p>{email}</p>
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                    <div className="flex justify-between gap-3">
                        <form className="flex flex-col gap-2 flex-1">
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
                        </form>
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
                    <div className="flex flex-col gap-1">
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
                    </div>
                </div>
                <button className="w-fit bg-zinc-100 text-zinc-950 rounded px-4 py-2 cursor-pointer hover:bg-zinc-300 transition-colors">Save Changes</button>
            </div>
            <div className="flex flex-col gap-6 p-6 bg-zinc-900 border border-zinc-800 rounded-sm">
                <div className="flex justify-between">
                    <h6 className="flex items-center gap-2"><MapPin width={16} height={16} className="text-zinc-400" /> Shipping Address</h6>
                    <button className="cursor-pointer hover:text-zinc-300">Edit</button>
                </div>
                <ul>
                    <li className="text-zinc-400">{address}</li>
                    <li className="text-zinc-400">{city}</li>
                    <li className="text-zinc-400">{country}</li>
                </ul>
            </div>
            <div className="flex flex-col gap-6 p-6 bg-zinc-900 border border-zinc-800 rounded-sm">
                <div className="flex justify-between">
                    <h6 className="flex items-center gap-2"><CreditCard width={16} height={16} className="text-zinc-400" /> Shipping Address</h6>
                    <button className="cursor-pointer hover:text-zinc-300">Edit</button>
                </div>
                <ul>
                    <li className="text-zinc-400">{maskCardNumber(cardNumber)}</li>
                </ul>
            </div>
        </>
    )
}
