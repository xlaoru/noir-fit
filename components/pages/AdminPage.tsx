"use client"

import { createNewProduct } from "@/lib/actions/create-new-product.action";
import { IAdminPageProps } from "@/utils/models";
import { useMemo, useState, useRef } from "react";
import Image from "next/image";

const subCategoryKeyByCategory: Record<string, string> = {
    men: "apparel",
    women: "apparel",
    nutrition: "nutrition",
    accessories: "accessories",
}

export default function AdminPage({ categories, subCategories }: IAdminPageProps) {
    const [selectedCategory, setSelectedCategory] = useState(categories[0] ?? "")
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const formRef = useRef<HTMLFormElement>(null)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] ?? null
        setSelectedFile(file)
        setPreviewUrl(file ? URL.createObjectURL(file) : null)
    }

    const handleSubmit = async (formData: FormData) => {
        await createNewProduct(formData)
        setSelectedFile(null)
        setPreviewUrl(null)
        setSelectedCategory(categories[0] ?? "")
        formRef.current?.reset()
    }

    const availableSubCategories = useMemo(() => {
        const normalizedCategory = selectedCategory.toLowerCase()
        const subCategoryKey = subCategoryKeyByCategory[normalizedCategory]

        return subCategories[subCategoryKey] ?? []
    }, [selectedCategory, subCategories])

    const formatEnumLabel = (value: string) => value.split("_").map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ")

    return (
        <section>
            <div className="section-container pt-0 flex flex-col gap-6">
                <h2 className="text-left">Admin Page</h2>
                <div className="flex flex-col gap-6 p-6 bg-zinc-900 border border-zinc-800 rounded-sm">
                    <form
                        ref={formRef}
                        className="flex flex-col gap-3"
                        action={handleSubmit}
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
                                onChange={handleFileChange}
                            />
                            <label
                                htmlFor="productImage"
                                className="group flex min-h-44 cursor-pointer flex-col items-center justify-center gap-3 rounded-sm border border-dashed bg-zinc-800 px-6 py-8 text-center transition-colors duration-200 peer-focus-visible:ring-1 peer-focus-visible:ring-zinc-500 border-zinc-700 hover:border-zinc-500 peer-focus-visible:border-zinc-500"
                            >
                                {previewUrl && selectedFile ? (
                                    <>
                                        <Image
                                            src={previewUrl}
                                            alt="preview"
                                            width={112}
                                            height={112}
                                            className="h-28 w-28 rounded-sm object-cover border border-zinc-700"
                                        />
                                        <div className="space-y-1">
                                            <p className="text-sm font-semibold text-zinc-200">{selectedFile.name}</p>
                                            <p className="text-xs text-zinc-500">{(selectedFile.size / 1024).toFixed(1)} KB — click to replace</p>
                                        </div>
                                    </>
                                ) : (
                                    <>
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
                                    </>
                                )}
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
                            step="0.01"
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
                                    className="h-11 px-3 bg-zinc-800 border border-zinc-700 rounded-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
                                >
                                    {availableSubCategories.map((subCategory) => (
                                        <option key={subCategory} value={subCategory}>{formatEnumLabel(subCategory)}</option>
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
                         <label 
                            htmlFor="productCare"
                            className="text-sm text-zinc-400"
                        >Product Care
                        </label>
                        <input 
                            id="productCare"
                            type="text" 
                            name="productCare"
                            required
                            className="h-11 px-3 bg-zinc-800 border border-zinc-700 rounded-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
                            placeholder="Machine wash cold, tumble dry low"
                        />
                        <label 
                            htmlFor="productFit"
                            className="text-sm text-zinc-400"
                        >Product Fit
                        </label>
                        <input 
                            id="productFit"
                            type="text" 
                            name="productFit"
                            required
                            className="h-11 px-3 bg-zinc-800 border border-zinc-700 rounded-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
                            placeholder="Slim fit, regular fit, loose fit"
                        />
                        <label 
                            htmlFor="productOrigin"
                            className="text-sm text-zinc-400"
                        >Product Origin
                        </label>
                        <input 
                            id="productOrigin"
                            type="text" 
                            name="productOrigin"
                            required
                            className="h-11 px-3 bg-zinc-800 border border-zinc-700 rounded-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
                            placeholder="Italy"
                        />
                        <label 
                            htmlFor="productMaterial"
                            className="text-sm text-zinc-400"
                        >Product Material
                        </label>
                        <input 
                            id="productMaterial"
                            type="text" 
                            name="productMaterial"
                            required
                            className="h-11 px-3 bg-zinc-800 border border-zinc-700 rounded-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
                            placeholder="Cotton, Wool, Polyester"
                        />
                        <button type="submit" className="mt-3 bg-zinc-100 text-zinc-950 rounded px-4 py-2 cursor-pointer hover:bg-zinc-300 transition-colors">Submit</button>
                    </form>
                </div>
            </div>
        </section>
    )
}