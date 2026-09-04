import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../Button";
import { productCardsData } from "@/lib/data";

const ProductCard: React.FC<{
    product: typeof productCardsData[0]
}> = ({ product }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative rounded-3xl bg-background border border-rose-500/20 shadow-xl overflow-hidden hover:shadow-2xl hover:border-rose-500/40 transition-all flex flex-col"
        >
            <div className="p-8 sm:p-10 flex-1 flex flex-col">
                {/* Category Badge & Status */}
                <div className="flex items-center justify-between gap-2 mb-6">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${product.title === 'Prostanone'
                            ? 'bg-primary/15 text-primary'
                            : 'bg-rose-500/15 text-rose-900'
                        }`}>
                        {/* {product.title === 'Prostanone' ? <ShieldCheck className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />} */}
                        <span>{product.category}</span>
                    </span>
                    {/* <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wide bg-emerald-500/15 text-emerald-600">
              {product.badge}
            </span> */}
                    <img
                        src={product.image}
                        alt={`Temporary ${product.title} product placeholder`}
                        className="h-24 w-24 object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                </div>

                {/* Title & Description */}
                <h3 className="text-3xl font-extrabold  tracking-tight mb-3 group-hover:text-primary transition-colors">
                    {product.title}
                </h3>
                <p className="text-base text-text leading-relaxed mb-6">
                    {product.description}
                </p>

                {/* Botanical Actives */}
                <div className="mb-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-text block mb-2.5">
                        Core Botanical Matrix
                    </span>
                    <div className="flex flex-wrap gap-2">
                        {product.botanicalMatrix.map((herb) => (
                            <span
                                key={herb}
                                className={`px-2.5 py-1 rounded-lg text-xs font-medium ${product.title === 'Prostanone' ? 'bg-primary/5 dark:bg-primary/20 text-primary border border-primary/15' : 'bg-rose-900/5 dark:bg-rose-900/20 text-rose-900 border border-rose-900/15'}`}
                            >
                                {herb}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Benefits Checklist */}
                <ul className="space-y-2.5 mb-8 text-sm ">
                    {product.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-primary shrink-0" />
                            <span>{benefit}</span>
                        </li>
                    ))}
                </ul>

                {/* Price Range & CTAs */}
                <div className="mt-auto pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                        <span className="text-xs text-gray-400 block">Pricing from</span>
                        <div className="text-xl font-extrabold text-text">
                            {product.price} <span className="text-xs font-normal text-gray-500">{product.priceUnit}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <Link to={product.cta.path} className="w-full sm:w-auto">
                            <Button variant="outline" size="md" className="w-full sm:w-auto text-xs">
                                {product.cta.text}
                            </Button>
                        </Link>
                        <Link to={product.secondaryCta.path} className="w-full sm:w-auto">
                            <Button size="md" className="w-full sm:w-auto gap-1 text-xs">
                                <span>{product.secondaryCta.text}</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default ProductCard;