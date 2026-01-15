
import React, { useState, useEffect } from 'react';
import { NEWS, TEACHERS } from '../constants';
import { Student } from '../types';

interface AdminPanelProps {
  onLogout: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'news' | 'teachers' | 'students'>('dashboard');
  const [newsList, setNewsList] = useState(NEWS);
  const [teachersList, setTeachersList] = useState(TEACHERS);
  const [studentsList, setStudentsList] = useState<Student[]>([]);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Bazani o'qish
  useEffect(() => {
    const savedStudents = localStorage.getItem('school_students_db');
    if (savedStudents) {
      setStudentsList(JSON.parse(savedStudents));
    }
  }, []);

  const deleteNews = (id: number) => {
    setNewsList(prev => prev.filter(n => n.id !== id));
  };

  const deleteTeacher = (id: number) => {
    setTeachersList(prev => prev.filter(t => t.id !== id));
  };

  const deleteStudent = (id: number) => {
    const updated = studentsList.filter(s => s.id !== id);
    setStudentsList(updated);
    localStorage.setItem('school_students_db', JSON.stringify(updated));
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm font-medium">Yangiliklar</p>
          <h4 className="text-3xl font-bold mt-1 text-blue-600">{newsList.length}</h4>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm font-medium">Ustozlar</p>
          <h4 className="text-3xl font-bold mt-1 text-indigo-600">{teachersList.length}</h4>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm font-medium">O'quvchilar</p>
          <h4 className="text-3xl font-bold mt-1 text-orange-600">{studentsList.length}</h4>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-sm font-medium">Portal faolligi</p>
          <h4 className="text-3xl font-bold mt-1 text-green-600">88%</h4>
        </div>
      </div>
      
      <div className="bg-blue-600 text-white p-8 rounded-3xl shadow-xl flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold mb-2">Xush kelibsiz, Admin!</h3>
          <p className="text-blue-100 opacity-80">Saytdagi barcha ma'lumotlarni shu erdan turib boshqarishingiz mumkin.</p>
        </div>
        <div className="hidden md:block">
          <svg className="w-24 h-24 opacity-20" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path></svg>
        </div>
      </div>
    </div>
  );

  const renderNewsManager = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h5 className="font-bold text-lg">Yangiliklarni boshqarish</h5>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition-all">
          + Yangi qo'shish
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase">Sarlavha</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase">Sana</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase">Amallar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {newsList.map((news) => (
              <tr key={news.id} className="hover:bg-gray-50">
                <td className="p-4 text-sm font-medium text-gray-800">{news.title}</td>
                <td className="p-4 text-sm text-gray-500">{news.date}</td>
                <td className="p-4">
                  <div className="flex space-x-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                    </button>
                    <button onClick={() => deleteNews(news.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderTeachersManager = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {teachersList.map((teacher) => (
        <div key={teacher.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
          <img src={teacher.image} alt={teacher.name} className="w-16 h-16 rounded-full object-cover" />
          <div className="flex-1">
            <h6 className="font-bold text-gray-800">{teacher.name}</h6>
            <p className="text-xs text-blue-600">{teacher.subject}</p>
          </div>
          <button onClick={() => deleteTeacher(teacher.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-full">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
      ))}
      <button className="border-2 border-dashed border-gray-200 p-6 rounded-2xl text-gray-400 hover:border-blue-400 hover:text-blue-500 transition-all flex flex-col items-center justify-center">
        <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
        <span className="font-bold text-sm">Yangi ustoz qo'shish</span>
      </button>
    </div>
  );

  const renderStudentsManager = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h5 className="font-bold text-lg">O'quvchilar ro'yxati (Baza)</h5>
        <p className="text-xs text-gray-500">Bu ro'yxatdagilar portalga kirish huquqiga ega.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase">F.I.O</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase">Sinf</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase">O'quvchi ID</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase">Ota-ona tel.</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase">Amallar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {studentsList.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-10 text-center text-gray-400 italic">Hali hech kim ro'yxatdan o'tmadi.</td>
              </tr>
            ) : (
              studentsList.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="p-4 text-sm font-medium text-gray-800">{student.fullName}</td>
                  <td className="p-4 text-sm text-gray-600">{student.grade}</td>
                  <td className="p-4 text-sm font-mono text-blue-600">{student.studentId}</td>
                  <td className="p-4 text-sm text-gray-500">{student.parentPhone}</td>
                  <td className="p-4">
                    <button onClick={() => deleteStudent(student.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex relative">
      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full transform animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-center text-gray-900 mb-2">Tizimdan chiqish</h3>
            <p className="text-gray-500 text-center mb-6">Admin panelidan chiqib ketishga ishonchingiz komilmi?</p>
            <div className="flex gap-3">
              <button 
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 px-4 py-3 rounded-xl bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 transition-colors"
              >
                Qolish
              </button>
              <button 
                onClick={onLogout}
                className="flex-1 px-4 py-3 rounded-xl bg-red-600 text-white font-bold hover:bg-red-700 transition-colors shadow-lg shadow-red-500/30"
              >
                Ha, chiqish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex-shrink-0 flex flex-col">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-10">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold">35</div>
            <span className="font-bold text-lg">Admin Panel</span>
          </div>
          <nav className="space-y-1">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
              <span className="font-medium text-sm">Dashboard</span>
            </button>
            <button 
              onClick={() => setActiveTab('news')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'news' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path></svg>
              <span className="font-medium text-sm">Yangiliklar</span>
            </button>
            <button 
              onClick={() => setActiveTab('teachers')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'teachers' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
              <span className="font-medium text-sm">Ustozlar</span>
            </button>
            <button 
              onClick={() => setActiveTab('students')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'students' ? 'bg-blue-600' : 'hover:bg-slate-800'}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path></svg>
              <span className="font-medium text-sm">O'quvchilar</span>
            </button>
          </nav>
        </div>
        <div className="mt-auto p-6 border-t border-slate-800">
          <button 
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            <span className="font-medium text-sm">Chiqish</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">
            {activeTab === 'dashboard' && 'Boshqaruv markazi'}
            {activeTab === 'news' && 'Yangiliklar tahriri'}
            {activeTab === 'teachers' && 'Ustozlar ro\'yxati'}
            {activeTab === 'students' && 'O\'quvchilar boshqaruvi'}
          </h2>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500 font-medium">Salom, Adminstrator</span>
            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto">
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'news' && renderNewsManager()}
            {activeTab === 'teachers' && renderTeachersManager()}
            {activeTab === 'students' && renderStudentsManager()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
