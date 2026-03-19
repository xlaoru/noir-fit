"use client"

import { IAdminPageProps } from "@/utils/models";
import { useMemo, useState } from "react";

export default function AdminPage({ categories, subCategories }: IAdminPageProps) {
    const [selectedCategory, setSelectedCategory] = useState(categories[0] ?? "")

    const subCategoryKeyByCategory: Record<string, string> = {
        men: "apparel",
        women: "apparel",
        nutrition: "nutrition",
        accessories: "accessories",
    }

    const availableSubCategories = useMemo(() => {
        const normalizedCategory = selectedCategory.toLowerCase()
        const subCategoryKey = subCategoryKeyByCategory[normalizedCategory]

        return subCategories[subCategoryKey] ?? []
    }, [selectedCategory, subCategories])

    return (
        <section>
            <div className="section-container pt-0 flex flex-col gap-6">
                <h2 className="text-left">Admin Page</h2>
                <div className="flex flex-col gap-6 p-6 bg-zinc-900 border border-zinc-800 rounded-sm">
                    <form
                        className="flex flex-col gap-3"
                        /* action={() => {}} */
                    >
                        <h3 className="mb-3">New Product</h3>
                        <label 
                            htmlFor="productImage"
                            className="text-sm text-zinc-400"
                        >Product Image
                        </label>
                        <div className="relative">
                            <input 
                                id="productImage"
                                type="file"
                                name="productImage"
                                accept="image/*"
                                required
                                className="peer sr-only"
                            />
                            <label
                                htmlFor="productImage"
                                className="group flex min-h-44 cursor-pointer flex-col items-center justify-center gap-3 rounded-sm border border-dashed border-zinc-700 bg-zinc-800 px-6 py-8 text-center transition-colors duration-200 hover:border-zinc-500 peer-focus-visible:border-zinc-500 peer-focus-visible:ring-1 peer-focus-visible:ring-zinc-500"
                            >
                                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 text-zinc-300 transition-colors duration-200 group-hover:border-zinc-500">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.6"
                                        className="h-6 w-6"
                                        aria-hidden="true"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V7m0 0-3 3m3-3 3 3" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M20 16.5A3.5 3.5 0 0 1 16.5 20h-9A3.5 3.5 0 0 1 4 16.5" />
                                    </svg>
                                </span>
                                <div className="space-y-1">
                                    <p className="text-sm font-semibold text-zinc-200">Click to upload product image</p>
                                    <p className="text-xs text-zinc-500">PNG, JPG or WEBP up to 10MB</p>
                                </div>
                            </label>
                        </div>
                        <label 
                            htmlFor="productName"
                            className="text-sm text-zinc-400"
                        >Product Name
                        </label>
                        <input 
                            id="productName"
                            type="text" 
                            name="productName"
                            required
                            className="h-11 px-3 bg-zinc-800 border border-zinc-700 rounded-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
                            placeholder="Coat"
                        />
                        <label 
                            htmlFor="productPrice"
                            className="text-sm text-zinc-400"
                        >Product Price (USD)
                        </label>
                        <input 
                            id="productPrice"
                            type="number" 
                            name="productPrice"
                            required
                            className="h-11 px-3 bg-zinc-800 border border-zinc-700 rounded-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
                            placeholder="500"
                        />
                        <div className="flex justify-between gap-3">
                            <div className="flex flex-col gap-2 flex-1">
                                <label 
                                    htmlFor="productCategory"
                                    className="text-sm text-zinc-400"
                                >Product Category
                                </label>
                                <select 
                                    id="productCategory"
                                    name="productCategory"
                                    required
                                    value={selectedCategory}
                                    onChange={(event) => setSelectedCategory(event.target.value)}
                                    className="h-11 px-3 bg-zinc-800 border border-zinc-700 rounded-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
                                >
                                    {categories.map((category) => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex flex-col gap-2 flex-1">
                                <label 
                                    htmlFor="productSubCategory"
                                    className="text-sm text-zinc-400"
                                >Product Subcategory
                                </label>
                                <select 
                                    id="productSubCategory"
                                    name="productSubCategory"
                                    required
                                    key={selectedCategory}
                                    className="capitalize h-11 px-3 bg-zinc-800 border border-zinc-700 rounded-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
                                >
                                    {availableSubCategories.map((subCategory) => (
                                        <option className="capitalize" key={subCategory} value={subCategory}>{subCategory}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <label 
                            htmlFor="productDescription"
                            className="text-sm text-zinc-400"
                        >Product Description
                        </label>
                        <textarea 
                            id="productDescription"
                            name="productDescription"
                            required
                            className="h-24 px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
                            placeholder="Made from high-quality materials..."
                        />
                        <label 
                            htmlFor="productSizes"
                            className="text-sm text-zinc-400"
                        >Product Sizes
                        </label>
                        <input 
                            id="productSizes"
                            type="text" 
                            name="productSizes"
                            required
                            className="h-11 px-3 bg-zinc-800 border border-zinc-700 rounded-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
                            placeholder="S, M, L, XL"
                        />
                        <label 
                            htmlFor="productColors"
                            className="text-sm text-zinc-400"
                        >Product Colors
                        </label>
                        <input 
                            id="productColors"
                            type="text" 
                            name="productColors"
                            required
                            className="h-11 px-3 bg-zinc-800 border border-zinc-700 rounded-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
                            placeholder="Red, Blue, Green"
                        />
                        <button type="submit" className="mt-3 bg-zinc-100 text-zinc-950 rounded px-4 py-2 cursor-pointer hover:bg-zinc-300 transition-colors">Submit</button>
                    </form>
                </div>
            </div>
        </section>
    )
}