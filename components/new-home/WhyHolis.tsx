import { motion } from "framer-motion"
import { Leaf } from "lucide-react"


const WhyHolis: React.FC<{ reveal: any }> = ({ reveal }) => {   
    return (
        <section className="bg-[#eef3e7] py-20">
            <motion.div {...reveal} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#527130]">
                        Why Holis
                    </p>
                    <h2 className="mt-4 text-4xl font-bold text-[#18352C]">
                        A thoughtful way forward.
                    </h2>
                </div>
                <div className="mt-12 grid gap-px bg-[#ccd8bc] sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        [
                            "Inspired by nature",
                            "We believe plants and botanicals have an important place in modern wellness.",
                        ],
                        [
                            "Purpose driven",
                            "Every product we bring to our community is selected or developed with a clear wellness purpose.",
                        ],
                        [
                            "Quality conscious",
                            "We care about what goes into the products we offer and the experience people have withthem.",
                        ],
                        [
                            "Growing with you",
                            "Holis is building beyond today's collection, with a long-term vision for research, product development and botanical wellness.",
                        ],
                    ].map(([title, copy]) => (
                        <article key={title} className="bg-[#eef3e7] p-7">
                            <Leaf className="h-6 w-6 text-[#527130]" />
                            <h3 className="mt-5 text-xl font-bold text-[#18352C]">
                                {title}
                            </h3>
                            <p className="mt-3 text-sm leading-relaxed text-[#496158]">
                                {copy}
                            </p>
                        </article>
                    ))}
                </div>
            </motion.div>
        </section>
    )
}

export default WhyHolis