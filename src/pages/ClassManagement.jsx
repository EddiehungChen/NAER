import React, { useState } from 'react';
import { BookOpen, Users, ArrowRight, Search, PlusCircle } from 'lucide-react';

export default function ClassManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const mockClasses = [
    { id: 1, name: '10A 數理資優班', teacher: '曾老師', students: 32, activeExams: 2 },
    { id: 2, name: '10B 普通班', teacher: '吳老師', students: 28, activeExams: 1 },
    { id: 3, name: '11A 語文資優班', teacher: '林老師', students: 30, activeExams: 0 },
    { id: 4, name: '11B 物理特訓班', teacher: '曾老師', students: 25, activeExams: 3 },
  ];

  const filteredClasses = mockClasses.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">班級管理</h1>
          <p className="text-sm text-gray-500 mt-1">檢視所有班級資訊、負責教師以及班級內的學生動態。</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium text-sm">
          <PlusCircle className="w-4 h-4 mr-2" />
          建立新班級
        </button>
      </div>

      <div className="mb-6 relative w-full md:w-96">
        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        <input 
          type="text"
          placeholder="搜尋班級名稱..."
          className="pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClasses.map((cls) => (
          <div key={cls.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-blue-300 transition-all duration-300 group">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-sm shrink-0">
                  <BookOpen className="w-6 h-6" />
                </div>
                {cls.activeExams > 0 && (
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-800 border border-orange-200">
                    {cls.activeExams} 場進行中測驗
                  </span>
                )}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-1">{cls.name}</h3>
              <p className="text-sm text-gray-500 font-medium mb-6">負責教師： <span className="text-gray-700">{cls.teacher}</span></p>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center text-gray-600">
                  <Users className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="text-sm font-medium">{cls.students} 位學生</span>
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                <button className="text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center group/btn">
                  管理班級
                  <ArrowRight className="w-4 h-4 ml-1 transform group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredClasses.length === 0 && (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 border-dashed">
          <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-medium text-gray-900">找不到班級</h3>
          <p className="text-gray-500 mt-1">請嘗試使用其他關鍵字搜尋。</p>
        </div>
      )}
    </div>
  );
}
