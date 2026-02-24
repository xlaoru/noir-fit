import { IOrdersProps } from "@/utils/models";
import OrderItem from "./OrderItem";

export default function Orders({ orders }: IOrdersProps) {
    return (
        <div className="flex flex-col gap-4">
            <h5>Order History</h5>
            <ul className="flex flex-col gap-3">
                {orders.map((item) => (<OrderItem key={item.id} {...item} />))}
            </ul>
        </div>
    )

}
