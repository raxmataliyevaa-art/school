
import React, { useState } from 'react';
import { STUDENT_SCHEDULE, STUDENT_GRADES, STUDENT_TASKS, STUDENT_ATTENDANCE } from '../constants';

const StudentPortal: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'schedule' | 'grades' | 'tasks' | 'attendance'>('dashboard');

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-600 p-6 rounded-2xl text-white shadow-lg">
          <p className="text-blue-100 text-sm font-medium">O'rtacha ball</p>
          <h4 className="text-4xl font-bold mt-1">4.2</h4>
          <p className="text-xs text-blue-200 mt-2">O'tgan haftaga nisbatan +0.2</p>
        </div>
        <div className="bg-green-600 p-6 rounded-2xl text-white shadow-lg">
          <p className="text-green-100 text-sm font-medium">Umumiy davomat</p>
          <h4 className="text-4xl font-bold mt-1">
            {Math.round((STUDENT_ATTENDANCE.reduce((acc, curr) => acc + curr.attended, 0) / 
             STUDENT_ATTENDANCE.reduce((acc, curr) => acc + curr.totalLessons, 0)) * 100)}%
          </h4>
          <p className="text-xs text-green-200 mt-2">Jami darslar: {STUDENT_ATTENDANCE.reduce((acc, curr) => acc + curr.totalLessons, 0)} ta</p>
        </div>
        <div className="bg-orange-600 p-6 rounded-2xl text-white shadow-lg">
          <p className="text-orange-100 text-sm font-medium">Kutilayotgan vazifalar</p>
          <h4 className="text-4xl font-bold mt-1">{STUDENT_TASKS.filter(t => t.status === 'pending').length} ta</h4>
          <p className="text-xs text-orange-200 mt-2">Eng yaqin muddati: 18-may</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h5 className="font-bold text-lg mb-4">Bugungi darslar</h5>
          <div className="space-y-4">
            {STUDENT_SCHEDULE[0].lessons.map((lesson, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-100 text-blue-600 p-2 rounded-lg text-xs font-bold w-12 text-center">
                    {lesson.time}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-sm">{lesson.subject}</p>
                    <p className="text-xs text-gray-500">{lesson.teacher}</p>
                  </div>
                </div>
                <div className="text-xs font-medium text-gray-400">
                  {lesson.room}-xona
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h5 className="font-bold text-lg mb-4">So'nggi baholar</h5>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs text-gray-400 uppercase tracking-wider">
                  <th className="pb-3 font-medium">Fan</th>
                  <th className="pb-3 font-medium">Ball</th>
                  <th className="pb-3 font-medium">Sana</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100">
                {STUDENT_GRADES.slice(0, 5).map((grade, i) => (
                  <tr key={i}>
                    <td className="py-3 font-medium text-gray-700">{grade.subject}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-lg font-bold text-xs ${
                        grade.score === 5 ? 'bg-green-100 text-green-700' :
                        grade.score === 4 ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {grade.score}
                      </span>
                    </td>
                    <td className="py-3 text-gray-500">{grade.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSchedule = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {STUDENT_SCHEDULE.map((day, idx) => (
        <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h5 className="font-bold text-xl text-blue-600 mb-4">{day.day}</h5>
          <div className="space-y-4">
            {day.lessons.map((lesson, i) => (
              <div key={i} className="flex items-center p-4 border-l-4 border-blue-50 bg-blue-50/30 rounded-r-xl">
                <span className="text-sm font-bold text-blue-600 w-16">{lesson.time}</span>
                <div className="flex-1">
                  <p className="font-bold text-gray-800">{lesson.subject}</p>
                  <p className="text-xs text-gray-500">{lesson.teacher} • {lesson.room}-xona</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderGrades = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50 border-b border-gray-100">
          <tr>
            <th className="p-4 font-bold text-sm text-gray-600">Fan nomi</th>
            <th className="p-4 font-bold text-sm text-gray-600">Ball</th>
            <th className="p-4 font-bold text-sm text-gray-600">Tur</th>
            <th className="p-4 font-bold text-sm text-gray-600">Sana</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {STUDENT_GRADES.map((grade, i) => (
            <tr key={i} className="hover:bg-gray-50 transition-colors">
              <td className="p-4 font-medium">{grade.subject}</td>
              <td className="p-4">
                <span className={`inline-block w-8 h-8 leading-8 text-center rounded-full font-bold text-sm ${
                  grade.score === 5 ? 'bg-green-600 text-white' :
                  grade.score === 4 ? 'bg-blue-600 text-white' : 'bg-orange-600 text-white'
                }`}>
                  {grade.score}
                </span>
              </td>
              <td className="p-4 text-sm text-gray-500">{grade.type}</td>
              <td className="p-4 text-sm text-gray-400">{grade.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderTasks = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {STUDENT_TASKS.map((task) => (
        <div key={task.id} className={`p-6 rounded-2xl shadow-sm border ${
          task.status === 'completed' ? 'bg-gray-50 border-gray-200' : 'bg-white border-blue-100'
        }`}>
          <div className="flex justify-between items-start mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-1 rounded">
              {task.subject}
            </span>
            {task.status === 'completed' ? (
              <span className="text-green-600">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
              </span>
            ) : (
              <div className="w-6 h-6 rounded-full border-2 border-blue-200"></div>
            )}
          </div>
          <h6 className={`font-bold text-gray-800 mb-2 ${task.status === 'completed' ? 'line-through text-gray-400' : ''}`}>
            {task.title}
          </h6>
          <p className="text-xs text-gray-500 flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            Muddati: {task.deadline}
          </p>
          <button className={`mt-6 w-full py-2 rounded-xl font-bold text-sm transition-all ${
            task.status === 'completed' ? 'bg-gray-200 text-gray-500' : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}>
            {task.status === 'completed' ? 'Tugatildi' : 'Tugallangan deb belgilash'}
          </button>
        </div>
      ))}
    </div>
  );

  const renderAttendance = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 bg-gray-50/50">
        <h5 className="font-bold text-lg text-gray-800">Fanlar kesimida davomat</h5>
        <p className="text-sm text-gray-500">Har bir fan bo'yicha darslarda qatnashish ko'rsatkichi</p>
      </div>
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-4 font-bold text-xs text-gray-500 uppercase tracking-wider">Fan nomi</th>
            <th className="p-4 font-bold text-xs text-gray-500 uppercase tracking-wider">Jami darslar</th>
            <th className="p-4 font-bold text-xs text-gray-500 uppercase tracking-wider">Qatnashgan</th>
            <th className="p-4 font-bold text-xs text-gray-500 uppercase tracking-wider">Qoldirilgan</th>
            <th className="p-4 font-bold text-xs text-gray-500 uppercase tracking-wider">Foiz</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {STUDENT_ATTENDANCE.map((record, i) => {
            const percentage = Math.round((record.attended / record.totalLessons) * 100);
            return (
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                <td className="p-4">
                  <p className="font-bold text-gray-800">{record.subject}</p>
                  {record.lastMissedDate && (
                    <p className="text-[10px] text-red-400">Oxirgi qoldirilgan: {record.lastMissedDate}</p>
                  )}
                </td>
                <td className="p-4 text-sm text-gray-600">{record.totalLessons}</td>
                <td className="p-4 text-sm font-medium text-green-600">{record.attended}</td>
                <td className="p-4 text-sm font-medium text-red-500">{record.missed}</td>
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden min-w-[100px]">
                      <div 
                        className={`h-full rounded-full ${percentage >= 90 ? 'bg-green-500' : percentage >= 70 ? 'bg-blue-500' : 'bg-orange-500'}`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-bold text-gray-700">{percentage}%</span>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Xush kelibsiz, Azizbek!</h2>
          <p className="text-gray-500">Bugun 16-may, payshanba. O'qishlaringizga muvaffaqiyat!</p>
        </div>
        <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-100 overflow-x-auto whitespace-nowrap scrollbar-hide">
          {[
            { id: 'dashboard', label: 'Boshqaruv paneli' },
            { id: 'schedule', label: 'Dars jadvali' },
            { id: 'grades', label: 'Baholar' },
            { id: 'tasks', label: 'Vazifalar' },
            { id: 'attendance', label: 'Davomat' }
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === tab.id ? 'bg-blue-600 text-white' : 'text-gray-500 hover:text-blue-600'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="transition-all duration-300">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'schedule' && renderSchedule()}
        {activeTab === 'grades' && renderGrades()}
        {activeTab === 'tasks' && renderTasks()}
        {activeTab === 'attendance' && renderAttendance()}
      </div>
    </div>
  );
};

export default StudentPortal;
