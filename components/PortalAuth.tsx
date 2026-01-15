
import React, { useState, useEffect } from 'react';
import { Student } from '../types';

interface PortalAuthProps {
  onAuthSuccess: (name: string) => void;
  onBack: () => void;
}

const PortalAuth: React.FC<PortalAuthProps> = ({ onAuthSuccess, onBack }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [generatedId, setGeneratedId] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    studentId: '',
    grade: '',
    parentPhone: ''
  });
  const [error, setError] = useState('');
  const [studentDb, setStudentDb] = useState<Student[]>([]);

  // Sahifa yuklanganda "bazani" o'qish
  useEffect(() => {
    const savedStudents = localStorage.getItem('school_students_db');
    if (savedStudents) {
      setStudentDb(JSON.parse(savedStudents));
    }
  }, []);

  const generateId = () => {
    const random = Math.floor(10000 + Math.random() * 90000);
    return `35M-${random}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      // LOGIN LOGIKASI: Bazadan tekshirish
      const foundStudent = studentDb.find(
        (s) => 
          s.fullName.toLowerCase() === formData.fullName.toLowerCase() && 
          s.studentId === formData.studentId
      );

      if (foundStudent) {
        onAuthSuccess(foundStudent.fullName);
      } else {
        setError('Bunday o\'quvchi topilmadi yoki ID noto\'g\'ri! Iltimos, qayta tekshiring yoki ro\'yxatdan o\'ting.');
      }
    } else {
      // REGISTRATION LOGIKASI: Bazaga saqlash
      if (formData.fullName && formData.grade && formData.parentPhone) {
        const newId = generateId();
        const newStudent: Student = {
          id: Date.now(),
          fullName: formData.fullName,
          grade: formData.grade,
          studentId: newId,
          parentPhone: formData.parentPhone
        };

        const updatedDb = [...studentDb, newStudent];
        localStorage.setItem('school_students_db', JSON.stringify(updatedDb));
        setStudentDb(updatedDb);
        
        setGeneratedId(newId);
        setShowSuccess(true);
      } else {
        setError('Barcha maydonlarni to\'ldiring!');
      }
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedId);
    alert('ID raqam nusxalandi! Endi portalga kirishingiz mumkin.');
  };

  if (showSuccess) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 border border-green-100 text-center">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Tabriklaymiz!</h2>
          <p className="text-gray-600 mb-8">Siz muvaffaqiyatli ro'yxatdan o'tdingiz. Tizimga kirish uchun quyidagi ID raqamingizni saqlab qo'ying:</p>
          
          <div className="bg-gray-50 border-2 border-dashed border-blue-200 rounded-2xl p-6 mb-8 relative group">
            <span className="text-xs font-bold text-blue-500 uppercase tracking-widest block mb-2">Sizning ID raqamingiz</span>
            <div className="text-4xl font-mono font-black text-blue-900 tracking-tighter">
              {generatedId}
            </div>
            <button 
              onClick={copyToClipboard}
              className="mt-4 text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center justify-center mx-auto"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
              </svg>
              Nusxa olish
            </button>
          </div>

          <button
            onClick={() => onAuthSuccess(formData.fullName)}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 shadow-lg transition-all"
          >
            Portalga o'tish
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            {isLogin ? 'O\'quvchi portaliga kirish' : 'Portalda ro\'yxatdan o\'tish'}
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            {isLogin ? 'O\'z ID raqamingiz orqali kiring' : 'Yangi o\'quvchi sifatida ro\'yxatdan o\'ting'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border-l-4 border-red-500">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">To'liq ism</label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="Masalan: Karimov Azizbek"
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              required
            />
          </div>

          {isLogin ? (
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">O'quvchi ID</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                placeholder="35M-XXXXX"
                value={formData.studentId}
                onChange={(e) => setFormData({...formData, studentId: e.target.value})}
                required
              />
            </div>
          ) : (
            <>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Sinf</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="Masalan: 9-A"
                  value={formData.grade}
                  onChange={(e) => setFormData({...formData, grade: e.target.value})}
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">Ota-ona telefoni</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="+998 90 123 45 67"
                  value={formData.parentPhone}
                  onChange={(e) => setFormData({...formData, parentPhone: e.target.value})}
                  required
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 shadow-lg transition-all"
          >
            {isLogin ? 'Kirish' : 'Ro\'yxatdan o\'tish'}
          </button>
        </form>

        <div className="mt-6 text-center space-y-4">
          <button 
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
            className="text-blue-600 text-sm font-semibold hover:underline"
          >
            {isLogin ? 'Hisobingiz yo\'qmi? Ro\'yxatdan o\'ting' : 'Hisobingiz bormi? Kirish'}
          </button>
          <br />
          <button 
            onClick={onBack}
            className="text-gray-400 text-xs hover:text-gray-600 transition-colors"
          >
            Bosh sahifaga qaytish
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortalAuth;
