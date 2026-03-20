import React, { useState } from 'react';
import { PenTool, Calendar, Clock, PlusCircle, FileText, Settings, PlayCircle, Send, X } from 'lucide-react';

export default function ExamBuilder() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [currentExam, setCurrentExam] = useState(null);
  const [selectedClasses, setSelectedClasses] = useState([]);

  const availableClasses = [
    { id: 1, name: '10A 數理資優班' },
    { id: 2, name: '10B 普通班' },
    { id: 3, name: '11A 語文資優班' },
    { id: 4, name: '11B 物理特訓班' },
  ];

  const mockExams = [
    { id: 1, title: '期中生物總測驗', questions: 25, classes: ['10A 數理資優班', '10B 普通班'], duration: '60 分鐘', status: '已發布' },
    { id: 2, title: '代數每週小考', questions: 10, classes: [], duration: '20 分鐘', status: '草稿' },
    { id: 3, title: '物理期末考', questions: 50, classes: ['11B 物理特訓班'], duration: '120 分鐘', status: '即將開始' },
  ];

  const openAssignModal = (exam) => {
    setCurrentExam(exam);
    setSelectedClasses(exam.classes || []);
    setIsAssignModalOpen(true);
  };

  const toggleClass = (className) => {
    if (selectedClasses.includes(className)) {
      setSelectedClasses(selectedClasses.filter(c => c !== className));
    } else {
      setSelectedClasses([...selectedClasses, className]);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">試卷建立與指派</h1>
          <p className="text-sm text-gray-500 mt-1">建立測驗內容，並將試卷勾選指派給一個或多個班級進行作答。</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm font-medium text-sm">
          <PlusCircle className="w-4 h-4 mr-2" />
          建立新試卷
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockExams.map((exam) => (
          <div key={exam.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className={`px-2.5 py-1 rounded-md text-xs font-bold tracking-wider ${
                  exam.status === '已發布' ? 'bg-emerald-100 text-emerald-800' : 
                  exam.status === '草稿' ? 'bg-gray-100 text-gray-700' : 'bg-blue-100 text-blue-800'
                }`}>
                  {exam.status}
                </div>
                <button className="text-gray-400 hover:text-gray-800 transition-colors">
                  <Settings className="w-5 h-5" />
                </button>
              </div>

              <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{exam.title}</h3>
              
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <div className="flex items-center">
                  <FileText className="w-4 h-4 mr-1.5" />
                  共 {exam.questions} 題
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1.5" />
                  {exam.duration}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-2">已指派至</p>
                <div className="flex flex-wrap gap-2">
                  {exam.classes.map((c, i) => (
                    <span key={i} className="px-2 py-1 bg-gray-50 border border-gray-200 rounded text-xs text-gray-600 font-medium">
                      {c}
                    </span>
                  ))}
                  {exam.classes.length === 0 && (
                    <span className="text-sm text-gray-400 italic">尚未指派任何班級</span>
                  )}
                </div>
              </div>

            </div>
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex gap-3">
              <button className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors flex justify-center items-center">
                <PenTool className="w-4 h-4 mr-2" />
                編輯
              </button>
              <button 
                onClick={() => openAssignModal(exam)}
                className="flex-1 px-3 py-2 bg-indigo-50 border border-indigo-200 rounded-lg text-sm font-medium text-indigo-700 hover:bg-indigo-100 transition-colors flex justify-center items-center"
              >
                <Send className="w-4 h-4 mr-2" />
                指派班級
              </button>
            </div>
          </div>
        ))}

        <button className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center p-8 hover:bg-gray-100 hover:border-gray-400 transition-all text-gray-500 hover:text-gray-700 min-h-[320px]">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm mb-4">
            <PlusCircle className="w-8 h-8 text-indigo-500" />
          </div>
          <span className="font-semibold text-lg">建立新試卷</span>
          <span className="text-sm mt-1 text-center max-w-xs">從零開始建立全新的考題，或是從題庫模板中快速匯入。</span>
        </button>
      </div>

      {/* Assign Modal */}
      {isAssignModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h2 className="text-lg font-bold text-gray-900 border-l-4 border-indigo-500 pl-3">指派試卷：{currentExam?.title}</h2>
              <button onClick={() => setIsAssignModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors bg-white rounded-full p-1 border border-gray-200 hover:bg-gray-100">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-6">
              <p className="text-gray-500 text-sm mb-5">請勾選您要將此試卷指派給哪些班級。系統會自動發送測驗通知。</p>
              
              <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                {availableClasses.map(cls => (
                  <label key={cls.id} className={`flex items-center p-3 border rounded-xl cursor-pointer transition-all ${selectedClasses.includes(cls.name) ? 'border-indigo-500 bg-indigo-50 shadow-sm' : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'}`}>
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 mr-3"
                      checked={selectedClasses.includes(cls.name)}
                      onChange={() => toggleClass(cls.name)}
                    />
                    <span className={`font-medium ${selectedClasses.includes(cls.name) ? 'text-indigo-900' : 'text-gray-700'}`}>{cls.name}</span>
                  </label>
                ))}
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                <button 
                  onClick={() => setIsAssignModalOpen(false)} 
                  className="px-5 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  取消
                </button>
                <button 
                  onClick={() => {
                    alert(`已成功將「${currentExam.title}」指派給 ${selectedClasses.length} 個班級！`);
                    setIsAssignModalOpen(false);
                  }} 
                  className="px-5 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm flex items-center"
                >
                  <Send className="w-4 h-4 mr-2" />
                  確認指派
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
