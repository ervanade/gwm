import ExteriorColorSection from '@/components/exteriorColor/ExteriorColor'
import ProductHero from '@/components/hero/ProductHero'
import NavbarProduct from '@/components/navbar/NavbarProduct'
import Features from '@/components/product/Features'
import { Gallery } from '@/components/product/Gallery'
import React from 'react'

const page = () => {
    return (
        <div className='bg-white text-dark'>
            <ProductHero
                image="/hero-1.jpg"
                title="HAVAL H6 HEV"
                subtitle="Luxury Offroad SUV"
                price="850.000.000"
            />
            <NavbarProduct modelName="H6 HEV" />

<ExteriorColorSection />

           <Features />

           <Gallery />

        </div>
    )
}

export default page