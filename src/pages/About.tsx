import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Coffee, Users, Award, Heart, MapPin, Clock } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: <Coffee className="h-8 w-8 text-coffee-primary" />,
      title: "Kualitas Premium",
      description: "Hanya menggunakan biji kopi pilihan terbaik dari petani lokal Indonesia dengan standar kualitas internasional."
    },
    {
      icon: <Users className="h-8 w-8 text-coffee-primary" />,
      title: "Komunitas Hangat",
      description: "Menciptakan ruang yang nyaman untuk semua kalangan, dari mahasiswa hingga profesional, untuk menikmati waktu bersama."
    },
    {
      icon: <Award className="h-8 w-8 text-coffee-primary" />,
      title: "Keahlian Barista",
      description: "Tim barista berpengalaman dan terlatih yang berdedikasi menghadirkan cita rasa terbaik di setiap cangkir."
    },
    {
      icon: <Heart className="h-8 w-8 text-coffee-primary" />,
      title: "Dibuat dengan Cinta",
      description: "Setiap produk kami dibuat dengan perhatian penuh dan kecintaan terhadap seni pembuatan kopi yang berkualitas."
    }
  ];

  const milestones = [
    {
      year: "2020",
      title: "Awal Perjalanan",
      description: "Ngopi Bro didirikan dengan visi menjadi tempat ngopi favorit para bro dan sista di Jakarta."
    },
    {
      year: "2021",
      title: "Ekspansi Menu",
      description: "Menambah berbagai varian kopi dan minuman specialty untuk memenuhi selera yang beragam."
    },
    {
      year: "2022",
      title: "Partnership Petani",
      description: "Membangun kerjasama langsung dengan petani kopi lokal untuk menjamin kualitas dan kesejahteraan."
    },
    {
      year: "2023",
      title: "Penghargaan",
      description: "Meraih penghargaan 'Best Local Coffee Shop' dari Jakarta Coffee Community."
    },
    {
      year: "2024",
      title: "Go Digital",
      description: "Meluncurkan platform online untuk memudahkan pelanggan memesan favorit mereka."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="bg-gradient-hero py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-coffee-cream mb-4">
            Tentang Ngopi Bro
          </h1>
          <p className="text-xl text-coffee-cream/90 max-w-2xl mx-auto">
            Cerita di balik brand kopi yang mengutamakan kualitas dan kehangatan persahabatan
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-card shadow-coffee border-coffee-secondary/20">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-3xl font-bold text-coffee-dark mb-6 text-center">
                Cerita Kami
              </h2>
              <div className="prose prose-lg max-w-none text-coffee-accent/90 leading-relaxed">
                <p className="mb-6">
                  <strong className="text-coffee-primary">Ngopi Bro</strong> lahir dari kecintaan mendalam terhadap kopi dan 
                  keinginan untuk menciptakan ruang yang hangat bagi komunitas. Dimulai dari sebuah mimpi sederhana 
                  pada tahun 2020, kami ingin menghadirkan pengalaman ngopi yang tidak hanya memuaskan lidah, 
                  tetapi juga menghangatkan hati.
                </p>
                
                <p className="mb-6">
                  Nama <em>"Ngopi Bro"</em> sendiri mencerminkan filosofi kami - ngopi yang santai, hangat, dan 
                  persahabatan yang tulus. Kami percaya bahwa secangkir kopi bukan hanya minuman, tetapi medium 
                  untuk mempererat hubungan, berbagi cerita, dan menciptakan kenangan indah.
                </p>
                
                <p className="mb-6">
                  Dengan komitmen pada kualitas premium dan service yang ramah, kami selalu berusaha memberikan 
                  yang terbaik. Setiap biji kopi yang kami gunakan dipilih secara teliti dari petani lokal Indonesia, 
                  mendukung ekonomi dalam negeri sekaligus menjaga cita rasa autentik kopi nusantara.
                </p>
                
                <p>
                  Hari ini, <strong className="text-coffee-primary">Ngopi Bro</strong> bukan hanya tempat minum kopi, 
                  tetapi rumah kedua bagi para pecinta kopi, tempat berkreasi, berdiskusi, dan menikmati momen 
                  berharga bersama teman, keluarga, dan komunitas.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-coffee-cream/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-coffee-dark mb-4">
              Nilai-Nilai Kami
            </h2>
            <p className="text-xl text-coffee-accent/80 max-w-2xl mx-auto">
              Prinsip-prinsip yang memandu setiap langkah perjalanan Ngopi Bro
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center bg-gradient-card shadow-card hover:shadow-coffee transition-all duration-300 hover:scale-105 border-coffee-secondary/20">
                <CardHeader className="pb-4">
                  <div className="flex justify-center mb-4">
                    {value.icon}
                  </div>
                  <CardTitle className="text-coffee-dark text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-coffee-accent/80 text-sm leading-relaxed">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-coffee-dark mb-4">
              Perjalanan Kami
            </h2>
            <p className="text-xl text-coffee-accent/80">
              Milestone penting dalam sejarah Ngopi Bro
            </p>
          </div>

          <div className="space-y-8">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                <div className="bg-coffee-primary text-coffee-cream font-bold text-lg py-2 px-4 rounded-full min-w-20 text-center">
                  {milestone.year}
                </div>
                <Card className="flex-1 bg-gradient-card shadow-card border-coffee-secondary/20">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-coffee-dark text-lg mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-coffee-accent/80">
                      {milestone.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 bg-coffee-accent text-coffee-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Kunjungi Kami
            </h2>
            <p className="text-xl text-coffee-cream/90">
              Kami menunggu kehadiran para bro dan sista di kedai kami
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-4">
              <div className="bg-coffee-secondary/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <MapPin className="h-8 w-8 text-coffee-secondary" />
              </div>
              <h3 className="text-xl font-semibold">Alamat</h3>
              <p className="text-coffee-cream/80">
                Jl. Kopi Nikmat No. 123<br />
                Jakarta Selatan, 12345<br />
                Indonesia
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-coffee-secondary/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <Clock className="h-8 w-8 text-coffee-secondary" />
              </div>
              <h3 className="text-xl font-semibold">Jam Buka</h3>
              <p className="text-coffee-cream/80">
                Senin - Jumat: 07:00 - 22:00<br />
                Sabtu - Minggu: 08:00 - 23:00<br />
                Buka Setiap Hari
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-coffee-secondary/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
                <Coffee className="h-8 w-8 text-coffee-secondary" />
              </div>
              <h3 className="text-xl font-semibold">Kontak</h3>
              <p className="text-coffee-cream/80">
                Telepon: +62 812-3456-7890<br />
                Email: info@ngopibro.com<br />
                Instagram: @ngopibro_official
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;