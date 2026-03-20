import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { GraduationCap, Shield, User, Users } from 'lucide-react';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role) => {
    let userData;
    if (role === 'admin') userData = { id: 1, name: '系統管理員', role: 'admin' };
    if (role === 'teacher') userData = { id: 2, name: '曾老師', role: 'teacher' };
    if (role === 'student') userData = { id: 3, name: '林同學', role: 'student' };
    
    login(userData);
    
    if (role === 'student') {
      navigate('/dashboard');
    } else {
      navigate('/system');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 border border-white/50 backdrop-blur-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">線上測驗系統</h1>
          <p className="text-gray-500 mt-2 text-center text-sm">請選擇一個測試帳號以體驗不同身分的視角</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => handleLogin('admin')}
            className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-white hover:shadow-md border border-gray-200 hover:border-purple-300 rounded-xl transition-all duration-200 group relative overflow-hidden"
          >
            <div className="absolute inset-x-0 h-1 bottom-0 bg-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-4 shadow-sm shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors">管理員</p>
                <p className="text-xs text-gray-500">系統管理與維護</p>
              </div>
            </div>
            <div className="text-xs font-mono text-gray-400 bg-gray-100 px-2 py-1 rounded">admin@school.edu</div>
          </button>

          <button
            onClick={() => handleLogin('teacher')}
            className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-white hover:shadow-md border border-gray-200 hover:border-emerald-300 rounded-xl transition-all duration-200 group relative overflow-hidden"
          >
            <div className="absolute inset-x-0 h-1 bottom-0 bg-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mr-4 shadow-sm shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors">老師</p>
                <p className="text-xs text-gray-500">管理班級與指派試卷</p>
              </div>
            </div>
            <div className="text-xs font-mono text-gray-400 bg-gray-100 px-2 py-1 rounded">chen@school.edu</div>
          </button>

          <button
            onClick={() => handleLogin('student')}
            className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-white hover:shadow-md border border-gray-200 hover:border-blue-300 rounded-xl transition-all duration-200 group relative overflow-hidden"
          >
            <div className="absolute inset-x-0 h-1 bottom-0 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4 shadow-sm shrink-0">
                <User className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">學生</p>
                <p className="text-xs text-gray-500">進行測驗與查看成績</p>
              </div>
            </div>
            <div className="text-xs font-mono text-gray-400 bg-gray-100 px-2 py-1 rounded">lin@student.edu</div>
          </button>
        </div>
      </div>
    </div>
  );
}
