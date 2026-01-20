interface IFiltersProps {
    categories: string[]
    activeCategory: string | null
    setActiveCategory: (activeCategory: string | null) => void
    sort: string
    setSort: (sort: string) => void
}

export default function Filters({ categories, activeCategory, setActiveCategory, sort, setSort }: IFiltersProps) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex gap-2">
                <button
                    onClick={() => setActiveCategory(null)}
                    className={`flex justify-center items-center py-2 px-5 rounded-sm border border-zinc-800 cursor-pointer transition-colors ${activeCategory === null ? "bg-zinc-100 text-zinc-900" : "bg-zinc-900 text-zinc-300 hover:bg-zinc-800"}`}
                >
                    All
                </button>
                {categories.map((category) => (
                    <button
                        key={category}
                        className={`capitalize flex justify-center items-center py-2 px-5 rounded-sm ${category === activeCategory ? "bg-zinc-100 hover:bg-zinc-400 text-zinc-900" : "bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-zinc-100"} border border-zinc-800 cursor-pointer transition-colors`}
                        onClick={() => {
                            setActiveCategory(category)
                        }}
                    >
                        {category.toLowerCase()}
                    </button>
                ))}
            </div>
            <div className="relative w-56">
                <select
                    value={sort}
                    onChange={(e) => setSort(e.currentTarget.value)}
                    className="w-full appearance-none bg-zinc-900 text-zinc-300 border border-zinc-700 rounded-md px-4 py-2 pr-10 text-sm cursor-pointer focus:outline-none"
                >
                    <option value="newest">Newest</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-zinc-400">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M6 9l6 6 6-6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            </div>
        </div>
    )
}
