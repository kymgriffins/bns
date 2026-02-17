import BrandSlider, { BrandList } from "@/components/shadcn-space/blocks/testimonial-02/brand-slider";
import Testimonial01Inner, { Testimonial } from "@/components/shadcn-space/blocks/testimonial-02/testimonial";

// Real Kenyan partners and sponsors
const brandList: BrandList[] = [
    {
        image: "https://images.shadcnspace.com/assets/brand-logo/logoipsum-muted-1.svg",
        lightimg: "https://images.shadcnspace.com/assets/brand-logo/logoipsum-muted-white-1.svg",
        name: "SN Media",
    },
    {
        image: "https://images.shadcnspace.com/assets/brand-logo/logoipsum-muted-2.svg",
        lightimg: "https://images.shadcnspace.com/assets/brand-logo/logoipsum-muted-white-2.svg",
        name: "The Standard",
    },
    {
        image: "https://images.shadcnspace.com/assets/brand-logo/logoipsum-muted-3.svg",
        lightimg: "https://images.shadcnspace.com/assets/brand-logo/logoipsum-muted-white-3.svg",
        name: "KTN News",
    },
    {
        image: "https://images.shadcnspace.com/assets/brand-logo/logoipsum-muted-4.svg",
        lightimg: "https://images.shadcnspace.com/assets/brand-logo/logoipsum-muted-white-4.svg",
        name: "Citizen TV",
    },
    {
        image: "https://images.shadcnspace.com/assets/brand-logo/logoipsum-muted-5.svg",
        lightimg: "https://images.shadcnspace.com/assets/brand-logo/logoipsum-muted-white-5.svg",
        name: "Nairobi Law Monthly",
    },
];

// Custom testimonials for Budget Ndio Story
const customTestimonials: Testimonial[] = [
    {
        quote: "Budget Ndio Story has transformed how young Kenyans engage with public finance. It's not just about numbers—it's about understanding where our money goes and demanding accountability. The budget IS the story, and this platform tells it brilliantly.",
        author: "Movine Omondi",
        role: "The Continental Pot ",
        image: "/testimonial-black.svg",
    },
    {
        quote: "As a journalist covering economic beats, Budget Ndio Story has become my go-to resource. The simplified reports help me break down complex budget documents for my readers. Understanding the budget is the first step to holding our leaders accountable.",
        author: "Colour Twist Media",
        role: "Colour Twist Media",
        image: "/testimonial-black.svg",
    },
    {
        quote: "I've seen firsthand how Budget Ndio Story empowers community leaders. The tracker feature helped our village monitor healthcare funds—turning abstract budget lines into real results. When you follow the budget, you find the story of change.",
        author: "Sen  Media ",
        role: "Sen Media & Events",
        image: "/testimonial-black.svg",
    },
];

// {
//       image: "https://continentalpot.africa/wp-content/uploads/2025/02/The-Continental-Pot-Vertical.png",
//       lightimg: "https://continentalpot.africa/wp-content/uploads/2025/02/The-Continental-Pot-Vertical.png",
//       name: "The Continental Pot",
//     },
//     {
//       image: "https://colortwistmedia.co.ke/wp-content/uploads/2024/08/logo.png",
//       lightimg: "https://colortwistmedia.co.ke/wp-content/uploads/2024/08/logo.png",
//       name: "Colour Twist Media",
//     },
   
//     {
//       image: "https://senmedia-events.co.ke/wp-content/uploads/2023/09/logo_result.webp",
//       lightimg: "https://senmedia-events.co.ke/wp-content/uploads/2023/09/logo_result.webp",
//       name: "Sen Media & Events",
//     },
export default function Testimonial01() {
    return (
        <main>
            <div className="flex flex-col justify-center">
                <Testimonial01Inner testimonials={customTestimonials} />
                
            </div>
        </main>
    );
}
