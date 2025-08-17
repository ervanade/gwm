import PageHero from '@/components/hero/PageHero';
import React from 'react'

const page = async ({ params }) => {
    const { locale } = await params
    const isEN = locale === "en";
    return (
        <main>
            <PageHero
                image="/hero-1.jpg"
                title={locale == "en" ? "Privacy Policy" : "Kebijakan Privasi"}
                subtitle={locale == "en" ? "We are committed to protecting your personal data. Learn how we collect, use, and safeguard your information in our Privacy Policy." : "Kami berkomitmen untuk melindungi data pribadi Anda. Pelajari bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi Anda dalam Kebijakan Privasi ini."}
            />
            <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
                <h1 className="text-3xl font-bold mb-6">
                    {isEN ? "Privacy Policy" : "Kebijakan Privasi"}
                </h1>

                {/* --- Intro --- */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-3">
                        {isEN ? "Your Privacy Matters." : "Privasi Anda Penting."}
                    </h2>
                    <p>
                        {isEN
                            ? "We are committed to protecting your personal data. Learn how we collect, use, and safeguard your information in our Privacy Policy."
                            : "Kami berkomitmen untuk melindungi data pribadi Anda. Pelajari bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi Anda dalam Kebijakan Privasi ini."}
                    </p>
                </section>

                {/* --- Collection --- */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-3">
                        {isEN ? "Collection of Personal Data" : "Pengumpulan Data Pribadi"}
                    </h2>
                    <p className="mb-3">
                        {isEN
                            ? `"Personal data” refers to any data which directly or indirectly identifies you as an individual. We collect and use personal data that we believe to be relevant and necessary to conduct our business with you. The types of personal data we collect may include:`
                            : `"Data pribadi” merujuk pada setiap data yang secara langsung atau tidak langsung mengidentifikasi Anda sebagai individu. Kami mengumpulkan dan menggunakan data pribadi yang relevan dan diperlukan untuk menjalankan bisnis kami dengan Anda. Jenis data pribadi yang kami kumpulkan dapat mencakup:"`}
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>
                            {isEN
                                ? "Contact information (name, email, address, phone number)"
                                : "Informasi kontak (nama, email, alamat, nomor telepon)"}
                        </li>
                        <li>
                            {isEN
                                ? "Unique identifiers (KTP / SIM, passport number)"
                                : "Identitas unik (KTP / SIM, nomor paspor)"}
                        </li>
                        <li>
                            {isEN
                                ? "Billing information (credit card, bank account, billing address)"
                                : "Informasi penagihan (kartu kredit, rekening bank, alamat penagihan)"}
                        </li>
                    </ul>
                </section>

                {/* --- Usage --- */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-3">
                        {isEN ? "Use of Personal Data" : "Penggunaan Data Pribadi"}
                    </h2>
                    <p className="mb-3">
                        {isEN
                            ? "Your personal data may be used for the following purposes:"
                            : "Data pribadi Anda dapat digunakan untuk tujuan berikut:"}
                    </p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>
                            {isEN
                                ? "Purchase of our products/services"
                                : "Pembelian produk/layanan kami"}
                        </li>
                        <li>
                            {isEN
                                ? "Vehicle insurance, financing, leasing, maintenance and repair"
                                : "Asuransi kendaraan, pembiayaan, leasing, perawatan, dan perbaikan"}
                        </li>
                        <li>
                            {isEN
                                ? "Customer service and responding to queries"
                                : "Layanan pelanggan dan merespons pertanyaan"}
                        </li>
                        <li>
                            {isEN
                                ? "Market research, surveys, and promotional updates"
                                : "Riset pasar, survei, dan pembaruan promosi"}
                        </li>
                        <li>
                            {isEN
                                ? "Compliance with applicable laws"
                                : "Kepatuhan terhadap hukum yang berlaku"}
                        </li>
                    </ul>
                </section>

                {/* --- Direct Marketing --- */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-3">Direct Marketing</h2>
                    <p>
                        {isEN
                            ? "We may use your personal data for direct marketing carried out by PT Inchcape Indomobil Energi Baru and its affiliates. This may include promotional emails, product updates, and offers. We will only use your data with your consent or where permitted by law."
                            : "Kami dapat menggunakan data pribadi Anda untuk pemasaran langsung yang dilakukan oleh PT Inchcape Indomobil Energi Baru dan afiliasinya. Ini dapat mencakup email promosi, pembaruan produk, dan penawaran. Kami hanya akan menggunakan data Anda dengan persetujuan Anda atau jika diizinkan oleh hukum."}
                    </p>
                </section>

                {/* --- Disclosure --- */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-3">
                        {isEN ? "Disclosure of Personal Data" : "Pengungkapan Data Pribadi"}
                    </h2>
                    <p className="mb-3">
                        {isEN
                            ? "Your personal data may be disclosed to service providers, affiliates, legal authorities, or in cases of mergers/acquisitions as required."
                            : "Data pribadi Anda dapat diungkapkan kepada penyedia layanan, afiliasi, otoritas hukum, atau dalam kasus merger/akuisisi sebagaimana diwajibkan."}
                    </p>
                </section>

                {/* --- Storage & Retention --- */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-3">
                        {isEN ? "Storage & Retention" : "Penyimpanan & Retensi Data"}
                    </h2>
                    <p>
                        {isEN
                            ? "We may process and store your data outside Indonesia. Data will be erased when no longer needed, unless legally required."
                            : "Kami dapat memproses dan menyimpan data Anda di luar Indonesia. Data akan dihapus jika sudah tidak diperlukan lagi, kecuali diwajibkan secara hukum."}
                    </p>
                </section>

                {/* --- Security --- */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-3">
                        {isEN ? "Commitment to Data Security" : "Komitmen Keamanan Data"}
                    </h2>
                    <p>
                        {isEN
                            ? "We use physical, technological, and organizational measures to safeguard your data. However, no transmission over the Internet is 100% secure."
                            : "Kami menggunakan langkah fisik, teknologi, dan organisasi untuk melindungi data Anda. Namun, transmisi data melalui internet tidak pernah 100% aman."}
                    </p>
                </section>

                {/* --- Cookies --- */}
                <section className="mb-8">
                    <h2 className="text-xl font-semibold mb-3">Cookies</h2>
                    <p>
                        {isEN
                            ? "We use cookies to enhance your browsing experience. You may disable cookies in your browser settings, but some site features may not function properly."
                            : "Kami menggunakan cookies untuk meningkatkan pengalaman browsing Anda. Anda dapat menonaktifkan cookies di pengaturan browser, namun beberapa fitur situs mungkin tidak berfungsi dengan baik."}
                    </p>
                </section>

                {/* --- Contact --- */}
                <section>
                    <h2 className="text-xl font-semibold mb-3">
                        {isEN ? "Contact Us" : "Hubungi Kami"}
                    </h2>
                    <p>
                        {isEN
                            ? "If you have questions about our Privacy Policy, please contact us at Sequis Tower Building, 7th Floor, Jl Jend Sudirman Kav. 71 SCBD Lot11B, Jakarta 12190 or via email at "
                            : "Jika Anda memiliki pertanyaan terkait Kebijakan Privasi ini, silakan hubungi kami di Gedung Sequis Tower Lantai 7, Jl Jend Sudirman Kav. 71 SCBD Lot11B, Jakarta 12190 atau melalui email ke "}
                        <a
                            href="mailto:gwm.info@inchcape.co.id"
                            className="text-teal-600 underline"
                        >
                            gwm.info@inchcape.co.id
                        </a>
                    </p>
                </section>
            </div>
        </main>
    )
}

export default page