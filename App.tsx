
import React, { useState, useEffect } from 'react';
import { SCHOOL_NAME, SCHOOL_MOTTO, TEACHERS, NEWS } from './constants';
import AIChat from './components/AIChat';
import StudentPortal from './components/StudentPortal';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'portal'>('landing');
  const [hasError, setHasError] = useState(false);

  // Error boundary logic (simple)
  useEffect(() => {
    const handleError = (error: ErrorEvent) => {
      console.error("App Crash:", error.message);
      // setHasError(true); // Can be enabled if needed
    };
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Xatolik yuz berdi</h1>
          <p className="text-gray-600 mb-6">Sahifani yuklashda muammo paydo bo'ldi.</p>
          <button onClick={() => window.location.reload()} className="bg-blue-600 text-white px-6 py-2 rounded-full">
            Sahifani yangilash
          </button>
        </div>
      </div>
    );
  }

  const renderLanding = () => (
    <>
      {/* Hero Section */}
      <section id="asosiy" className="relative pt-20 pb-32 flex content-center items-center justify-center min-h-[85vh]">
        <div className="absolute top-0 w-full h-full bg-center bg-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523050853061-80e8a4ff147e?auto=format&fit=crop&q=80&w=2000')" }}>
          <span className="w-full h-full absolute opacity-60 bg-black"></span>
        </div>
        <div className="container relative mx-auto px-4">
          <div className="items-center flex flex-wrap">
            <div className="w-full lg:w-8/12 px-4 ml-auto mr-auto text-center">
              <div className="pr-12">
                <h1 className="text-white font-bold text-5xl md:text-6xl mb-6">
                  {SCHOOL_NAME}
                </h1>
                <p className="mt-4 text-lg text-gray-200 font-light max-w-2xl mx-auto leading-relaxed italic">
                  "{SCHOOL_MOTTO}" — Biz har bir o'quvchining iqtidorini ro'yobga chiqarishga intilamiz.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
                  <button onClick={() => setView('portal')} className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/30">
                    O'quvchi portaliga kirish
                  </button>
                  <a href="#biz-haqimizda" className="bg-white/10 backdrop-blur-sm text-white border border-white/30 px-8 py-4 rounded-full font-bold hover:bg-white/20 transition-all">
                    Maktab haqida
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="relative py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap -mt-32">
            {[
              { label: "O'quvchilar", value: "1200+", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" },
              { label: "Oliy toifali ustozlar", value: "45+", icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" },
              { label: "Yillik bitiruvchilar", value: "150+", icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" },
              { label: "To'garaklar", value: "20+", icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }
            ].map((stat, i) => (
              <div key={i} className="lg:pt-12 pt-6 w-full md:w-3/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-2xl p-8 hover:-translate-y-2 transition-transform duration-300">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-blue-500">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={stat.icon}></path>
                    </svg>
                  </div>
                  <h6 className="text-3xl font-bold text-gray-800">{stat.value}</h6>
                  <p className="mt-2 mb-4 text-gray-500 font-medium">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="biz-haqimizda" className="py-24 bg-gray-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center">
            <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
              <div className="text-blue-600 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
              <h3 className="text-3xl mb-4 font-bold leading-tight">Bizning vazifamiz va maqsadimiz</h3>
              <p className="text-lg font-light leading-relaxed mt-0 mb-6 text-gray-600">
                Bizning maktab 1980-yilda tashkil topgan bo'lib, o'shandan beri minglab shogirdlarni hayot yo'liga kuzatib kelmoqda. Bizning maqsadimiz — zamonaviy texnologiyalar va boy milliy qadriyatlarimizni uyg'unlashtirgan holda barkamol avlodni tarbiyalashdir.
              </p>
              <ul className="list-none mt-6 space-y-3">
                {[
                  "Malakali ustozlar jamoasi",
                  "Zamonaviy kompyuter sinflari",
                  "O'quvchilarni olimpiadalarga tayyorlash",
                  "Yaqin va samimiy muhit"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center">
                    <div className="mr-3 p-1 bg-green-100 rounded-full">
                      <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full md:w-5/12 px-4 mr-auto ml-auto mt-12 md:mt-0">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-2xl rounded-2xl overflow-hidden">
                <img alt="Maktab kutubxonasi" src="https://picsum.photos/id/119/800/600" className="w-full align-middle" />
                <blockquote className="relative p-8 mb-4">
                  <svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 583 95" className="absolute left-0 w-full block h-[95px] -top-[94px]">
                    <polygon points="-30,95 583,95 583,65" className="text-white fill-current"></polygon>
                  </svg>
                  <h4 className="text-xl font-bold text-gray-800">
                    Sifatli ta'lim - farovon kelajak
                  </h4>
                  <p className="text-md font-light mt-2 text-gray-600 italic">
                    "O'qituvchi - jamiyatning eng muhim bo'g'ini. Bizning har bir darsimiz yangi imkoniyatlar eshigidir."
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section id="yangiliklar" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Maktab hayotidan yangiliklar</h2>
            <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {NEWS.map((item) => (
              <div key={item.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    {item.date}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-3 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.summary}</p>
                  <button className="text-blue-600 font-bold text-sm flex items-center hover:translate-x-1 transition-transform">
                    Davomini o'qish
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teachers Section */}
      <section id="ustozlar" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Bizning jamoa</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Tajribali va jonkuyar ustozlarimiz o'quvchilarga eng yaxshi bilim berish yo'lida doim harakatda.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEACHERS.map((teacher) => (
              <div key={teacher.id} className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all">
                <img src={teacher.image} alt={teacher.name} className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-blue-50 ring-4 ring-white" />
                <h4 className="text-xl font-bold text-gray-900">{teacher.name}</h4>
                <p className="text-blue-600 text-sm font-medium mb-2">{teacher.subject}</p>
                <p className="text-gray-500 text-xs">Staj: {teacher.experience}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="aloqa" className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 rounded-lg bg-white border border-gray-100 shadow-xl p-8">
                <h4 className="text-2xl font-semibold mb-6">Bizga xabar yuboring</h4>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-gray-500 text-xs font-bold mb-2">Ism</label>
                  <input type="text" className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-gray-50 rounded text-sm shadow focus:outline-none focus:ring w-full transition-all duration-150" placeholder="To'liq ismingiz" />
                </div>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-gray-500 text-xs font-bold mb-2">Email</label>
                  <input type="email" className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-gray-50 rounded text-sm shadow focus:outline-none focus:ring w-full transition-all duration-150" placeholder="Email manzilingiz" />
                </div>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-gray-500 text-xs font-bold mb-2">Xabar</label>
                  <textarea rows={4} className="border-0 px-3 py-3 placeholder-gray-300 text-gray-600 bg-gray-50 rounded text-sm shadow focus:outline-none focus:ring w-full" placeholder="Xabaringizni yozing..."></textarea>
                </div>
                <div className="text-center mt-6">
                  <button className="bg-blue-600 text-white active:bg-blue-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 w-full" type="button">
                    Yuborish
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-5/12 px-4 ml-auto">
              <h2 className="text-3xl font-bold mb-4">Bog'lanish uchun ma'lumotlar</h2>
              <p className="text-lg leading-relaxed text-gray-600 mb-8">
                Savollaringiz bormi? Biz bilan bog'laning yoki maktabimizga tashrif buyuring.
              </p>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="text-blue-600 mt-1">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  </div>
                  <div className="ml-4">
                    <h5 className="font-bold">Manzil</h5>
                    <p className="text-gray-500">Toshkent shahri, Yunusobod tumani, 19-mavze, 2-uy</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-blue-600 mt-1">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  </div>
                  <div className="ml-4">
                    <h5 className="font-bold">Telefon</h5>
                    <p className="text-gray-500">+998 71 123 45 67</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-blue-600 mt-1">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  </div>
                  <div className="ml-4">
                    <h5 className="font-bold">Email</h5>
                    <p className="text-gray-500">info@35maktab.uz</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 overflow-x-hidden">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center cursor-pointer" onClick={() => setView('landing')}>
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl mr-3">
                35
              </div>
              <span className="font-bold text-xl tracking-tight text-blue-900 hidden sm:block">35-Maktab</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <button onClick={() => setView('landing')} className={`${view === 'landing' ? 'text-blue-600' : 'text-gray-600'} hover:text-blue-600 font-medium transition-colors`}>Asosiy</button>
              <a href="#biz-haqimizda" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Maktab haqida</a>
              <a href="#yangiliklar" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Yangiliklar</a>
              <button onClick={() => setView('portal')} className={`${view === 'portal' ? 'text-blue-600' : 'text-gray-600'} hover:text-blue-600 font-medium transition-colors`}>O'quvchi portali</button>
            </div>
            <div className="flex items-center space-x-4">
              {view === 'landing' ? (
                <button 
                  onClick={() => setView('portal')}
                  className="hidden sm:flex bg-blue-600 text-white px-5 py-2 rounded-full font-bold text-sm hover:bg-blue-700 transition-all shadow-md"
                >
                  Portalga kirish
                </button>
              ) : (
                <button 
                  onClick={() => setView('landing')}
                  className="bg-gray-100 text-gray-700 px-5 py-2 rounded-full font-bold text-sm hover:bg-gray-200 transition-all"
                >
                  Chiqish
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {view === 'landing' ? renderLanding() : <StudentPortal />}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-4/12 mb-8 md:mb-0">
              <div className="flex items-center mb-4 cursor-pointer" onClick={() => setView('landing')}>
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold mr-3">35</div>
                <span className="text-xl font-bold">35-Maktab</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Biz o'quvchilarning faqat bilimini emas, balki shaxsiyatini ham shakllantiramiz. 
                Bilim olish - bu sarguzasht!
              </p>
            </div>
            <div className="w-full md:w-2/12 mb-8 md:mb-0">
              <h5 className="font-bold mb-4 uppercase text-sm tracking-widest text-blue-400">Sahifalar</h5>
              <ul className="text-gray-400 text-sm space-y-2">
                <li><button onClick={() => setView('landing')} className="hover:text-blue-500">Asosiy</button></li>
                <li><button onClick={() => setView('portal')} className="hover:text-blue-500">O'quvchi portali</button></li>
                <li><a href="#biz-haqimizda" className="hover:text-blue-500">Maktab haqida</a></li>
                <li><a href="#yangiliklar" className="hover:text-blue-500">Yangiliklar</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-xs">
            &copy; 2024 {SCHOOL_NAME}. Barcha huquqlar himoyalangan.
          </div>
        </div>
      </footer>

      {/* AI Assistant Button */}
      <AIChat />
    </div>
  );
};

export default App;
