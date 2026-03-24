import React, { useState } from 'react';
import { PenTool, Clock, PlusCircle, FileText, Settings, PlayCircle, Send, X, CheckSquare, Square, Layers, BookOpen } from 'lucide-react';

export default function ExamBuilder() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Assign Modal States
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedExamsToAssign, setSelectedExamsToAssign] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  
  // Create Exam Modal States
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newExamTitle, setNewExamTitle] = useState('');
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  const availableClasses = [
    { id: 1, name: '10A 數理資優班' },
    { id: 2, name: '10B 普通班' },
    { id: 3, name: '11A 語文資優班' },
    { id: 4, name: '11B 物理特訓班' },
  ];

  const titles = [
    '還款利息', '浴缸函數', '實物三視圖', '三角圖', '硬幣魔術', '歐洲足球聯賽', '命運大轉盤', '歡樂樂透', '疊影重重', '防疫座位安排', 
    '一定命中撲克牌', '手掌量角器', '最短路徑', '科赫雪花', '灌籃高手', '彩繪玻璃鑲嵌', '獵豹外送', '操場內外圈', '面積估計', '電費', 
    '文字邏輯', '一步的平均距離', '一起來運動', '水費計算', '安全舒適游泳空間', '收入與支出', '你健康嗎?', '消費稅', '記帳練習', '馬拉松', 
    '視力檢查', '最佳投手', '棒球場', '園遊會義賣', '體適能大挑戰', '職棒選手', '愛文芒果採收季', '裝置藝術', '扇形車庫', '對稱繪圖', 
    '紙張達人', '教室大掃除', '分組活動', '值日生', '雨水撲滿', '3c廢材回收抵用金', '雨量', '七巧板', '當骰子遇到疊疊樂', '三角形行不行', 
    '手搖飲料', '用餐費用', '數值簡化', '怎麼買最省錢', '冷氣機更換', '換購儲物罐', '世大運的廚餘和剩食', '採購消防服'
  ];
  
  const questionBank = titles.map((t, idx) => ({ 
    id: 101 + idx, 
    text: t, 
    subject: '數學素養', 
    difficulty: idx % 3 === 0 ? '中' : idx % 3 === 1 ? '難' : '易' 
  }));

  const [mockExams, setMockExams] = useState([
    { id: 1, title: '期中生物總測驗', questions: 25, classes: ['10A 數理資優班', '10B 普通班'], duration: '60 分鐘', status: '已發布' },
    { id: 2, title: '代數每週小考', questions: 10, classes: [], duration: '20 分鐘', status: '草稿' },
    { id: 3, title: '物理期末考', questions: 50, classes: ['11B 物理特訓班'], duration: '120 分鐘', status: '即將開始' },
  ]);

  const toggleExamSelection = (examId) => {
    if (selectedExamsToAssign.includes(examId)) {
      setSelectedExamsToAssign(selectedExamsToAssign.filter(id => id !== examId));
    } else {
      setSelectedExamsToAssign([...selectedExamsToAssign, examId]);
    }
  };

  const openAssignModalForMultiple = () => {
    if (selectedExamsToAssign.length === 0) {
      alert('請先選擇至少一份試卷！');
      return;
    }
    setSelectedClasses([]); 
    setIsAssignModalOpen(true);
  };

  const openAssignModalForSingle = (exam) => {
    setSelectedExamsToAssign([exam.id]);
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

  const handleConfirmAssign = () => {
    const updatedExams = mockExams.map(exam => {
      if (selectedExamsToAssign.includes(exam.id)) {
        const uniqueClasses = Array.from(new Set([...exam.classes, ...selectedClasses]));
        return { ...exam, classes: uniqueClasses, status: '已發布' };
      }
      return exam;
    });
    setMockExams(updatedExams);
    alert(`已完成！成功將 ${selectedExamsToAssign.length} 份試卷指派給 ${selectedClasses.length} 個班級！`);
    setIsAssignModalOpen(false);
    setSelectedExamsToAssign([]); 
  };

  const toggleQuestion = (qId) => {
    if (selectedQuestions.includes(qId)) {
      setSelectedQuestions(selectedQuestions.filter(id => id !== qId));
    } else {
      setSelectedQuestions([...selectedQuestions, qId]);
    }
  };

  const handleCreateExam = () => {
    if (!newExamTitle.trim()) {
      alert('請輸入試卷名稱！');
      return;
    }
    if (selectedQuestions.length === 0) {
      alert('請至少選擇一題加入試卷！');
      return;
    }
    const newExam = {
      id: Date.now(),
      title: newExamTitle,
      questions: selectedQuestions.length,
      classes: [],
      duration: '45 分鐘',
      status: '草稿'
    };
    setMockExams([newExam, ...mockExams]);
    setIsCreateModalOpen(false);
    setNewExamTitle('');
    setSelectedQuestions([]);
    alert(`成功從題庫選取了 ${selectedQuestions.length} 題，並建立新試卷！`);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">試卷組建與批次指派</h1>
          <p className="text-sm text-gray-500 mt-1">從題庫勾選多個試題來組建新試卷，或是直接選擇多份試卷批次發布給多個班級。</p>
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm font-medium text-sm"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          組建新試卷
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockExams.map((exam) => {
          const isSelected = selectedExamsToAssign.includes(exam.id);
          return (
          <div key={exam.id} className={`bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-md transition-all relative ${isSelected ? 'border-indigo-500 ring-2 ring-indigo-500' : 'border-gray-200'}`}>
            
            <button 
              onClick={() => toggleExamSelection(exam.id)}
              className="absolute top-4 left-4 z-10 p-1 rounded-md bg-white/80 backdrop-blur-sm hover:bg-white text-gray-400 hover:text-indigo-600 transition-colors"
            >
              {isSelected ? <CheckSquare className="w-6 h-6 text-indigo-600" /> : <Square className="w-6 h-6" />}
            </button>

            <div className="p-6 pt-12">
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
                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-2">已指派班級</p>
                <div className="flex flex-wrap gap-2">
                  {exam.classes.map((c, i) => (
                    <span key={i} className="px-2 py-1 bg-gray-50 border border-gray-200 rounded text-xs text-gray-600 font-medium">
                      {c}
                    </span>
                  ))}
                  {exam.classes.length === 0 && (
                    <span className="text-sm text-gray-400 italic">尚未指派</span>
                  )}
                </div>
              </div>

            </div>
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex gap-3">
              <button 
                onClick={() => openAssignModalForSingle(exam)}
                className="flex-1 px-3 py-2 bg-indigo-50 border border-indigo-200 rounded-lg text-sm font-medium text-indigo-700 hover:bg-indigo-100 transition-colors flex justify-center items-center"
              >
                <Send className="w-4 h-4 mr-2" />
                指派班級
              </button>
              <button className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex justify-center items-center">
                <PenTool className="w-4 h-4 mr-2" />
                編輯
              </button>
            </div>
          </div>
        )})}
      </div>

      {/* Floating Action Bar for Batch Assign */}
      {selectedExamsToAssign.length > 0 && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-6 py-4 rounded-full shadow-2xl flex items-center gap-6 animate-in slide-in-from-bottom-5 z-40">
          <span className="font-medium">已選取 <span className="text-indigo-400 font-bold text-lg mx-1">{selectedExamsToAssign.length}</span> 份試卷</span>
          <button 
            onClick={openAssignModalForMultiple}
            className="px-5 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-500 font-semibold transition-colors flex items-center shadow-lg shadow-indigo-500/30"
          >
            <Send className="w-4 h-4 mr-2" />
            批次指派給班級
          </button>
          <button onClick={() => setSelectedExamsToAssign([])} className="p-1 rounded-full hover:bg-gray-700 transition-colors text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Create Exam Modal (Questions Selection) */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50 shrink-0">
              <h2 className="text-lg font-bold text-gray-900 border-l-4 border-indigo-500 pl-3 flex items-center">
                <Layers className="w-5 h-5 mr-2 text-indigo-600" />
                從題庫組建新試卷
              </h2>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors bg-white rounded-full p-1 border border-gray-200 hover:bg-gray-100">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">試卷名稱</label>
                <input 
                  type="text"
                  placeholder="例如：期中總複習測驗..."
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow"
                  value={newExamTitle}
                  onChange={(e) => setNewExamTitle(e.target.value)}
                />
              </div>

              <h3 className="text-sm font-semibold text-gray-700 mb-3">請在題庫中勾選要加入這份試卷的題目：</h3>
              
              <div className="space-y-3">
                {questionBank.map(q => {
                  const isSelected = selectedQuestions.includes(q.id);
                  return (
                  <label key={q.id} className={`flex items-start p-4 border rounded-xl cursor-pointer transition-all ${isSelected ? 'border-indigo-500 bg-indigo-50/50 shadow-sm' : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'}`}>
                    <div className="pt-0.5">
                      <input 
                        type="checkbox" 
                        className="w-5 h-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 mr-4 cursor-pointer"
                        checked={isSelected}
                        onChange={() => toggleQuestion(q.id)}
                      />
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium mb-1 ${isSelected ? 'text-indigo-900' : 'text-gray-800'}`}>{q.text}</p>
                      <div className="flex gap-2">
                        <span className="text-xs bg-white border border-gray-200 px-2 py-0.5 rounded text-gray-500">{q.subject}</span>
                        <span className={`text-xs px-2 py-0.5 rounded border ${q.difficulty === '易' ? 'bg-green-50 text-green-700 border-green-200' : q.difficulty === '中' ? 'bg-orange-50 text-orange-700 border-orange-200' : 'bg-red-50 text-red-700 border-red-200'}`}>{q.difficulty}</span>
                      </div>
                    </div>
                  </label>
                )})}
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center shrink-0">
              <div className="text-gray-600 font-medium">
                已選取 <span className="text-indigo-600 font-bold text-lg">{selectedQuestions.length}</span> 題
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setIsCreateModalOpen(false)} 
                  className="px-5 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors"
                >
                  取消
                </button>
                <button 
                  onClick={handleCreateExam} 
                  className="px-5 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm flex items-center"
                >
                  <PlusCircle className="w-4 h-4 mr-2" />
                  儲存並建立試卷
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assign Classes Modal */}
      {isAssignModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h2 className="text-lg font-bold text-gray-900 border-l-4 border-indigo-500 pl-3">
                指派 {selectedExamsToAssign.length} 份試卷
              </h2>
              <button onClick={() => setIsAssignModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors bg-white rounded-full p-1 border border-gray-200 hover:bg-gray-100">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-6">
              <p className="text-gray-500 text-sm mb-5">您可以單選或多選多個班級，將這 {selectedExamsToAssign.length} 份試卷一次性指派給他們進行施測。</p>
              
              <div className="space-y-3 mb-6 max-h-60 overflow-y-auto pr-1">
                {availableClasses.map(cls => (
                  <label key={cls.id} className={`flex items-center p-3 border rounded-xl cursor-pointer transition-all ${selectedClasses.includes(cls.name) ? 'border-indigo-500 bg-indigo-50 shadow-sm' : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'}`}>
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 mr-3 cursor-pointer"
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
                  onClick={handleConfirmAssign} 
                  disabled={selectedClasses.length === 0}
                  className="px-5 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4 mr-2" />
                  確認發布
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
