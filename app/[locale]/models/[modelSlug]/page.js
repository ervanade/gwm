import ProductHero from '@/components/hero/ProductHero'
import NavbarProduct from '@/components/navbar/NavbarProduct'
import React from 'react'

const page = () => {
    return (
        <div>
            <ProductHero
                image="/hero-1.jpg"
                title="HAVAL H6 HEV"
                subtitle="Luxury Offroad SUV"
                price="850.000.000"
            />
            <NavbarProduct modelName="H6 HEV" />

            <div id="exterior" className="min-h-screen px-6 py-12 bg-gray-50">
                <h2 className="text-xl font-bold mb-4">Exterior Color</h2>
                {/* Konten warna mobil */}
            </div>

            <div id="features" className="min-h-screen px-6 py-12">
                <h2 className="text-xl font-bold mb-4">Car Features</h2>
                {/* Fitur mobil */}
            </div>

            <div id="specs" className="min-h-screen px-6 py-12 bg-gray-50">
                <h2 className="text-xl font-bold mb-4">Specifications</h2>
                {/* Spesifikasi teknis */}
            </div>

        </div>
    )
}

export default page