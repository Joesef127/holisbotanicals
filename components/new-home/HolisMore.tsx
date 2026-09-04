import { motion } from "framer-motion"
import { PlusCircle } from "lucide-react"
import { Link } from "react-router-dom"
import Button from "../Button"

const HolisMore: React.FC<{ reveal: any }> = ({ reveal }) => {
  return (
      <section
          className="py-20 bg-[#18352c]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 gap-6 grid md:grid-cols-5 md:items-center text-white">
              <motion.div
                  {...reveal}
                  className="col-span-3"
              >
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#cbdc89]">
                      More from Holis, coming soon
                  </p>
                  <h2 className="mt-4 text-4xl font-bold">
                      Our vision goes beyond the products you see today.
                  </h2>
                  <p className="mt-5 max-w-2xl leading-relaxed text-white/75">
                      We are continually exploring new opportunities in botanical wellness, research, product
                      development and natural health solutions to build a broader range of products for different
                      wellness needs.
                  </p>
              </motion.div>
              {/* <Beaker className="h-24 w-24 self-end justify-self-end text-[#cbdc89]" /> */}
              <div className='flex items-center justify-end col-span-2'>
                  <Link to="/contact" className="shrink-0">
                      <Button variant="outline" size="md" className="gap-2 text-xs bg-transparent text-white! border! border-white! hover:bg-white! hover:text-primary!">
                          <PlusCircle className="w-4 h-4" />
                          <span>Stay Connected</span>
                      </Button>
                  </Link>
              </div>
          </div>
      </section>
  )
}

export default HolisMore