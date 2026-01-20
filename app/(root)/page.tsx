import CategoryCard from "@/components/CategoryCard";
import DescriptionCard from "@/components/DescriptionCard"
import ProductCard from "@/components/ProductCard";
import { IShortedAccessory, IShortedCloth, IShortedNutrition } from "@/utils/models";
import Link from "next/link";

export default async function Home() {
  const reponse = await fetch(`${process.env.URL}/api/categories`)

  if (!reponse.ok) {
    return <div>Error!</div>
  }

  const { products }: {
    products: (IShortedCloth | IShortedAccessory | IShortedNutrition)[]
  } = await reponse.json()

  return (
    <>
      <header className="relative min-h-[calc(100vh-64px)] w-full flex flex-col justify-center items-center text-zinc-100 flex flex-col gap-6 bg-[url('/bg-hero.png')] bg-cover bg-center mb-12">
        <h1>
          Performance
          <br />
          <span className="text-zinc-500">
            over hype.
          </span>
        </h1>
        <p className="text-center text-base">Premium sports apparel and gear engineered for athletes who train with purpose.</p>
        <Link href="#categories" className="absolute bottom-10">
          <div className="w-fit flex flex-col items-center gap-3 cursor-pointer group">
            <span className="text-xs tracking-widest text-zinc-400 group-hover:text-zinc-100 transition-colors">
              SCROLL
            </span>
            <div className="relative w-6 h-10 rounded-full border border-zinc-600 flex items-start justify-center p-1.5">
              <div className="w-1 h-2 rounded-full bg-white animate-scroll" />
            </div>
          </div>
        </Link>
      </header>
      <section className="border-y border-zinc-900">
        <div className="section-container flex justify-between px-15 py-6">
          <DescriptionCard
            svgIcon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap w-5 h-5 text-white" aria-hidden="true" data-loc="src/web/pages/index.tsx:80"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path></svg>}
            title="Performance Fabrics"
            body="Engineered materials that move with you."
          />
          <DescriptionCard
            svgIcon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield w-5 h-5 text-white" aria-hidden="true" data-loc="src/web/pages/index.tsx:89"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path></svg>}
            title="Built to Last"
            body="Premium construction for long-term durability you."
          />
          <DescriptionCard
            svgIcon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-target w-5 h-5 text-white" aria-hidden="true" data-loc="src/web/pages/index.tsx:98"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>}
            title="Athlete Focused"
            body="Designed for those who train with purpose."
          />
        </div>
      </section >
      <section id="categories">
        <div className="section-container flex flex-col gap-3">
          <h3>Shop by Category</h3>
          <div className="flex gap-3">
            <CategoryCard
              backgroundImageUrl="bg-men-collection.png"
              title="Men"
              slug="/categories/collections/men"
            />
            <CategoryCard
              backgroundImageUrl="bg-women-collection.png"
              title="Women"
              slug="/categories/collections/women"
            />
            <CategoryCard
              backgroundImageUrl="bg-accessories.png"
              title="Accessories"
              slug="/categories/accessories"
            />
            <CategoryCard
              backgroundImageUrl="bg-nutrition.png"
              title="Nutrition"
              slug="/categories/nutrition"
            />
          </div>
        </div>
      </section>
      <section className="bg-zinc-900">
        <div className="section-container flex flex-col gap-6">
          <div>
            <h3>Featured Gear</h3>
            <p>Top picks across all collections</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.title}
                image={product.image}
                category={product.category}
                title={product.title}
                price={product.price}
                route={`/categories/${product.type.toLowerCase()}/${"gender" in product ? `${product.gender.toLowerCase()}/` : ""}${product.slug}`}
              />
            ))}
          </div>
        </div>
      </section>
      <section>
        <div className="section-container flex flex-col gap-6">
          <h2>Train Different.</h2>
          <p className="text-center text-base">Join athletes who choose substance over style. Subscribe for <br /> early access and exclusive drops.</p>
          <div className="flex justify-center gap-3">
            <input type="email" placeholder="Enter your email" className="w-[350px] px-3 bg-zinc-900 border border-zinc-800 rounded-sm" />
            <button className="bg-zinc-100 text-zinc-950 px-5 py-3 font-bold rounded-sm cursor-pointer hover:bg-zinc-300">Subscribe</button>
          </div>
        </div>
      </section>
    </>
  )
}
