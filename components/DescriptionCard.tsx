import { IDescriptionCardProps } from "@/utils/models";

export default function DescriptionCard({ svgIcon, title, body }: IDescriptionCardProps) {
    return (
        <div className="flex items-center gap-3">
            <div className="border border-zinc-800 bg-zinc-900 p-2.5 rounded-sm">
                {svgIcon}
            </div>
            <div>
                <h6>{title}</h6>
                <p>{body}</p>
            </div>
        </div>
    )
}
