import type { Metadata } from "next";
import { SectionWrapper }                             from "@/components/layout";
import { LegalSidebar }                               from "@/components/legal/LegalSidebar";
import {
  LegalContent,
  LegalSection,
  LegalHeading3,
  LegalParagraph,
  LegalList,
  LegalNote,
}                                                     from "@/components/legal/LegalContent";
import type { NavSection }                            from "@/components/legal/LegalSidebar";

// ─── METADATA ─────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title:       "Syarat & Ketentuan - InvoiceKu",
  description:
    "Syarat dan ketentuan penggunaan layanan InvoiceKu.",
};

// ─── NAVIGATION SECTIONS ──────────────────────────────────────────────────────

const SECTIONS: NavSection[] = [
  { id: "penerimaan-syarat",        label: "Penerimaan Syarat"             },
  { id: "deskripsi-layanan",        label: "Deskripsi Layanan"             },
  { id: "akun-pengguna",            label: "Akun Pengguna"                 },
  { id: "penggunaan-yang-diizinkan",label: "Penggunaan yang Diizinkan"     },
  { id: "pembayaran-dan-penagihan", label: "Pembayaran dan Penagihan"      },
  { id: "pembatasan-tanggung-jawab",label: "Pembatasan Tanggung Jawab"     },
  { id: "kekayaan-intelektual",     label: "Kekayaan Intelektual"          },
  { id: "penghentian-layanan",      label: "Penghentian Layanan"           },
  { id: "perubahan-syarat",         label: "Perubahan Syarat"              },
  { id: "hukum-yang-berlaku",       label: "Hukum yang Berlaku"            },
];

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function TermsPage() {
  return (
    <SectionWrapper background="white" noPadding>
      {/* ── Page header ───────────────────────────────────────────────────── */}
      <div className="border-b border-slate-100 bg-gradient-to-br from-indigo-50 via-white to-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="mb-3 inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-indigo-600">
              Dokumen Hukum
            </span>
            <h1 className="mb-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Syarat dan Ketentuan
            </h1>
            <p className="text-sm text-slate-500">
              Terakhir diperbarui:{" "}
              <time dateTime="2025-03-13" className="font-medium text-slate-700">
                13 Maret 2025
              </time>
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              Selamat datang di InvoiceKu. Syarat dan Ketentuan ini merupakan perjanjian
              yang mengikat secara hukum antara Anda (&ldquo;Pengguna&rdquo;) dan
              PT InvoiceKu Teknologi Indonesia (&ldquo;InvoiceKu&rdquo;) yang mengatur
              penggunaan platform, aplikasi, dan layanan yang kami sediakan. Dengan
              mengakses atau menggunakan layanan kami, Anda menyatakan telah membaca,
              memahami, dan menyetujui seluruh ketentuan dalam dokumen ini.
            </p>
          </div>
        </div>
      </div>

      {/* ── Two-column layout ─────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
          {/* Sidebar */}
          <LegalSidebar sections={SECTIONS} title="Syarat dan Ketentuan" />

          {/* Main content */}
          <LegalContent>

            {/* 1 ── Penerimaan Syarat ────────────────────────────────────── */}
            <LegalSection id="penerimaan-syarat" title="1. Penerimaan Syarat">
              <LegalParagraph>
                Dengan mendaftar akun, mengakses, atau menggunakan layanan InvoiceKu dalam
                bentuk apa pun, Anda menyatakan bahwa:
              </LegalParagraph>
              <LegalList ordered items={[
                "Anda berusia minimal 18 tahun atau telah memiliki kapasitas hukum penuh untuk membuat perjanjian yang mengikat.",
                "Apabila Anda mendaftar atas nama suatu badan usaha, Anda memiliki kewenangan untuk mengikat badan usaha tersebut pada Syarat dan Ketentuan ini.",
                "Anda telah membaca, memahami, dan setuju untuk tunduk pada Syarat dan Ketentuan ini beserta Kebijakan Privasi kami.",
                "Anda akan mematuhi seluruh peraturan perundang-undangan yang berlaku di Republik Indonesia terkait penggunaan layanan ini.",
              ]} />
              <LegalParagraph>
                Apabila Anda tidak menyetujui salah satu ketentuan dalam dokumen ini,
                Anda tidak diizinkan untuk menggunakan layanan InvoiceKu.
              </LegalParagraph>
            </LegalSection>

            {/* 2 ── Deskripsi Layanan ───────────────────────────────────── */}
            <LegalSection id="deskripsi-layanan" title="2. Deskripsi Layanan">
              <LegalParagraph>
                InvoiceKu adalah platform manajemen invoice berbasis cloud yang dioperasikan
                oleh PT InvoiceKu Teknologi Indonesia, sebuah perusahaan teknologi yang
                berdomisili dan beroperasi di Republik Indonesia. Layanan kami mencakup:
              </LegalParagraph>
              <LegalList items={[
                "Pembuatan, pengiriman, dan pengelolaan invoice secara digital.",
                "Pelacakan status pembayaran secara real-time.",
                "Manajemen kontak klien dan daftar produk/layanan.",
                "Laporan keuangan dan ringkasan pendapatan.",
                "Integrasi dengan payment gateway untuk menerima pembayaran online.",
                "Akses API untuk pengguna paket Enterprise guna integrasi dengan sistem eksternal.",
                "Fitur kolaborasi tim untuk bisnis dengan lebih dari satu pengguna.",
              ]} />

              <LegalHeading3>2.1 Ketersediaan Layanan</LegalHeading3>
              <LegalParagraph>
                InvoiceKu berupaya untuk menjaga ketersediaan layanan selama 99,5% dalam
                sebulan (&ldquo;uptime SLA&rdquo;). Jadwal pemeliharaan yang direncanakan
                akan diumumkan minimal 24 jam sebelumnya melalui email dan halaman status di
                status.invoiceku.id. InvoiceKu tidak bertanggung jawab atas gangguan yang
                disebabkan oleh faktor di luar kendali kami, termasuk gangguan infrastruktur
                internet nasional atau bencana alam.
              </LegalParagraph>

              <LegalHeading3>2.2 Perubahan Layanan</LegalHeading3>
              <LegalParagraph>
                InvoiceKu berhak menambah, mengubah, atau menghentikan fitur-fitur tertentu
                dalam layanan. Untuk perubahan yang bersifat material, kami akan memberikan
                pemberitahuan terlebih dahulu minimal 30 hari sebelum perubahan berlaku.
              </LegalParagraph>
            </LegalSection>

            {/* 3 ── Akun Pengguna ───────────────────────────────────────── */}
            <LegalSection id="akun-pengguna" title="3. Akun Pengguna">
              <LegalHeading3>3.1 Pendaftaran Akun</LegalHeading3>
              <LegalParagraph>
                Untuk menggunakan layanan InvoiceKu, Anda diwajibkan membuat akun dengan
                menyediakan informasi yang akurat, lengkap, dan terkini. Anda bertanggung
                jawab untuk memperbarui informasi akun apabila terjadi perubahan.
              </LegalParagraph>

              <LegalHeading3>3.2 Keamanan Akun</LegalHeading3>
              <LegalList items={[
                "Anda bertanggung jawab penuh atas kerahasiaan kata sandi dan keamanan akun Anda.",
                "Anda wajib segera memberitahu InvoiceKu apabila mengetahui atau mencurigai adanya akses tidak sah ke akun Anda melalui security@invoiceku.id.",
                "InvoiceKu tidak bertanggung jawab atas kerugian yang timbul akibat kelalaian Anda dalam menjaga keamanan kata sandi.",
                "Anda dilarang berbagi kredensial akun dengan pihak lain. Untuk kebutuhan akses multi-pengguna, gunakan fitur manajemen tim yang tersedia.",
              ]} />

              <LegalHeading3>3.3 Satu Akun Per Pengguna</LegalHeading3>
              <LegalParagraph>
                Setiap individu hanya diizinkan memiliki satu akun InvoiceKu. Pembuatan
                beberapa akun untuk menghindari batasan paket, memanfaatkan promosi secara
                berulang, atau tujuan penyalahgunaan lainnya merupakan pelanggaran yang dapat
                mengakibatkan penghentian semua akun terkait.
              </LegalParagraph>
            </LegalSection>

            {/* 4 ── Penggunaan yang Diizinkan ──────────────────────────── */}
            <LegalSection id="penggunaan-yang-diizinkan" title="4. Penggunaan yang Diizinkan">
              <LegalHeading3>4.1 Penggunaan yang Diperbolehkan</LegalHeading3>
              <LegalParagraph>
                Layanan InvoiceKu hanya boleh digunakan untuk tujuan bisnis yang sah, meliputi:
              </LegalParagraph>
              <LegalList items={[
                "Pembuatan dan pengiriman invoice kepada klien atas jasa atau produk yang sah.",
                "Pengelolaan keuangan bisnis Anda sendiri.",
                "Integrasi dengan sistem bisnis Anda melalui API (khusus paket Enterprise).",
              ]} />

              <LegalHeading3>4.2 Larangan Penggunaan</LegalHeading3>
              <LegalParagraph>
                Anda dilarang keras menggunakan layanan InvoiceKu untuk:
              </LegalParagraph>
              <LegalList items={[
                "Aktivitas yang melanggar hukum atau peraturan yang berlaku di Republik Indonesia, termasuk namun tidak terbatas pada tindak pidana penipuan, pencucian uang, atau pelanggaran perpajakan.",
                "Membuat invoice atau dokumen keuangan palsu, fiktif, atau menyesatkan.",
                "Melakukan reverse engineering, mendekompilasi, atau mencoba mengakses kode sumber platform.",
                "Menggunakan bot, scraper, atau alat otomasi apa pun tanpa izin tertulis dari InvoiceKu.",
                "Mengirimkan spam, konten berbahaya, atau konten yang melanggar hak kekayaan intelektual pihak lain.",
                "Mengganggu, merusak, atau membebani infrastruktur layanan InvoiceKu secara tidak wajar.",
                "Mengakses akun pengguna lain tanpa izin.",
              ]} />

              <LegalHeading3>4.3 Ketentuan Penggunaan API (Paket Enterprise)</LegalHeading3>
              <LegalParagraph>
                Pengguna paket Enterprise yang telah menerima API key diberikan hak terbatas,
                non-eksklusif, dan tidak dapat dipindahtangankan untuk menggunakan API
                InvoiceKu, dengan ketentuan tambahan sebagai berikut:
              </LegalParagraph>
              <LegalList items={[
                "API key bersifat rahasia dan dilarang dibagikan kepada pihak ketiga mana pun.",
                "Batas penggunaan API (rate limit) yang berlaku sesuai paket wajib dipatuhi. Pelanggaran batas ini dapat mengakibatkan pemblokiran sementara atau permanen.",
                "Penggunaan API untuk membangun produk atau layanan yang bersaing langsung dengan InvoiceKu dilarang.",
                "InvoiceKu berhak memperbarui spesifikasi API dengan pemberitahuan minimal 30 hari untuk perubahan yang tidak kompatibel ke belakang (breaking changes).",
                "Seluruh panggilan API harus menyertakan header autentikasi yang valid. Penyalahgunaan API key merupakan tanggung jawab pemegang akun.",
              ]} />

              <LegalNote>
                InvoiceKu berhak menangguhkan atau mencabut akses API tanpa pemberitahuan
                apabila terdeteksi penggunaan yang melanggar ketentuan ini atau berpotensi
                membahayakan stabilitas sistem.
              </LegalNote>
            </LegalSection>

            {/* 5 ── Pembayaran dan Penagihan ────────────────────────────── */}
            <LegalSection id="pembayaran-dan-penagihan" title="5. Pembayaran dan Penagihan">
              <LegalHeading3>5.1 Paket Berlangganan</LegalHeading3>
              <LegalParagraph>
                InvoiceKu menawarkan berbagai paket berlangganan (Starter, Pro, dan Enterprise)
                dengan harga yang tercantum di halaman Harga kami. Harga yang ditampilkan
                sudah termasuk PPN 11% sesuai peraturan perpajakan Indonesia yang berlaku.
              </LegalParagraph>

              <LegalHeading3>5.2 Siklus Penagihan</LegalHeading3>
              <LegalList items={[
                "Berlangganan bulanan: ditagihkan setiap bulan pada tanggal yang sama dengan tanggal pertama kali berlangganan.",
                "Berlangganan tahunan: ditagihkan di muka untuk periode 12 bulan dan mendapatkan diskon sesuai yang tertera di halaman Harga.",
                "Apabila pembayaran gagal, kami akan mencoba menagih kembali dalam 3 hari kerja berikutnya. Kegagalan pembayaran berulang dapat mengakibatkan pembekuan sementara akun.",
              ]} />

              <LegalHeading3>5.3 Metode Pembayaran</LegalHeading3>
              <LegalParagraph>
                InvoiceKu menerima pembayaran melalui Midtrans, yang mendukung berbagai metode
                pembayaran termasuk kartu kredit/debit Visa dan Mastercard, transfer bank
                (BCA, BNI, BRI, Mandiri, dan lainnya), dompet digital (GoPay, OVO, Dana),
                serta gerai minimarket (Alfamart, Indomaret). Semua transaksi diproses dalam
                mata uang Rupiah (IDR).
              </LegalParagraph>

              <LegalHeading3>5.4 Kebijakan Refund</LegalHeading3>
              <LegalList items={[
                <><strong>Paket Bulanan:</strong> tidak ada pengembalian dana (non-refundable) untuk masa berlangganan yang sedang berjalan. Anda dapat membatalkan kapan saja dan layanan akan tetap aktif hingga akhir periode yang dibayarkan.</>,
                <><strong>Paket Tahunan:</strong> pengembalian dana prorata tersedia dalam 14 hari pertama sejak tanggal pembayaran, dengan pengurangan biaya administrasi sebesar Rp 50.000. Setelah 14 hari, tidak ada pengembalian dana.</>,
                <><strong>Pengecualian:</strong> pengembalian dana penuh akan diberikan apabila InvoiceKu mengalami gangguan layanan yang melebihi 72 jam berturut-turut yang disebabkan oleh faktor dalam kendali kami.</>,
              ]} />

              <LegalHeading3>5.5 Kenaikan Harga</LegalHeading3>
              <LegalParagraph>
                InvoiceKu berhak mengubah harga berlangganan dengan pemberitahuan minimal
                30 hari melalui email. Pengguna berlangganan tahunan akan terlindungi dari
                kenaikan harga hingga akhir periode berlangganan yang sedang berjalan.
              </LegalParagraph>
            </LegalSection>

            {/* 6 ── Pembatasan Tanggung Jawab ──────────────────────────── */}
            <LegalSection id="pembatasan-tanggung-jawab" title="6. Pembatasan Tanggung Jawab">
              <LegalHeading3>6.1 Penyangkalan Jaminan</LegalHeading3>
              <LegalParagraph>
                Layanan InvoiceKu disediakan &ldquo;sebagaimana adanya&rdquo; (<em>as is</em>) dan
                &ldquo;sebagaimana tersedia&rdquo; (<em>as available</em>) tanpa jaminan dalam
                bentuk apa pun, baik tersurat maupun tersirat, termasuk namun tidak terbatas
                pada jaminan kelayakan untuk tujuan tertentu, akurasi, keandalan, atau
                ketiadaan gangguan.
              </LegalParagraph>

              <LegalHeading3>6.2 Batasan Ganti Rugi</LegalHeading3>
              <LegalParagraph>
                Sejauh yang diizinkan oleh hukum yang berlaku, total tanggung jawab InvoiceKu
                kepada Anda atas semua klaim yang timbul dari atau terkait dengan penggunaan
                layanan tidak akan melebihi jumlah yang Anda bayarkan kepada InvoiceKu dalam
                12 bulan terakhir sebelum kejadian yang menimbulkan klaim tersebut.
              </LegalParagraph>

              <LegalHeading3>6.3 Pengecualian Kerugian Tidak Langsung</LegalHeading3>
              <LegalParagraph>
                InvoiceKu tidak bertanggung jawab atas kerugian yang bersifat tidak langsung,
                insidental, khusus, atau konsekuensial, termasuk kehilangan keuntungan, data,
                atau goodwill, meskipun InvoiceKu telah diberitahu tentang kemungkinan
                kerugian tersebut.
              </LegalParagraph>

              <LegalNote>
                Beberapa yurisdiksi tidak mengizinkan pembatasan tanggung jawab tertentu.
                Dalam hal ini, batasan di atas berlaku sejauh yang diizinkan oleh hukum
                yang berlaku di wilayah Anda.
              </LegalNote>
            </LegalSection>

            {/* 7 ── Kekayaan Intelektual ────────────────────────────────── */}
            <LegalSection id="kekayaan-intelektual" title="7. Kekayaan Intelektual">
              <LegalHeading3>7.1 Hak Kekayaan Intelektual InvoiceKu</LegalHeading3>
              <LegalParagraph>
                Seluruh hak kekayaan intelektual atas platform InvoiceKu, termasuk namun
                tidak terbatas pada perangkat lunak, desain antarmuka, merek dagang, logo,
                konten editorial, dan dokumentasi, adalah milik eksklusif PT InvoiceKu
                Teknologi Indonesia atau pemberi lisensinya. Hak-hak tersebut dilindungi
                oleh Undang-Undang Nomor 28 Tahun 2014 tentang Hak Cipta dan peraturan
                kekayaan intelektual Indonesia lainnya.
              </LegalParagraph>

              <LegalHeading3>7.2 Lisensi Penggunaan</LegalHeading3>
              <LegalParagraph>
                InvoiceKu memberikan kepada Anda lisensi terbatas, non-eksklusif, tidak dapat
                dipindahtangankan, dan dapat dicabut untuk mengakses dan menggunakan layanan
                semata-mata untuk tujuan bisnis internal Anda sesuai dengan Syarat dan
                Ketentuan ini.
              </LegalParagraph>

              <LegalHeading3>7.3 Data Pengguna</LegalHeading3>
              <LegalParagraph>
                Anda mempertahankan kepemilikan penuh atas semua data, konten, dan informasi
                yang Anda unggah atau buat melalui layanan InvoiceKu (&ldquo;Konten
                Pengguna&rdquo;). Dengan menggunakan layanan kami, Anda memberikan InvoiceKu
                lisensi terbatas untuk menyimpan, memproses, dan menampilkan Konten Pengguna
                semata-mata untuk tujuan menyediakan layanan kepada Anda.
              </LegalParagraph>

              <LegalHeading3>7.4 Masukan dan Saran</LegalHeading3>
              <LegalParagraph>
                Apabila Anda memberikan masukan, saran, atau ide terkait layanan InvoiceKu,
                Anda memberikan InvoiceKu hak bebas royalti yang tidak terbatas untuk
                menggunakan masukan tersebut dalam pengembangan produk tanpa kewajiban
                kompensasi apa pun kepada Anda.
              </LegalParagraph>
            </LegalSection>

            {/* 8 ── Penghentian Layanan ──────────────────────────────────── */}
            <LegalSection id="penghentian-layanan" title="8. Penghentian Layanan">
              <LegalHeading3>8.1 Penghentian oleh Pengguna</LegalHeading3>
              <LegalParagraph>
                Anda dapat menghentikan berlangganan kapan saja melalui menu &ldquo;Pengaturan
                Akun &gt; Berlangganan &gt; Batalkan Berlangganan&rdquo;. Akun akan tetap aktif
                hingga akhir periode berlangganan yang telah dibayarkan. Setelah periode
                berakhir, akun akan beralih ke paket Gratis (apabila tersedia) atau dinonaktifkan.
              </LegalParagraph>

              <LegalHeading3>8.2 Penghentian oleh InvoiceKu</LegalHeading3>
              <LegalParagraph>
                InvoiceKu berhak menangguhkan atau menghentikan akun Anda dengan pemberitahuan
                14 hari apabila:
              </LegalParagraph>
              <LegalList items={[
                "Terdapat keterlambatan pembayaran yang melebihi 30 hari.",
                "Terdapat pelanggaran terhadap Syarat dan Ketentuan ini.",
                "InvoiceKu menghentikan operasional layanannya.",
              ]} />
              <LegalParagraph>
                Dalam kasus pelanggaran serius, termasuk penipuan, aktivitas ilegal, atau
                serangan terhadap infrastruktur kami, InvoiceKu berhak menangguhkan akun
                secara langsung tanpa pemberitahuan sebelumnya.
              </LegalParagraph>

              <LegalHeading3>8.3 Ekspor Data Setelah Penghentian</LegalHeading3>
              <LegalParagraph>
                Setelah akun dinonaktifkan, Anda memiliki waktu 30 hari untuk mengekspor
                data Anda. Setelah periode ini, InvoiceKu berhak menghapus data Anda secara
                permanen sesuai kebijakan retensi data kami, kecuali apabila hukum yang
                berlaku mewajibkan penyimpanan lebih lama.
              </LegalParagraph>
            </LegalSection>

            {/* 9 ── Perubahan Syarat ────────────────────────────────────── */}
            <LegalSection id="perubahan-syarat" title="9. Perubahan Syarat">
              <LegalParagraph>
                InvoiceKu berhak memperbarui Syarat dan Ketentuan ini dari waktu ke waktu.
                Perubahan material akan dikomunikasikan melalui:
              </LegalParagraph>
              <LegalList items={[
                "Notifikasi email ke alamat yang terdaftar, minimal 30 hari sebelum perubahan berlaku.",
                "Banner pemberitahuan dalam aplikasi saat Anda login.",
                "Pembaruan tanggal \"Terakhir diperbarui\" pada dokumen ini.",
              ]} />
              <LegalParagraph>
                Penggunaan layanan setelah tanggal efektif perubahan merupakan penerimaan
                Anda terhadap syarat yang diperbarui. Apabila Anda tidak menyetujui
                perubahan tersebut, Anda wajib menghentikan penggunaan layanan sebelum
                tanggal efektif perubahan dan dapat mengajukan pengembalian dana prorata
                untuk berlangganan tahunan yang masih berlaku.
              </LegalParagraph>
            </LegalSection>

            {/* 10 ── Hukum yang Berlaku ─────────────────────────────────── */}
            <LegalSection id="hukum-yang-berlaku" title="10. Hukum yang Berlaku">
              <LegalHeading3>10.1 Yurisdiksi</LegalHeading3>
              <LegalParagraph>
                Syarat dan Ketentuan ini dibuat, diatur, dan ditafsirkan berdasarkan Hukum
                Republik Indonesia. PT InvoiceKu Teknologi Indonesia beroperasi dan
                berdomisili di Jakarta Selatan, Indonesia.
              </LegalParagraph>

              <LegalHeading3>10.2 Penyelesaian Sengketa</LegalHeading3>
              <LegalParagraph>
                Apabila timbul perselisihan antara Anda dan InvoiceKu yang berkaitan dengan
                Syarat dan Ketentuan ini atau penggunaan layanan, para pihak sepakat untuk
                menyelesaikannya melalui tahapan berikut:
              </LegalParagraph>
              <LegalList ordered items={[
                "Musyawarah mufakat secara langsung antara para pihak dalam waktu 30 hari kalender sejak sengketa muncul.",
                "Apabila musyawarah gagal, sengketa akan diselesaikan melalui mediasi yang difasilitasi oleh Lembaga Alternatif Penyelesaian Sengketa (LAPS) yang diakui di Indonesia.",
                "Apabila mediasi tidak menghasilkan penyelesaian, sengketa akan dibawa ke Pengadilan Negeri Jakarta Selatan sebagai pengadilan yang berwenang dan para pihak setuju untuk tunduk pada yurisdiksi tersebut.",
              ]} />

              <LegalHeading3>10.3 Keterpisahan Ketentuan</LegalHeading3>
              <LegalParagraph>
                Apabila salah satu ketentuan dalam Syarat dan Ketentuan ini dinyatakan tidak
                sah atau tidak dapat diberlakukan oleh pengadilan yang berwenang, ketentuan
                tersebut akan dianggap terpisah dan tidak mempengaruhi keabsahan
                ketentuan-ketentuan lainnya yang tetap berlaku penuh.
              </LegalParagraph>

              <div className="rounded-xl border border-slate-100 bg-slate-50 p-5 space-y-3">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Perusahaan</span>
                  <span className="text-sm font-medium text-slate-800">PT InvoiceKu Teknologi Indonesia</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Domisili Hukum</span>
                  <span className="text-sm text-slate-700">
                    Jakarta Selatan, DKI Jakarta, Republik Indonesia
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Pertanyaan Hukum</span>
                  <a
                    href="mailto:legal@invoiceku.id"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-800 hover:underline"
                  >
                    legal@invoiceku.id
                  </a>
                </div>
              </div>
            </LegalSection>

          </LegalContent>
        </div>
      </div>
    </SectionWrapper>
  );
}
