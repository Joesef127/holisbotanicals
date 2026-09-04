import { ShieldCheck, Leaf, Award, Truck, CheckCircle2, Zap, FlaskConical, Users, Clock, Moon, Droplets, Hourglass, AlertCircle, Flame, Frown } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { images } from '@/lib/index.ts';
import { NAFDAC_REG_NO } from './constants';

export const SYMPTOMS: Array<{ icon: LucideIcon; text: string }> = [
  { icon: Moon,         text: 'Waking up 3–5 times per night to urinate' },
  { icon: Droplets,     text: 'Weak, slow or dribbling urine stream' },
  { icon: Hourglass,    text: 'Feeling bladder never fully empties' },
  { icon: AlertCircle,  text: 'Sudden, uncontrollable urge to go' },
  { icon: Flame,        text: 'Burning or pain when urinating' },
  { icon: Frown,        text: 'Embarrassment at work, travel, or social events' },
];

export const BENEFITS: Array<{ icon: LucideIcon; title: string; desc: string }> = [
  {
    icon: Zap,
    title: 'Shrinks Enlarged Prostate',
    desc: 'Targeted herbal compounds reduce prostate volume and relieve pressure on the bladder, addressing the root cause.',
  },
  {
    icon: Leaf,
    title: '100% Natural Formula',
    desc: 'No synthetic chemicals, no steroids. Pure herbal actives with no reported sexual side effects.',
  },
  {
    icon: FlaskConical,
    title: 'Clinically Formulated',
    desc: 'Developed in collaboration with Alpha Organics, Great Britain, produced in GMP-certified facilities.',
  },
  {
    icon: Award,
    title: 'NAFDAC Certified',
    desc: `Fully approved by Nigeria's National Agency for Food and Drug Administration. Reg. No. ${NAFDAC_REG_NO}.`,
  },
  {
    icon: Users,
    title: 'Thousands of Men Helped',
    desc: 'From Lagos to Kano, Nigerian men are reclaiming their nights and their confidence with Prostanone.',
  },
  {
    icon: Clock,
    title: 'Results in 4–6 Weeks',
    desc: 'Most users report measurable improvement in the first month. Optimal results at 8–12 weeks of consistent use.',
  },
];

export const INGREDIENTS = [
  {
    name: 'Saw Palmetto',
    dose: '300mg',
    desc: 'The gold standard of prostate support, blocks DHT conversion to reduce enlargement and improve urine flow.',
  },
  {
    name: 'Chimaphila Umbellata',
    dose: '50mg',
    desc: 'Traditional remedy for prostate congestion and irritation. Relieves burning and feelings of fullness.',
  },
  {
    name: 'Pareira Brava',
    dose: '25mg',
    desc: 'Soothes the urinary tract and eases difficult, straining urination, especially at night.',
  },
  {
    name: 'Hydrangea Arborescens',
    dose: '15mg',
    desc: 'Anti-inflammatory root extract that helps dissolve gravel deposits in the prostate and kidneys.',
  },
];

export const STATS = [
  // { value: '96%', label: 'Satisfaction Rate' },
  { value: 'NAFDAC', label: `Reg. ${NAFDAC_REG_NO}` },
  { value: '4–6 wks', label: 'To First Results' },
  { value: '1,000+', label: 'Men Helped' },
];

export const TRUST_BADGES: Array<{ icon: LucideIcon; label: string }> = [
  { icon: ShieldCheck, label: 'NAFDAC Certified' },
  { icon: Leaf, label: '100% Natural' },
  { icon: Award, label: 'GMP Manufactured' },
  { icon: Truck, label: 'Nationwide Delivery' },
  { icon: CheckCircle2, label: 'No Side Effects Reported' },
];

export const productCardsData = [
    {
        title: 'Menoset',
        description: 'Targeted, non-hormonal botanical support for menstrual cycle comfort, PMS balance, and perimenopausal/menopausal hot flash relief.',
        benefits: [
            'Soothes daytime hot flashes &amp; night sweats',
            'Promotes menstrual flow comfort and regularity',
            '100% Non-hormonal herbal tablets (60 count)'
        ],
        price: "₦15,000",
        priceUnit: "/ 30-day pack",
        image: images.menoset,
        // benefitsIcon: <Sparkles />,
        badge: "NAFDAC CERTIFIED",
        category: "Women's Menstrual & Menopause",
        color: "rose",
        botanicalMatrix: [
            "Black Cohosh",
            "Dong Quai",
            "Vitex (Chasteberry)",
            "Blue Cohosh"
        ],
        cta: {
            text: 'Take a test',
            path: '/menoset-check'
        },
        secondaryCta: {
            text: 'Discover Menoset',
            path: '/menoset'
        }
    },
    {
        title: 'Prostanone',
        description: 'NAFDAC-approved herbal formula that curbs 5-alpha reductase activity, restores steady urinary stream, and reduces frequent night-time bathroom trips.',
        benefits: [
            'Reduces nighttime urination and bladder urgency',
            'Improves urinary flow strength and comfort',
            'NAFDAC Reg. No. A7-4976L · Trusted across Nigeria'
        ],
        price: "₦15,000",
        priceUnit: "/ 20-day pack",
        image: images.prostanone,
        // benefitsIcon: <ShieldCheck />,
        badge: "NAFDAC CERTIFIED",
        category: "Men's Prostate & Urinary Health",
        color: "emerald",
        botanicalMatrix: [
            "Saw Palmetto",
            "Chimaphila Umbellata",
            "Hydrangea Arborescens",
            "Pareira Brava"
        ],
        cta: {
            text: 'Take a test',
            path: '/quiz'
        },
        secondaryCta: {
            text: 'Discover Prostanone',
            path: '/prostanone'
        },
    }
]