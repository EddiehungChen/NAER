import React, { useState } from 'react';
import { Search, CheckCircle, Clock, ArrowRight, BookOpen, FileText } from 'lucide-react';

export default function GradingResults() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExam, setSelectedExam] = useState('期中生物總測驗');
  const [selectedClass, setSelectedClass] = useState('10A 數理資優班');

  const exams = ['期中生物總測驗', '代數每週小考', '物理期末考'];
  const classes = ['10A 數理資優班', '10B 普通班', '11A 語文資優班', '11B 物理特訓班'];

  const mockResults = [
    { id: 1, student: '王小明', exam: '期中生物總測驗', class: '10A 數理資優班', score: 92, status: '已批改', date: '2025-05-12' },
    { id: 2, student: '林同學', exam: '期中生物總測驗', class: '10A 數理資優班', score: 78, status: '已批改', date: '2025-05-15' },
    { id: 3, student: '張小弟', exam: '期中生物總測驗', class: '10A 數理資優班', score: null, status: '待批改', date: '2025-05-16' },
    { id: 4, student: '陳小華', exam: '代數每週小考', class: '10B 普通班', score: null, status: '待批改', date: '2025-05-14' },
    { id: 5, student: '李大方', exam: '期中生物總測驗', class: '10A 數理資優班', score: 85, status: '已批改', date: '2025-05-16' },
  ];

  // 先依照選擇的試卷與班級做篩選
  const classResults = mockResults.filter(r => r.exam === selectedExam && r.class === selectedClass);
  
  // 再根據搜尋關鍵字去過濾學生
  const filteredResults = classResults.filter(r => 
    r.student.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">閱卷與作答紀錄</h1>
          <p className="text-sm text-gray-500 mt-1">以班級為單位進行閱卷，先選擇「測驗試卷」與「已完測班級」後，即可依序批改學生的作答。</p>
        </div>
      </div>

      {/* 試卷與班級篩選器 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:border-blue-300 transition-colors">
          <label className="text-sm font-bold text-gray-700 mb-3 flex items-center">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            第一步：選擇試卷
          </label>
          <select 
            value={selectedExam}
            onChange={(e) => setSelectedExam(e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 font-medium rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-3 transition-shadow outline-none"
          >
            {exams.map(e => <option key={e} value={e}>{e}</option>)}
          </select>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:border-purple-300 transition-colors">
          <label className="text-sm font-bold text-gray-700 mb-3 flex items-center">
            <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center mr-3">
              <BookOpen className="w-5 h-5 text-purple-600" />
            </div>
            第二步：選擇已完測班級
          </label>
          <select 
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 text-gray-900 font-medium rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 block p-3 transition-shadow outline-none"
          >
            {classes.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* 學生列表與批改狀態 */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gray-50/50">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input 
              type="text"
              placeholder="搜尋學生姓名..."
              className="pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <span className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 shadow-sm">
              此視圖共有 <span className="text-blue-600 font-bold">{classResults.length}</span> 筆作答紀錄
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-gray-50/50 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-200 font-semibold">
                <th className="px-6 py-4">學生</th>
                <th className="px-6 py-4">提交時間</th>
                <th className="px-6 py-4">批閱狀態</th>
                <th className="px-6 py-4">得分</th>
                <th className="px-6 py-4 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredResults.map((result) => (
                <tr key={result.id} className="hover:bg-blue-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm mr-3">
                        {result.student.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-900">{result.student}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1.5 text-gray-400" />
                      {result.date}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {result.status === '已批改' ? (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
                        <CheckCircle className="w-3.5 h-3.5 mr-1" /> 已批閱
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
                        <Clock className="w-3.5 h-3.5 mr-1 text-amber-600" /> 待批閱
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {result.score !== null ? (
                      <span className={`font-bold ${result.score >= 80 ? 'text-green-600' : result.score >= 60 ? 'text-blue-600' : 'text-red-600'}`}>
                        {result.score} 分
                      </span>
                    ) : (
                      <span className="text-gray-400 font-medium">--</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className={`text-sm font-semibold flex items-center justify-end ml-auto group/btn px-3 py-1.5 rounded-lg border transition-colors ${
                      result.status === '已批改' 
                        ? 'text-gray-600 border-gray-200 hover:bg-gray-50' 
                        : 'text-blue-600 border-blue-200 bg-blue-50 hover:bg-blue-100'
                    }`}>
                      {result.status === '已批改' ? '查看明細' : '進入閱卷'}
                      <ArrowRight className="w-4 h-4 ml-1 transform group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredResults.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-16 text-center text-gray-500 bg-gray-50/50">
                    <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="font-semibold text-gray-900">該班級尚未有學生完成此測驗</p>
                    <p className="text-sm mt-1">或是沒有搜尋到符合名稱的學生。</p>
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
