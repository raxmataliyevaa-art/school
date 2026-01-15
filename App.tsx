
import React, { useState, useEffect } from 'react';
import { SCHOOL_NAME, SCHOOL_MOTTO, TEACHERS, NEWS } from './constants';
import AIChat from './components/AIChat';
import StudentPortal from './components/StudentPortal';
import Login from './components/Login';
import AdminPanel from './components/AdminPanel';
import PortalAuth from './components/PortalAuth';

const App: React.FC = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [view, setView] = useState<'landing' | 'portal'>('landing');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(
    localStorage.getItem('isAdmin') === 'true'
  );
  const [studentName, setStudentName] = useState<string | null>(
    localStorage.getItem('studentName')
  );
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  const handleStudentAuth = (name: string) => {
    setStudentName(name);
    localStorage.setItem('studentName', name);
  };

  const confirmLogout = () => {
    setStudentName(null);
    localStorage.removeItem('studentName');
    setView('landing');
    setShowLogoutConfirm(false);
  };

  // Auth check for admin
  if (currentPath === '/admin' && !isAdminAuthenticated) {
    navigate('/login');
    return null;
  }

  if (currentPath === '/login') {
    return <Login onLoginSuccess={() => {
      setIsAdminAuthenticated(true);
      navigate('/admin');
    }} onBack={() => navigate('/')} />;
  }

  if (currentPath === '/admin') {
    return <AdminPanel onLogout={() => {
      setIsAdminAuthenticated(false);
      localStorage.removeItem('isAdmin');
      navigate('/');
    }} />;
  }

  const renderLanding = () => (
    <>
      {/* Hero Section */}
      <section id="asosiy" className="relative pt-24 pb-40 flex content-center items-center justify-center min-h-[90vh] bg-blue-900">
        <div className="absolute top-0 w-full h-full bg-center bg-cover transition-all duration-1000 transform hover:scale-105" 
             style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523050853061-80e8a4ff147e?q=80&w=2000&auto=format&fit=crop')" }}>
          <span className="w-full h-full absolute opacity-60 bg-gradient-to-b from-black via-slate-900/80 to-transparent"></span>
        </div>
        <div className="container relative mx-auto px-4">
          <div className="items-center flex flex-wrap">
            <div className="w-full lg:w-9/12 px-4 ml-auto mr-auto text-center">
              <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <div className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-blue-400 uppercase bg-blue-900/40 backdrop-blur-lg rounded-full border border-blue-400/30">
                  Zamonaviy ta'lim va innovatsiya markazi
                </div>
                <h1 className="text-white font-black text-6xl md:text-8xl mb-8 leading-tight tracking-tighter drop-shadow-2xl">
                  {SCHOOL_NAME}
                </h1>
                <p className="mt-4 text-xl md:text-2xl text-gray-100 font-light max-w-3xl mx-auto leading-relaxed italic drop-shadow-md">
                  "{SCHOOL_MOTTO}" — Biz har bir o'quvchining iqtidorini ro'yobga chiqarishga intilamiz.
                </p>
                <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6 items-center">
                  <button onClick={() => setView('portal')} className="group bg-blue-600 text-white px-10 py-5 rounded-full font-black text-lg hover:bg-blue-700 transition-all shadow-2xl hover:shadow-blue-500/50 flex items-center">
                    O'quvchi portaliga kirish
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                  </button>
                  <a href="#biz-haqimizda" className="bg-white/10 backdrop-blur-md text-white border-2 border-white/20 px-10 py-5 rounded-full font-bold text-lg hover:bg-white/20 transition-all">
                    Maktab haqida
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-8 h-8 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
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
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-xl rounded-2xl p-8 hover:-translate-y-2 transition-transform duration-300 border border-gray-50">
                  <div className="text-white p-3 text-center inline-flex items-center justify-center w-14 h-14 mb-5 shadow-lg rounded-2xl bg-gradient-to-tr from-blue-600 to-blue-400">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={stat.icon}></path>
                    </svg>
                  </div>
                  <h6 className="text-4xl font-black text-gray-900 tracking-tighter">{stat.value}</h6>
                  <p className="mt-2 mb-4 text-gray-500 font-bold uppercase text-xs tracking-widest">
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
              <h3 className="text-4xl mb-6 font-black leading-tight text-gray-900 tracking-tight">Bizning vazifamiz va maqsadimiz</h3>
              <p className="text-lg font-light leading-relaxed mt-0 mb-8 text-gray-600">
                Bizning maktab 1980-yilda tashkil topgan bo'lib, o'shandan beri minglab shogirdlarni hayot yo'liga kuzatib kelmoqda. Bizning maqsadimiz — zamonaviy texnologiyalar va boy milliy qadriyatlarimizni uyg'unlashtirgan holda barkamol avlodni tarbiyalashdir.
              </p>
              <ul className="list-none mt-6 space-y-4">
                {[
                  "Malakali ustozlar jamoasi",
                  "Zamonaviy kompyuter sinflari",
                  "O'quvchilarni olimpiadalarga tayyorlash",
                  "Yaqin va samimiy muhit"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center text-lg">
                    <div className="mr-4 p-1 bg-blue-100 rounded-full">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full md:w-5/12 px-4 mr-auto ml-auto mt-12 md:mt-0">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-2xl rounded-3xl overflow-hidden group">
                <img alt="O'quv jarayoni" src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=1200&auto=format&fit=crop" className="w-full h-[400px] object-cover align-middle transition-transform duration-700 group-hover:scale-110" />
                <blockquote className="relative p-10 mb-4 bg-white">
                  <svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 583 95" className="absolute left-0 w-full block h-[95px] -top-[94px]">
                    <polygon points="-30,95 583,95 583,65" className="text-white fill-current"></polygon>
                  </svg>
                  <h4 className="text-2xl font-black text-gray-900 mb-3">
                    Sifatli ta'lim - farovon kelajak
                  </h4>
                  <p className="text-md font-medium mt-2 text-gray-500 italic leading-relaxed">
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
            <h2 className="text-5xl font-black text-gray-900 mb-4 tracking-tighter">Maktab hayotidan yangiliklar</h2>
            <div className="w-24 h-2 bg-blue-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {NEWS.map((item) => (
              <div key={item.id} className="group bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300">
                <div className="relative h-56 overflow-hidden">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase shadow-lg">
                    {item.date}
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="font-black text-2xl mb-4 group-hover:text-blue-600 transition-colors leading-snug">{item.title}</h3>
                  <p className="text-gray-500 text-sm mb-6 line-clamp-3 leading-relaxed">{item.summary}</p>
                  <button className="text-blue-600 font-black text-sm flex items-center group/btn">
                    Davomini o'qish
                    <svg className="w-5 h-5 ml-2 transition-transform group-hover/btn:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
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
            <h2 className="text-5xl font-black text-gray-900 mb-4 tracking-tighter">Bizning jamoa</h2>
            <p className="text-gray-500 max-w-2xl mx-auto font-medium text-lg">Tajribali va jonkuyar ustozlarimiz o'quvchilarga eng yaxshi bilim berish yo'lida doim harakatda.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEACHERS.map((teacher) => (
              <div key={teacher.id} className="flex flex-col items-center bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all">
                <div className="relative mb-6">
                  <img src={teacher.image} alt={teacher.name} className="w-36 h-36 rounded-full object-cover border-4 border-blue-50 ring-8 ring-white shadow-xl" />
                  <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-xl shadow-lg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                  </div>
                </div>
                <h4 className="text-2xl font-black text-gray-900 mb-1">{teacher.name}</h4>
                <p className="text-blue-600 text-sm font-black uppercase tracking-widest mb-4">{teacher.subject}</p>
                <div className="flex items-center text-gray-400 text-xs font-bold bg-gray-50 px-3 py-1.5 rounded-full">
                  <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  Tajriba: {teacher.experience}
                </div>
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
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 rounded-3xl bg-white border border-gray-100 shadow-2xl p-10">
                <h4 className="text-3xl font-black mb-8 text-gray-900 tracking-tight">Bizga xabar yuboring</h4>
                <div className="relative w-full mb-5">
                  <label className="block uppercase text-gray-500 text-xs font-black mb-2 ml-1">To'liq ismingiz</label>
                  <input type="text" className="border-0 px-4 py-4 placeholder-gray-300 text-gray-600 bg-gray-50 rounded-2xl text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 w-full transition-all duration-150" placeholder="Karimov Aziz" />
                </div>
                <div className="relative w-full mb-5">
                  <label className="block uppercase text-gray-500 text-xs font-black mb-2 ml-1">Email manzil</label>
                  <input type="email" className="border-0 px-4 py-4 placeholder-gray-300 text-gray-600 bg-gray-50 rounded-2xl text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 w-full transition-all duration-150" placeholder="aziz@gmail.com" />
                </div>
                <div className="relative w-full mb-5">
                  <label className="block uppercase text-gray-500 text-xs font-black mb-2 ml-1">Xabaringiz</label>
                  <textarea rows={4} className="border-0 px-4 py-4 placeholder-gray-300 text-gray-600 bg-gray-50 rounded-2xl text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 w-full" placeholder="Xabaringizni yozing..."></textarea>
                </div>
                <div className="text-center mt-6">
                  <button className="bg-blue-600 text-white active:bg-blue-700 text-lg font-black uppercase px-8 py-4 rounded-2xl shadow-xl hover:shadow-blue-500/30 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 w-full" type="button">
                    Xabarni yuborish
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-5/12 px-4 ml-auto">
              <h2 className="text-4xl font-black mb-6 text-gray-900 tracking-tight">Bog'lanish uchun ma'lumotlar</h2>
              <p className="text-xl leading-relaxed text-gray-500 mb-10 font-medium">
                Savollaringiz bormi? Biz bilan bog'laning yoki maktabimizga tashrif buyuring. Biz har doim yordam berishga tayyormiz!
              </p>
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="text-blue-600 bg-blue-50 p-4 rounded-2xl shadow-sm">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  </div>
                  <div className="ml-5">
                    <h5 className="font-black text-lg text-gray-900">Manzilimiz</h5>
                    <p className="text-gray-500 font-medium mt-1">Toshkent shahri, Yunusobod tumani, 19-mavze, 2-uy</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-blue-600 bg-blue-50 p-4 rounded-2xl shadow-sm">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  </div>
                  <div className="ml-5">
                    <h5 className="font-black text-lg text-gray-900">Telefon raqami</h5>
                    <p className="text-gray-500 font-medium mt-1">+998 71 123 45 67</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="text-blue-600 bg-blue-50 p-4 rounded-2xl shadow-sm">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  </div>
                  <div className="ml-5">
                    <h5 className="font-black text-lg text-gray-900">Elektron pochta</h5>
                    <p className="text-gray-500 font-medium mt-1">info@35maktab.uz</p>
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
    <div className="min-h-screen bg-gray-50 text-gray-900 overflow-x-hidden selection:bg-blue-100 selection:text-blue-900">
      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-sm w-full transform animate-in zoom-in-95 duration-300 border border-gray-100">
            <div className="w-20 h-20 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
            <h3 className="text-2xl font-black text-center text-gray-900 mb-2">Tizimdan chiqish</h3>
            <p className="text-gray-500 text-center mb-8 font-medium">Haqiqatan ham portalni tark etmoqchimisiz? Barcha saqlanmagan ma'lumotlar yo'qolishi mumkin.</p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={confirmLogout}
                className="w-full px-4 py-4 rounded-2xl bg-red-600 text-white font-black hover:bg-red-700 transition-all shadow-xl shadow-red-500/20"
              >
                Ha, chiqish
              </button>
              <button 
                onClick={() => setShowLogoutConfirm(false)}
                className="w-full px-4 py-4 rounded-2xl bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 transition-colors"
              >
                Bekor qilish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center cursor-pointer group" onClick={() => setView('landing')}>
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-2xl mr-4 shadow-lg group-hover:rotate-6 transition-transform">
                35
              </div>
              <span className="font-black text-2xl tracking-tighter text-blue-900 hidden sm:block">35-Maktab</span>
            </div>
            <div className="hidden md:flex space-x-10">
              <button onClick={() => setView('landing')} className={`${view === 'landing' ? 'text-blue-600 bg-blue-50' : 'text-gray-600'} px-4 py-2 rounded-xl hover:text-blue-600 font-black transition-all`}>Asosiy</button>
              <a href="#biz-haqimizda" className="text-gray-600 hover:text-blue-600 font-black transition-colors py-2">Maktab haqida</a>
              <a href="#yangiliklar" className="text-gray-600 hover:text-blue-600 font-black transition-colors py-2">Yangiliklar</a>
              <button onClick={() => setView('portal')} className={`${view === 'portal' ? 'text-blue-600 bg-blue-50' : 'text-gray-600'} px-4 py-2 rounded-xl hover:text-blue-600 font-black transition-all`}>Portal</button>
            </div>
            <div className="flex items-center space-x-4">
              {view === 'landing' ? (
                <button 
                  onClick={() => setView('portal')}
                  className="hidden sm:flex bg-blue-600 text-white px-8 py-3 rounded-2xl font-black text-sm hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20"
                >
                  Portalga kirish
                </button>
              ) : (
                <button 
                  onClick={() => studentName ? setShowLogoutConfirm(true) : setView('landing')}
                  className="bg-gray-100 text-gray-900 px-6 py-3 rounded-2xl font-black text-sm hover:bg-gray-200 transition-all"
                >
                  {studentName ? 'Tizimdan chiqish' : 'Orqaga'}
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {view === 'landing' ? (
        renderLanding()
      ) : studentName ? (
        <StudentPortal name={studentName} />
      ) : (
        <PortalAuth onAuthSuccess={handleStudentAuth} onBack={() => setView('landing')} />
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-20 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-5/12 mb-12 md:mb-0">
              <div className="flex items-center mb-6 cursor-pointer" onClick={() => setView('landing')}>
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black mr-4 shadow-lg">35</div>
                <span className="text-2xl font-black tracking-tight">{SCHOOL_NAME}</span>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-sm">
                Biz o'quvchilarning faqat bilimini emas, balki shaxsiyatini ham shakllantiramiz. 
                Bilim olish - bu biz bilan birga katta sarguzasht!
              </p>
              <div className="flex space-x-4">
                {['facebook', 'instagram', 'telegram', 'youtube'].map(social => (
                  <button key={social} className="w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-blue-600 transition-colors text-gray-400 hover:text-white">
                    <span className="sr-only">{social}</span>
                    <div className="w-5 h-5 bg-current mask-contain" style={{ maskImage: `url(https://simpleicons.org/icons/${social}.svg)` }}></div>
                  </button>
                ))}
              </div>
            </div>
            <div className="w-full md:w-2/12 mb-8 md:mb-0">
              <h5 className="font-black mb-6 uppercase text-sm tracking-widest text-blue-500">Tezkor havolalar</h5>
              <ul className="text-gray-400 text-base space-y-4 font-bold">
                <li><button onClick={() => setView('landing')} className="hover:text-blue-500 transition-colors">Bosh sahifa</button></li>
                <li><button onClick={() => setView('portal')} className="hover:text-blue-500 transition-colors">O'quvchi portali</button></li>
                <li><a href="#biz-haqimizda" className="hover:text-blue-500 transition-colors">Maktab haqida</a></li>
                <li><a href="#yangiliklar" className="hover:text-blue-500 transition-colors">Yangiliklar</a></li>
              </ul>
            </div>
            <div className="w-full md:w-3/12">
              <h5 className="font-black mb-6 uppercase text-sm tracking-widest text-blue-500">Portal</h5>
              <div className="bg-gray-800 p-6 rounded-3xl border border-gray-700">
                <p className="text-sm text-gray-300 mb-4 font-medium leading-relaxed">Dars jadvali va baholarni ko'rish uchun portalga kiring.</p>
                <button onClick={() => setView('portal')} className="w-full bg-blue-600 text-white py-3 rounded-2xl font-black text-sm hover:bg-blue-700 transition-all">
                  Tizimga kirish
                </button>
              </div>
            </div>
          </div>
          <div className="mt-20 pt-10 border-t border-gray-800 text-center text-gray-500 text-sm font-bold">
            &copy; 2024 {SCHOOL_NAME}. Barcha huquqlar himoyalangan. <br className="sm:hidden" />
            <span className="hidden sm:inline mx-2">•</span>
            Dizayn va ishlab chiqish: "Smart School Solutions"
          </div>
        </div>
      </footer>

      {/* AI Assistant Button */}
      <AIChat />
    </div>
  );
};

export default App;
