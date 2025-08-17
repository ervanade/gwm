import React from 'react'

const page = async ({ params }) => {
    const { locale } = await params
    return (
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
            <h1 className="text-3xl font-bold mb-6">Kebijakan Privasi</h1>

            <p className="mb-4">
                Selamat datang di <strong>gwminchcape.co.id</strong>. Kami berkomitmen
                untuk melindungi dan menghormati privasi Anda. Halaman ini menjelaskan
                bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi
                pribadi Anda saat menggunakan situs web kami.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-3">1. Informasi yang Kami Kumpulkan</h2>
            <p className="mb-4">
                Kami dapat mengumpulkan informasi berikut:
            </p>
            <ul className="list-disc pl-6 mb-4">
                <li>Informasi kontak (nama, email, nomor telepon) saat Anda mengisi formulir.</li>
                <li>Data penggunaan situs (halaman yang dikunjungi, durasi kunjungan).</li>
                <li>Informasi teknis (alamat IP, jenis browser, perangkat yang digunakan).</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-3">2. Penggunaan Informasi</h2>
            <p className="mb-4">Informasi yang kami kumpulkan digunakan untuk:</p>
            <ul className="list-disc pl-6 mb-4">
                <li>Meningkatkan pengalaman pengguna di situs kami.</li>
                <li>Menghubungi Anda terkait pertanyaan atau layanan yang diminta.</li>
                <li>Menganalisis performa situs melalui alat seperti Google Analytics.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-3">3. Cookies</h2>
            <p className="mb-4">
                Situs ini menggunakan cookies untuk meningkatkan pengalaman browsing,
                menyimpan preferensi pengguna, serta analisis pengunjung.
                Anda dapat menonaktifkan cookies melalui pengaturan browser Anda,
                namun beberapa fitur situs mungkin tidak berfungsi optimal.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-3">4. Perlindungan Data</h2>
            <p className="mb-4">
                Kami menerapkan langkah-langkah keamanan yang wajar untuk melindungi
                informasi pribadi Anda. Namun, kami tidak dapat menjamin sepenuhnya
                keamanan data yang dikirimkan melalui internet.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-3">5. Berbagi Informasi</h2>
            <p className="mb-4">
                Kami tidak menjual atau menyewakan data pribadi Anda kepada pihak ketiga.
                Data hanya dapat dibagikan dengan pihak ketiga terpercaya (misalnya penyedia layanan IT)
                sesuai kebutuhan layanan.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-3">6. Hak Anda</h2>
            <p className="mb-4">
                Anda memiliki hak untuk:
            </p>
            <ul className="list-disc pl-6 mb-4">
                <li>Meminta salinan data pribadi Anda.</li>
                <li>Meminta perbaikan atau penghapusan data pribadi Anda.</li>
                <li>Membatasi atau menolak pemrosesan data tertentu.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-3">7. Perubahan Kebijakan</h2>
            <p className="mb-4">
                Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu.
                Perubahan akan dipublikasikan di halaman ini dengan tanggal revisi terbaru.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-3">8. Kontak Kami</h2>
            <p className="mb-4">
                Jika Anda memiliki pertanyaan mengenai kebijakan privasi ini,
                silakan hubungi kami melalui email:{" "}
                <a href="mailto:gwm.info@inchcape.co.id" className="text-teal-500 underline">
                    gwm.info@inchcape.co.id
                </a>.
            </p>
        </div>
    )
}

export default page