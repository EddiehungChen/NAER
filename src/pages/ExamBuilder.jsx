import React, { useState } from 'react';
import { PenTool, Clock, PlusCircle, FileText, Settings, PlayCircle, Send, X, CheckSquare, Square, Layers, BookOpen, ChevronUp, ChevronDown, Check } from 'lucide-react';

export default function ExamBuilder() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Assign Modal States
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedExamsToAssign, setSelectedExamsToAssign] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  
  // Create Exam Modal States
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newExamTitle, setNewExamTitle] = useState('');
  const [selectedQuestions, setSelectedQuestions] = useState([]); // array of question IDs in order

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
    { id: 1, title: '期中數學素養評量', questions: 25, classes: ['10A 數理資優班', '10B 普通班'], duration: '60 分鐘', status: '已發布' },
    { id: 2, title: '生活應用數學小測驗', questions: 10, classes: [], duration: '20 分鐘', status: '草稿' },
    { id: 3, title: '幾何圖形與數據分析挑戰', questions: 50, classes: ['11B 物理特訓班'], duration: '120 分鐘', status: '即將開始' },
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

  // Reorderable question handlers
  const handleAddQuestion = (qId) => {
    if (!selectedQuestions.includes(qId)) {
      setSelectedQuestions([...selectedQuestions, qId]);
    }
  };

  const handleRemoveQuestion = (qId) => {
    setSelectedQuestions(selectedQuestions.filter(id => id !== qId));
  };

  const handleMoveUp = (index) => {
    if (index === 0) return;
    const newItems = [...selectedQuestions];
    [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
    setSelectedQuestions(newItems);
  };

  const handleMoveDown = (index) => {
    if (index === selectedQuestions.length - 1) return;
    const newItems = [...selectedQuestions];
    [newItems[index + 1], newItems[index]] = [newItems[index], newItems[index + 1]];
    setSelectedQuestions(newItems);
  };

  const handleCreateExam = () => {
    if (!newExamTitle.trim()) {
      alert('請輸入試卷名稱！');
      return;
    }
    if (selectedQuestions.length === 0) {
      alert('請至少挑選一題加入試卷！');
      return;
    }
    const newExam = {
      id: Date.now(),
      title: newExamTitle,
      questions: selectedQuestions.length,
      classes: [],
      duration: '45 分鐘',
      status: '草稿' /* 草稿可以後續發布作答 */
    };
    setMockExams([newExam, ...mockExams]);
    setIsCreateModalOpen(false);
    setNewExamTitle('');
    setSelectedQuestions([]);
    alert(`成功！依您指定的順序組建了一份包含 ${selectedQuestions.length} 題的全新試卷。`);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto pb-24">
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">試卷組建與批次指派</h1>
          <p className="text-sm text-gray-500 mt-1">從強大的題庫系統中自由選題、調換順序，並批次派發給全校班級。</p>
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

      {/* Create Exam Modal (Questions Selection + Reordering) */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col h-[85vh]">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50 shrink-0">
              <h2 className="text-xl font-bold text-gray-900 border-l-4 border-indigo-500 pl-3 flex items-center">
                <Layers className="w-6 h-6 mr-2 text-indigo-600" />
                靈活組建您的精選試卷
              </h2>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors bg-white rounded-full p-2 border border-gray-200 hover:bg-gray-100">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-hidden flex flex-col flex-1 bg-gray-50/50">
              <div className="mb-6 flex-shrink-0">
                <label className="block text-sm font-bold text-gray-700 mb-2">試卷名稱 / Title</label>
                <input 
                  type="text"
                  placeholder="例如：112學年度下學期 數學素養總結測驗"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-shadow shadow-sm font-medium text-gray-800"
                  value={newExamTitle}
                  onChange={(e) => setNewExamTitle(e.target.value)}
                />
              </div>

              {/* Two Column Layout for Question Builder */}
              <div className="flex flex-col md:flex-row gap-6 flex-1 min-h-0">
                {/* Left Column: Question Bank */}
                <div className="flex-1 flex flex-col border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden">
                  <div className="bg-gray-100 px-4 py-3 font-bold border-b border-gray-200 flex justify-between items-center text-gray-700">
                    <span className="flex items-center"><BookOpen className="w-4 h-4 mr-2"/> 步驟一：從題庫挑選試題</span>
                    <span className="bg-gray-200 px-2 py-0.5 rounded text-xs">共 {questionBank.length} 題</span>
                  </div>
                  <div className="overflow-y-auto flex-1 p-3 space-y-2">
                    {questionBank.map(q => {
                      const isAdded = selectedQuestions.includes(q.id);
                      return (
                        <div key={q.id} className={`flex items-center justify-between p-3 border rounded-lg transition-colors ${isAdded ? 'border-gray-200 bg-gray-50 opacity-60' : 'border-gray-200 hover:border-indigo-300 hover:shadow-sm'}`}>
                          <div className="flex-1 mr-3">
                            <p className={`font-medium text-sm mb-1 ${isAdded ? 'text-gray-500 line-through' : 'text-gray-800'}`}>{q.text}</p>
                            <span className={`text-[10px] px-2 py-0.5 rounded border ${q.difficulty === '易' ? 'bg-green-50 text-green-700 border-green-200' : q.difficulty === '中' ? 'bg-orange-50 text-orange-700 border-orange-200' : 'bg-red-50 text-red-700 border-red-200'}`}>{q.difficulty}</span>
                          </div>
                          <button 
                            disabled={isAdded}
                            onClick={() => handleAddQuestion(q.id)}
                            className={`p-2 rounded-lg font-bold flex items-center transition-colors ${isAdded ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'}`}
                          >
                            {isAdded ? <Check className="w-5 h-5" /> : <PlusCircle className="w-5 h-5" />}
                          </button>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Right Column: Added Questions (Reorderable) */}
                <div className="flex-1 flex flex-col border border-indigo-200 rounded-xl bg-indigo-50/30 shadow-sm overflow-hidden">
                  <div className="bg-indigo-100 px-4 py-3 font-bold text-indigo-900 border-b border-indigo-200 flex justify-between items-center">
                    <span className="flex items-center"><PenTool className="w-4 h-4 mr-2"/> 步驟二：檢視與調整順序</span>
                    <span className="bg-indigo-200 px-2 py-0.5 rounded text-xs text-indigo-800">已選定 {selectedQuestions.length} 題</span>
                  </div>
                  <div className="overflow-y-auto p-4 flex-1 space-y-3">
                    {selectedQuestions.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-indigo-300">
                        <Layers className="w-16 h-16 mb-4 opacity-50" />
                        <p className="font-medium">請從左側題庫點選「+」加入試題</p>
                      </div>
                    ) : (
                      selectedQuestions.map((qId, index) => {
                        const q = questionBank.find(x => x.id === qId);
                        return (
                          <div key={qId} className="flex items-center bg-white p-3 rounded-xl border border-indigo-100 shadow-[0_2px_4px_rgba(0,0,0,0.02)] group hover:border-indigo-300 transition-colors">
                            <div className="flex flex-col mr-3 bg-gray-50 rounded-lg p-0.5 border border-gray-100">
                              <button onClick={() => handleMoveUp(index)} disabled={index===0} className="p-1 hover:bg-gray-200 rounded text-gray-500 disabled:opacity-30 disabled:hover:bg-transparent"><ChevronUp className="w-4 h-4"/></button>
                              <button onClick={() => handleMoveDown(index)} disabled={index===selectedQuestions.length-1} className="p-1 hover:bg-gray-200 rounded text-gray-500 disabled:opacity-30 disabled:hover:bg-transparent"><ChevronDown className="w-4 h-4"/></button>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm mr-3 shrink-0">
                              {index + 1}
                            </div>
                            <div className="flex-1 font-medium text-gray-800 text-sm leading-snug break-words pr-2">
                              {q.text}
                            </div>
                            <button onClick={() => handleRemoveQuestion(qId)} className="p-2 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors border border-transparent hover:border-red-100 shrink-0">
                              <X className="w-5 h-5"/>
                            </button>
                          </div>
                        )
                      })
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-white border-t border-gray-200 flex justify-between items-center shrink-0">
              <div className="text-gray-500 text-sm font-medium">
                將依據右側的順序生成學生的試卷畫面
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setIsCreateModalOpen(false)} 
                  className="px-6 py-2.5 border border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors"
                >
                  捨棄並取消
                </button>
                <button 
                  onClick={handleCreateExam} 
                  disabled={selectedQuestions.length === 0}
                  className="px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <CheckSquare className="w-5 h-5 mr-2" />
                  確認完成組卷
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
