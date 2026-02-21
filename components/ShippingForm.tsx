"use client"

import { IShippingFormProps } from "@/utils/models";
import { X } from "lucide-react";

export default function ShippingForm({
    phoneNumber,
    address,
    city,
    country,
    zipCode,
    setEditingShipping
}: IShippingFormProps) {
    return (
        <form
            className="z-1000 p-6 rounded-sm w-[30%] flex flex-col gap-2 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-zinc-950"
            action={() => { setEditingShipping(false) }}
        >
            <div className="flex items-center justify-between mb-2">
                <h5>Shipping Editing</h5>
                <X className="cursor-pointer hover:text-zinc-300" onClick={() => setEditingShipping(false)} />
            </div>
            <label
                htmlFor="phoneNumber"
                className="text-sm text-zinc-400"
            >
                Phone Number
            </label>
            <input
                id="phoneNumber"
                name="phoneNumber"
                type="phoneNumber"
                defaultValue={phoneNumber}
                required
                placeholder="+38 (123) 456 7890"
                className="h-9 px-2 bg-zinc-900 border border-zinc-800 rounded-sm text-zinc-100
                               placeholder:text-zinc-500
                               focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
            />
            <label
                htmlFor="address"
                className="text-sm text-zinc-400"
            >
                Address
            </label>
            <input
                id="address"
                name="address"
                type="address"
                defaultValue={address}
                required
                placeholder="742 Evergreen Terrace"
                className="h-9 px-2 bg-zinc-900 border border-zinc-800 rounded-sm text-zinc-100
                               placeholder:text-zinc-500
                               focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
            />
            <label
                htmlFor="city"
                className="text-sm text-zinc-400"
            >
                City
            </label>
            <input
                id="city"
                name="city"
                type="city"
                defaultValue={city}
                required
                placeholder="New York"
                className="h-9 px-2 bg-zinc-900 border border-zinc-800 rounded-sm text-zinc-100
                               placeholder:text-zinc-500
                               focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
            />
            <label
                htmlFor="country"
                className="text-sm text-zinc-400"
            >
                Country
            </label>
            <input
                id="country"
                name="country"
                type="country"
                defaultValue={country}
                required
                placeholder="USA"
                className="h-9 px-2 bg-zinc-900 border border-zinc-800 rounded-sm text-zinc-100
                               placeholder:text-zinc-500
                               focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
            />
            <label
                htmlFor="zipCode"
                className="text-sm text-zinc-400"
            >
                Zip Code
            </label>
            <input
                id="zipCode"
                name="zipCode"
                type="zipCode"
                defaultValue={zipCode}
                required
                placeholder="10001"
                className="h-9 px-2 bg-zinc-900 border border-zinc-800 rounded-sm text-zinc-100
                               placeholder:text-zinc-500
                               focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
            />
            <button type="submit" className="mt-2 bg-zinc-100 text-zinc-950 rounded px-4 py-2 cursor-pointer hover:bg-zinc-300 transition-colors">Save Changes</button>
        </form>
    )
}
