import React from 'react'
import { motion } from 'framer-motion'

const SectionHeading: React.FC<{ title: string, subtitle: string, description: string }> = ({ title, subtitle, description }) => {

    const reveal = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-10%" },
        transition: { duration: 0.55 },
    }

    return (
        <motion.div {...reveal} className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-accent mb-3 block">
                {subtitle}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary tracking-tight mb-4">
                {title}
            </h2>
            <p className="text-base sm:text-lg text-text-muted">
                {description}
            </p>
        </motion.div>
    )
}

export default SectionHeading