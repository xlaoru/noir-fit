import Link from "next/link";

export default function Footer() {
    return (
        <footer className="w-full p-8 bg-zinc-900">
            <div className="section-container">
                <div className="flex gap-75 pb-13 border-b border-zinc-800">
                    <div className="flex flex-col gap-5">
                        <h4><span className="font-bold">Noir</span> Fit</h4>
                        <p>Performance over hype. Premium sports apparel and gear for <br /> serious athletes who value function over flash</p>
                        <div className="flex gap-5">
                            <Link href="#">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram w-5 h-5 text-zinc-400 cursor-pointer hover:text-zinc-100 transition-colors" aria-hidden="true" data-loc="src/web/components/layout/footer.tsx:20"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                            </Link>
                            <Link href="#">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter w-5 h-5 text-zinc-400 cursor-pointer hover:text-zinc-100 transition-colors" aria-hidden="true" data-loc="src/web/components/layout/footer.tsx:23"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5">
                        <p className="uppercase font-bold text-zinc-400">Shop</p>
                        <Link href="/categories/apparel/men"><p className="hover:text-zinc-100">Men</p></Link>
                        <Link href="/categories/apparel/women"><p className="hover:text-zinc-100">Women</p></Link>
                        <Link href="/categories/accessories"><p className="hover:text-zinc-100">Accessories</p></Link>
                        <Link href="/categories/nutrition"><p className="hover:text-zinc-100">Nutrition</p></Link>
                    </div>
                    <div className="flex flex-col gap-5">
                        <p className="uppercase font-bold text-zinc-400">Support</p>
                        <Link href="#"><p className="hover:text-zinc-100">Contact</p></Link>
                        <Link href="#"><p className="hover:text-zinc-100">Shipping</p></Link>
                        <Link href="#"><p className="hover:text-zinc-100">Returns</p></Link>
                        <Link href="#"><p className="hover:text-zinc-100">FAQ</p></Link>
                    </div>
                </div>
                <div className="flex justify-between pt-8">
                    <p className="text-zinc-600">© 2220 Noir Fit. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#"><p className="text-zinc-600 hover:text-zinc-100 transition-colors">Privacy Policy</p></Link>
                        <Link href="#"><p className="text-zinc-600 hover:text-zinc-100 transition-colors">Terms of Service</p></Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
