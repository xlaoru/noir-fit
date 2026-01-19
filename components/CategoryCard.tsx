import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ICategoryCardProps {
    backgroundImageUrl: string;
    title: string;
    slug: string
}

export default function CategoryCard({ backgroundImageUrl, title, slug }: ICategoryCardProps) {
    return (
        <Link href={slug} className="group">
            <div className="relative w-[292px] h-[365px] rounded-xl overflow-hidden">
                <Image
                    src={`/${backgroundImageUrl}`}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-5 left-5 z-10">
                    <h5>{title}</h5>
                    <p className="flex items-center gap-1 text-zinc-400 transition-colors duration-300 group-hover:text-zinc-100">
                        <span>Shop now</span>
                        <ArrowRight width={15} height={15} />
                    </p>
                </div>
            </div>
        </Link>
    )
}

