import React, { useState } from 'react';
import { Search, Filter, MoreVertical, UserPlus, FileArchive, Users } from 'lucide-react';

export default function SystemManagement() {
  const [activeTab, setActiveTab] = useState('students');
  const [searchTerm, setSearchTerm] = useState('');

  const mockUsers = [
    { id: 1, name: '王小明', role: 'student', email: 'wang@student.edu', status: '啟用', class: '10A' },
    { id: 2, name: '陳小華', role: 'student', email: 'chen.h@student.edu', status: '停用', class: '10B' },
    { id: 3, name: '林同學', role: 'student', email: 'lin@student.edu', status: '啟用', class: '10A' },
    { id: 4, name: '曾老師', role: 'teacher', email: 'chen@school.edu', status: '啟用', department: '自然科學' },
    { id: 5, name: '系統管理員', role: 'admin', email: 'admin@school.edu', status: '啟用', department: '資訊中心' },
  ];

  const filteredUsers = mockUsers.filter(u => 
    (activeTab === 'students' ? u.role === 'student' : u.role !== 'student') &&
    u.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">系統管理</h1>
          <p className="text-sm text-gray-500 mt-1">管理全校學生、教職員帳號以及系統權限設定。</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors shadow-sm font-medium text-sm">
            <FileArchive className="w-4 h-4 mr-2 text-gray-500" />
            匯出資料
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium text-sm">
            <UserPlus className="w-4 h-4 mr-2" />
            新增使用者
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white">
          <div className="flex space-x-1 border border-gray-200 rounded-lg p-1 bg-gray-50 self-start">
            <button 
              onClick={() => setActiveTab('students')}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${activeTab === 'students' ? 'bg-white text-blue-700 shadow-sm border border-gray-200' : 'text-gray-600 hover:text-gray-900'}`}
            >
              學生列表
            </button>
            <button 
              onClick={() => setActiveTab('staff')}
              className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${activeTab === 'staff' ? 'bg-white text-blue-700 shadow-sm border border-gray-200' : 'text-gray-600 hover:text-gray-900'}`}
            >
              教職員列表
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input 
                type="text"
                placeholder="搜尋姓名..."
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-64 transition-shadow"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="p-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200 font-semibold">
                <th className="px-6 py-4">姓名</th>
                <th className="px-6 py-4">身分</th>
                <th className="px-6 py-4">電子郵件</th>
                <th className="px-6 py-4">{activeTab === 'students' ? '班級' : '部門'}</th>
                <th className="px-6 py-4">狀態</th>
                <th className="px-6 py-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-blue-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm mr-3 shrink-0 ${activeTab === 'students' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                        {user.name.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-900">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="capitalize text-gray-600 text-sm bg-gray-100 px-2 py-1 rounded-md">
                      {user.role === 'student' ? '學生' : user.role === 'teacher' ? '老師' : '管理員'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-sm">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-sm font-medium">
                    {user.class || user.department}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${user.status === '啟用' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${user.status === '啟用' ? 'bg-emerald-500' : 'bg-gray-400'}`}></span>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-100 rounded-md transition-colors">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <Users className="w-12 h-12 text-gray-300 mb-3" />
                      <p className="text-gray-900 font-medium text-lg">找不到使用者</p>
                      <p className="text-gray-500 mt-1">請嘗試使用其他關鍵字搜尋。</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
