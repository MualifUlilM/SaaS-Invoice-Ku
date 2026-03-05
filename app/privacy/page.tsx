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
  title:       "Kebijakan Privasi - InvoiceKu",
  description:
    "Kebijakan privasi InvoiceKu menjelaskan cara kami mengumpulkan dan menggunakan data Anda.",
};

// ─── NAVIGATION SECTIONS ──────────────────────────────────────────────────────

const SECTIONS: NavSection[] = [
  { id: "informasi-yang-dikumpulkan", label: "Informasi yang Kami Kumpulkan"      },
  { id: "cara-penggunaan-data",       label: "Cara Penggunaan Data"               },
  { id: "berbagi-data",               label: "Berbagi Data dengan Pihak Ketiga"   },
  { id: "keamanan-data",              label: "Keamanan Data"                      },
  { id: "hak-pengguna",               label: "Hak Pengguna"                       },
  { id: "cookie",                     label: "Cookie dan Teknologi Serupa"        },
  { id: "perubahan-kebijakan",        label: "Perubahan Kebijakan"                },
  { id: "hubungi-kami",               label: "Hubungi Kami"                       },
];

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function PrivacyPage() {
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
              Kebijakan Privasi
            </h1>
            <p className="text-sm text-slate-500">
              Terakhir diperbarui:{" "}
              <time dateTime="2025-03-13" className="font-medium text-slate-700">
                13 Maret 2025
              </time>
            </p>
            <p className="mt-4 text-base leading-relaxed text-slate-600">
              PT InvoiceKu Teknologi Indonesia (&ldquo;InvoiceKu&rdquo;, &ldquo;kami&rdquo;, atau
              &ldquo;perusahaan&rdquo;) berkomitmen untuk melindungi privasi dan keamanan data
              pribadi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan,
              menggunakan, menyimpan, dan melindungi informasi Anda sesuai dengan
              Undang-Undang Nomor 27 Tahun 2022 tentang Perlindungan Data Pribadi (UU PDP)
              serta peraturan perundang-undangan yang berlaku di Republik Indonesia.
            </p>
          </div>
        </div>
      </div>

      {/* ── Two-column layout ─────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
          {/* Sidebar */}
          <LegalSidebar sections={SECTIONS} title="Kebijakan Privasi" />

          {/* Main content */}
          <LegalContent>

            {/* 1 ── Informasi yang Kami Kumpulkan ───────────────────────── */}
            <LegalSection id="informasi-yang-dikumpulkan" title="1. Informasi yang Kami Kumpulkan">
              <LegalParagraph>
                Dalam rangka menyediakan layanan manajemen invoice yang optimal, InvoiceKu
                mengumpulkan berbagai kategori data pribadi berikut ini:
              </LegalParagraph>

              <LegalHeading3>1.1 Data yang Anda Berikan Secara Langsung</LegalHeading3>
              <LegalList items={[
                <><strong>Data Akun:</strong> nama lengkap, alamat email, nomor telepon, kata sandi terenkripsi, dan foto profil opsional.</>,
                <><strong>Data Bisnis:</strong> nama usaha atau perusahaan, NPWP, alamat bisnis, nomor rekening bank, dan logo perusahaan.</>,
                <><strong>Data Transaksi:</strong> detail invoice yang Anda buat, termasuk nama klien, deskripsi layanan, nominal, dan tanggal jatuh tempo.</>,
                <><strong>Komunikasi:</strong> pesan yang Anda kirimkan kepada tim dukungan kami melalui email atau formulir kontak.</>,
              ]} />

              <LegalHeading3>1.2 Data yang Dikumpulkan Secara Otomatis</LegalHeading3>
              <LegalList items={[
                <><strong>Data Log:</strong> alamat IP, jenis browser, sistem operasi, halaman yang dikunjungi, dan waktu akses.</>,
                <><strong>Data Perangkat:</strong> identifikasi perangkat, resolusi layar, dan zona waktu.</>,
                <><strong>Data Penggunaan:</strong> fitur yang digunakan, frekuensi login, dan pola navigasi dalam aplikasi untuk keperluan peningkatan layanan.</>,
                <><strong>Cookie dan Penyimpanan Lokal:</strong> informasi sesi, preferensi tampilan, dan token autentikasi. Lihat Bagian 6 untuk detail lebih lanjut.</>,
              ]} />

              <LegalHeading3>1.3 Data dari Pihak Ketiga</LegalHeading3>
              <LegalList items={[
                "Informasi verifikasi pembayaran dari Midtrans, seperti status transaksi dan referensi pembayaran.",
                "Konfirmasi pengiriman email dari SendGrid untuk memastikan notifikasi invoice berhasil tersampaikan.",
              ]} />

              <LegalNote>
                Kami hanya mengumpulkan data yang benar-benar diperlukan untuk menyediakan
                layanan (&ldquo;data minimization&rdquo;) sesuai prinsip UU PDP Pasal 16.
              </LegalNote>
            </LegalSection>

            {/* 2 ── Cara Penggunaan Data ─────────────────────────────────── */}
            <LegalSection id="cara-penggunaan-data" title="2. Cara Penggunaan Data">
              <LegalParagraph>
                InvoiceKu menggunakan data pribadi Anda untuk tujuan-tujuan yang sah, yaitu:
              </LegalParagraph>

              <LegalHeading3>2.1 Penyelenggaraan Layanan</LegalHeading3>
              <LegalList items={[
                "Membuat dan mengelola akun pengguna Anda.",
                "Memproses pembuatan, pengiriman, dan pelacakan invoice.",
                "Memfasilitasi transaksi pembayaran melalui payment gateway.",
                "Mengirimkan notifikasi terkait status invoice dan pembayaran.",
              ]} />

              <LegalHeading3>2.2 Peningkatan dan Pengembangan Layanan</LegalHeading3>
              <LegalList items={[
                "Menganalisis pola penggunaan untuk mengidentifikasi area peningkatan produk.",
                "Melakukan pengujian dan debugging fitur baru.",
                "Menghasilkan laporan agregat dan anonim untuk keperluan analisis bisnis internal.",
              ]} />

              <LegalHeading3>2.3 Komunikasi</LegalHeading3>
              <LegalList items={[
                "Mengirimkan email transaksional, termasuk konfirmasi pendaftaran, reset kata sandi, dan notifikasi invoice.",
                "Menyampaikan informasi pembaruan layanan, fitur baru, atau perubahan kebijakan.",
                "Merespons pertanyaan dan permintaan dukungan teknis Anda.",
              ]} />

              <LegalHeading3>2.4 Kepatuhan Hukum</LegalHeading3>
              <LegalList items={[
                "Memenuhi kewajiban pelaporan perpajakan kepada otoritas terkait di Indonesia.",
                "Mematuhi perintah atau permintaan resmi dari instansi pemerintah yang berwenang.",
                "Mencegah, mendeteksi, dan menangani penipuan, penyalahgunaan, atau aktivitas ilegal.",
              ]} />

              <LegalParagraph>
                Kami tidak akan menggunakan data Anda untuk tujuan pemasaran pihak ketiga
                tanpa persetujuan eksplisit Anda terlebih dahulu.
              </LegalParagraph>
            </LegalSection>

            {/* 3 ── Berbagi Data ─────────────────────────────────────────── */}
            <LegalSection id="berbagi-data" title="3. Berbagi Data dengan Pihak Ketiga">
              <LegalParagraph>
                InvoiceKu tidak menjual data pribadi Anda kepada pihak mana pun. Kami hanya
                berbagi data dalam kondisi terbatas berikut:
              </LegalParagraph>

              <LegalHeading3>3.1 Penyedia Layanan (Sub-Prosesor)</LegalHeading3>
              <LegalParagraph>
                Kami bekerja sama dengan penyedia layanan terpercaya yang membantu operasional
                InvoiceKu. Mereka hanya boleh memproses data sesuai instruksi kami:
              </LegalParagraph>
              <LegalList items={[
                <><strong>Midtrans (PT Midtrans)</strong> — payment gateway untuk memproses transaksi pembayaran invoice. Data yang dibagikan: nama, email, dan detail pembayaran. Kebijakan privasi Midtrans berlaku untuk data yang mereka proses.</>,
                <><strong>SendGrid (Twilio Inc.)</strong> — layanan pengiriman email transaksional untuk notifikasi invoice dan komunikasi sistem. Data yang dibagikan: alamat email penerima dan konten notifikasi.</>,
                <><strong>Google Analytics</strong> — layanan analisis penggunaan aplikasi untuk memahami perilaku pengguna secara agregat. Data yang dibagikan: data penggunaan anonim dan data perangkat. Kami telah mengaktifkan anonimisasi IP.</>,
              ]} />

              <LegalHeading3>3.2 Kewajiban Hukum</LegalHeading3>
              <LegalParagraph>
                Kami dapat mengungkapkan data Anda apabila diwajibkan oleh hukum, putusan
                pengadilan, atau perintah otoritas pemerintah yang berwenang di Republik
                Indonesia. Dalam batas yang diizinkan hukum, kami akan memberi tahu Anda
                sebelum melakukan pengungkapan tersebut.
              </LegalParagraph>

              <LegalHeading3>3.3 Pengalihan Bisnis</LegalHeading3>
              <LegalParagraph>
                Apabila InvoiceKu terlibat dalam merger, akuisisi, atau penjualan aset, data
                pribadi Anda dapat dialihkan sebagai bagian dari transaksi tersebut. Kami akan
                memberi notifikasi sebelum data Anda tunduk pada kebijakan privasi yang
                berbeda.
              </LegalParagraph>
            </LegalSection>

            {/* 4 ── Keamanan Data ───────────────────────────────────────── */}
            <LegalSection id="keamanan-data" title="4. Keamanan Data">
              <LegalParagraph>
                Kami menerapkan langkah-langkah teknis dan organisasional yang proporsional
                untuk melindungi data pribadi Anda dari akses tidak sah, perubahan,
                pengungkapan, atau penghancuran:
              </LegalParagraph>

              <LegalList items={[
                <><strong>Enkripsi Data:</strong> semua data yang ditransmisikan antara browser Anda dan server kami dienkripsi menggunakan TLS 1.3. Kata sandi disimpan dalam format hash menggunakan bcrypt dengan salt unik.</>,
                <><strong>Penyimpanan di Indonesia:</strong> seluruh data pengguna disimpan di server yang berlokasi di wilayah Republik Indonesia, sesuai dengan ketentuan UU PDP dan peraturan lokalisasi data yang berlaku.</>,
                <><strong>Akses Terbatas:</strong> hanya karyawan InvoiceKu yang memiliki kebutuhan bisnis yang sah dapat mengakses data pribadi Anda. Semua akses diaudit dan dicatat.</>,
                <><strong>Pemantauan Keamanan:</strong> sistem kami dipantau secara berkelanjutan untuk mendeteksi ancaman keamanan dan potensi pelanggaran data.</>,
                <><strong>Autentikasi Dua Faktor (2FA):</strong> tersedia dan sangat dianjurkan untuk semua akun pengguna.</>,
                <><strong>Pengujian Keamanan Berkala:</strong> kami melakukan penetration testing dan audit keamanan secara berkala oleh pihak independen.</>,
              ]} />

              <LegalParagraph>
                Meskipun kami berupaya keras menjaga keamanan data Anda, tidak ada metode
                transmisi atau penyimpanan data yang 100% aman. Apabila terjadi insiden
                keamanan yang berdampak pada data Anda, kami akan memberitahu Anda dan
                otoritas yang berwenang sesuai ketentuan UU PDP dalam waktu 14 hari kerja
                setelah insiden teridentifikasi.
              </LegalParagraph>
            </LegalSection>

            {/* 5 ── Hak Pengguna ────────────────────────────────────────── */}
            <LegalSection id="hak-pengguna" title="5. Hak Pengguna">
              <LegalParagraph>
                Sesuai dengan UU PDP Pasal 5–14, Anda memiliki hak-hak berikut atas data
                pribadi Anda yang kami proses:
              </LegalParagraph>

              <LegalHeading3>5.1 Hak Akses</LegalHeading3>
              <LegalParagraph>
                Anda berhak memperoleh informasi mengenai data pribadi apa saja yang kami
                miliki tentang Anda, tujuan pemrosesan, serta pihak-pihak yang menerima data
                tersebut. Anda dapat mengajukan permintaan akses melalui menu &ldquo;Pengaturan
                Akun &gt; Data Saya&rdquo; atau melalui email ke legal@invoiceku.id.
              </LegalParagraph>

              <LegalHeading3>5.2 Hak Koreksi</LegalHeading3>
              <LegalParagraph>
                Apabila data pribadi Anda tidak akurat atau tidak lengkap, Anda berhak
                meminta koreksi. Sebagian besar data dapat diperbarui langsung melalui
                halaman profil akun Anda. Untuk perubahan yang memerlukan verifikasi
                tambahan, silakan hubungi tim kami.
              </LegalParagraph>

              <LegalHeading3>5.3 Hak Penghapusan (Right to Erasure)</LegalHeading3>
              <LegalParagraph>
                Anda berhak meminta penghapusan data pribadi Anda dalam kondisi tertentu,
                misalnya apabila data tidak lagi diperlukan untuk tujuan aslinya atau Anda
                mencabut persetujuan. Harap diketahui bahwa kami mungkin wajib mempertahankan
                sebagian data untuk keperluan hukum, termasuk catatan keuangan dan
                perpajakan, selama jangka waktu yang ditetapkan peraturan yang berlaku.
              </LegalParagraph>

              <LegalHeading3>5.4 Hak Pembatasan Pemrosesan</LegalHeading3>
              <LegalParagraph>
                Anda dapat meminta kami untuk membatasi pemrosesan data Anda sementara waktu,
                misalnya saat Anda mengajukan keberatan atas akurasi data atau keabsahan
                pemrosesan.
              </LegalParagraph>

              <LegalHeading3>5.5 Hak Portabilitas Data</LegalHeading3>
              <LegalParagraph>
                Anda berhak menerima salinan data pribadi Anda dalam format yang terstruktur
                dan dapat dibaca mesin (JSON atau CSV) untuk dipindahkan ke layanan lain.
                Fitur ekspor data tersedia di menu &ldquo;Pengaturan Akun &gt; Ekspor Data&rdquo;.
              </LegalParagraph>

              <LegalHeading3>5.6 Hak Menarik Persetujuan</LegalHeading3>
              <LegalParagraph>
                Apabila pemrosesan data didasarkan pada persetujuan Anda, Anda dapat menarik
                persetujuan tersebut kapan saja. Penarikan persetujuan tidak mempengaruhi
                keabsahan pemrosesan yang telah dilakukan sebelumnya.
              </LegalParagraph>

              <LegalNote>
                Untuk mengajukan permohonan terkait hak-hak di atas, kirimkan permintaan
                tertulis ke <strong>legal@invoiceku.id</strong>. Kami akan merespons dalam
                waktu <strong>14 hari kerja</strong> sesuai ketentuan UU PDP.
              </LegalNote>
            </LegalSection>

            {/* 6 ── Cookie ──────────────────────────────────────────────── */}
            <LegalSection id="cookie" title="6. Cookie dan Teknologi Serupa">
              <LegalParagraph>
                InvoiceKu menggunakan cookie dan teknologi penyimpanan lokal untuk meningkatkan
                pengalaman penggunaan layanan kami. Berikut adalah jenis-jenis cookie yang kami
                gunakan:
              </LegalParagraph>

              <LegalHeading3>6.1 Cookie yang Diperlukan (Strictly Necessary)</LegalHeading3>
              <LegalParagraph>
                Cookie ini mutlak diperlukan untuk operasional dasar platform, termasuk
                manajemen sesi login, keamanan (CSRF token), dan preferensi bahasa. Cookie
                jenis ini tidak dapat dinonaktifkan karena akan menyebabkan layanan tidak
                berfungsi dengan benar.
              </LegalParagraph>

              <LegalHeading3>6.2 Cookie Analitik</LegalHeading3>
              <LegalParagraph>
                Kami menggunakan Google Analytics untuk memahami cara pengguna berinteraksi
                dengan platform kami secara agregat dan anonim. Data ini membantu kami
                meningkatkan fungsionalitas dan performa aplikasi. Anda dapat menonaktifkan
                cookie ini melalui halaman pengaturan cookie kami atau melalui browser Anda.
              </LegalParagraph>

              <LegalHeading3>6.3 Cookie Fungsional</LegalHeading3>
              <LegalParagraph>
                Cookie ini menyimpan preferensi Anda seperti tampilan tabel invoice, filter
                default, dan pengaturan notifikasi untuk memberikan pengalaman yang lebih
                personal. Menonaktifkan cookie ini dapat mempengaruhi personalisasi tampilan.
              </LegalParagraph>

              <LegalParagraph>
                Anda dapat mengelola preferensi cookie melalui pengaturan browser Anda.
                Perlu diperhatikan bahwa menonaktifkan semua cookie dapat mempengaruhi
                fungsionalitas layanan InvoiceKu.
              </LegalParagraph>
            </LegalSection>

            {/* 7 ── Perubahan Kebijakan ─────────────────────────────────── */}
            <LegalSection id="perubahan-kebijakan" title="7. Perubahan Kebijakan">
              <LegalParagraph>
                InvoiceKu berhak memperbarui Kebijakan Privasi ini dari waktu ke waktu untuk
                mencerminkan perubahan pada praktik pemrosesan data, fitur layanan baru, atau
                perubahan regulasi yang berlaku. Kami akan memberi tahu Anda mengenai
                perubahan material melalui:
              </LegalParagraph>
              <LegalList items={[
                "Email ke alamat yang terdaftar di akun Anda, paling lambat 14 hari sebelum perubahan berlaku.",
                "Pemberitahuan dalam aplikasi saat Anda login setelah pembaruan kebijakan.",
                "Pembaruan tanggal \"Terakhir diperbarui\" di bagian atas halaman ini.",
              ]} />
              <LegalParagraph>
                Penggunaan berkelanjutan atas layanan InvoiceKu setelah tanggal efektif
                perubahan merupakan bentuk penerimaan Anda atas kebijakan yang telah
                diperbarui. Apabila Anda tidak menyetujui perubahan tersebut, Anda berhak
                menghentikan penggunaan layanan dan meminta penghapusan akun Anda.
              </LegalParagraph>
            </LegalSection>

            {/* 8 ── Hubungi Kami ────────────────────────────────────────── */}
            <LegalSection id="hubungi-kami" title="8. Hubungi Kami">
              <LegalParagraph>
                Apabila Anda memiliki pertanyaan, kekhawatiran, atau permintaan terkait
                Kebijakan Privasi ini atau pemrosesan data pribadi Anda, silakan hubungi
                Petugas Perlindungan Data (Data Protection Officer) kami:
              </LegalParagraph>

              <div className="rounded-xl border border-slate-100 bg-slate-50 p-5 space-y-3">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Perusahaan</span>
                  <span className="text-sm font-medium text-slate-800">PT InvoiceKu Teknologi Indonesia</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Alamat</span>
                  <span className="text-sm text-slate-700">
                    Gedung Menara Selatan Lantai 12<br />
                    Jl. TB Simatupang No. 18, Pasar Minggu<br />
                    Jakarta Selatan, DKI Jakarta 12520<br />
                    Indonesia
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Email</span>
                  <a
                    href="mailto:legal@invoiceku.id"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-800 hover:underline"
                  >
                    legal@invoiceku.id
                  </a>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Waktu Respons</span>
                  <span className="text-sm text-slate-700">Maksimal 14 hari kerja</span>
                </div>
              </div>

              <LegalParagraph>
                Apabila Anda merasa bahwa pemrosesan data pribadi Anda oleh InvoiceKu melanggar
                ketentuan UU PDP, Anda berhak mengajukan pengaduan kepada Lembaga Perlindungan
                Data Pribadi atau instansi pengawas yang ditunjuk oleh pemerintah Republik
                Indonesia sesuai peraturan yang berlaku.
              </LegalParagraph>
            </LegalSection>

          </LegalContent>
        </div>
      </div>
    </SectionWrapper>
  );
}
