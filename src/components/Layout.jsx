import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { LogOut, Users, BookOpen, GraduationCap, ClipboardList, PenTool } from 'lucide-react';

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return <Outlet />;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = {
    admin: [
      { path: '/system', label: '系統管理', icon: Users },
      { path: '/classes', label: '班級管理', icon: BookOpen },
      { path: '/exams', label: '試卷建立', icon: PenTool },
      { path: '/grading', label: '閱卷與作答紀錄', icon: ClipboardList },
    ],
    teacher: [
      { path: '/system', label: '使用者列表', icon: Users },
      { path: '/classes', label: '我的班級', icon: BookOpen },
      { path: '/exams', label: '測驗試卷', icon: PenTool },
      { path: '/grading', label: '閱卷紀錄', icon: ClipboardList },
    ],
    student: [
      { path: '/dashboard', label: '學生儀表板', icon: GraduationCap },
    ]
  };

  const items = navItems[user.role] || [];
  
  const roleDisplayMap = {
    admin: '系統管理員',
    teacher: '老師',
    student: '學生'
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <GraduationCap className="w-8 h-8 text-blue-600 mr-2" />
          <span className="text-xl font-bold text-gray-800">ExamPortal</span>
        </div>
        
        <div className="flex-1 py-4 flex flex-col gap-1 px-3">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink 
                key={item.path}
                to={item.path}
                className={({isActive}) => `flex items-center px-3 py-2 rounded-md transition-colors ${isActive ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </NavLink>
            );
          })}
        </div>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold mr-3 shrink-0">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
              <p className="text-xs text-gray-500 truncate">{roleDisplayMap[user.role]}</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center px-4 py-2 text-sm text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
          >
            <LogOut className="w-4 h-4 mr-2" />
            登出
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
}
