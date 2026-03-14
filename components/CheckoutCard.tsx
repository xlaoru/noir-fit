import { ICheckoutCardProps } from "@/utils/models";
import Image from "next/image";
import React from "react";

export default function CheckoutCard({ image, title, price, quantity }: ICheckoutCardProps) {
    return (
        <div className="flex justify-between">
            <div className="flex gap-5">
                <div className="relative w-14 h-14">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover rounded"
                    />
                </div>
                <div>
                    <h6>{title}</h6>
                    <p>Quantity: {quantity}</p>
                </div>
            </div>
            <div>
                <h6>${price}</h6>
            </div>
        </div>
    )
}
