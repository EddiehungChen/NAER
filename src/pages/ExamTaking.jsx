import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Clock, ChevronLeft, ChevronRight, CheckCircle, AlertTriangle } from 'lucide-react';

export default function ExamTaking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const mockExamData = {
    title: '期中生物總測驗',
    duration: 60,
    questions: [
      { id: 1, text: '細胞的「能量發電廠」是下列哪一個胞器？', options: ['細胞核', '粒線體', '核糖體', '內質網'] },
      { id: 2, text: '下列哪一種物理現象讓天空呈現藍色？', options: ['光的反射', '光的折射', '瑞利散射', '光的繞射'] },
      { id: 3, text: '金的化學元素符號是什麼？', options: ['Ag', 'Au', 'Gd', 'Go'] },
    ]
  };

  const currentQuestion = mockExamData.questions[currentQ];
  const progressPercentage = (Object.keys(answers).length / mockExamData.questions.length) * 100;

  const handleSelectOption = (option) => {
    setAnswers({ ...answers, [currentQuestion.id]: option });
  };

  const handleSubmit = () => {
    // In a real app, send to API. Here, mock submission.
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-10 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">測驗已成功提交！</h1>
          <p className="text-gray-500 mb-8">您的作答紀錄已儲存。待老師批改完成後，您可以在成績頁面查看結果。</p>
          <button 
            onClick={() => navigate('/dashboard')}
            className="w-full py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium transition-colors shadow-sm"
          >
            返回儀表板
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-xl font-bold text-gray-900">{mockExamData.title}</h1>
          <p className="text-sm text-gray-500">第 {currentQ + 1} 題，共 {mockExamData.questions.length} 題</p>
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center text-orange-600 font-medium bg-orange-50 px-3 py-1.5 rounded-lg border border-orange-200">
            <Clock className="w-5 h-5 mr-2" />
            59:45
          </div>
          <button 
            onClick={handleSubmit}
            className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors shadow-sm"
          >
            交卷
          </button>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-gray-200 w-full h-1.5">
        <div className="bg-blue-600 h-1.5 transition-all duration-300" style={{ width: `${progressPercentage}%` }}></div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar/Navigation */}
        <div className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col shrink-0 hidden md:flex">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">題目列表</h3>
          <div className="grid grid-cols-4 gap-2">
            {mockExamData.questions.map((q, index) => {
              const isAnswered = !!answers[q.id];
              const isActive = index === currentQ;
              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentQ(index)}
                  className={`w-10 h-10 rounded-lg text-sm font-semibold transition-all border
                    ${isActive ? 'ring-2 ring-blue-500 ring-offset-1 border-blue-500 bg-blue-50 text-blue-700' : 
                      isAnswered ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                    }
                  `}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-100 p-4 bg-orange-50 rounded-xl border border-orange-100 text-orange-800 text-sm">
            <div className="flex items-start">
              <AlertTriangle className="w-5 h-5 mr-2 shrink-0 mt-0.5 text-orange-500" />
              <p>測驗進行中請勿關閉此視窗。系統將會自動儲存您的作答進度。</p>
            </div>
          </div>
        </div>

        {/* Main Question Area */}
        <div className="flex-1 p-8 overflow-y-auto w-full max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-6">
            <div className="flex mb-6">
              <span className="text-2xl font-bold text-blue-600 mr-4">Q{currentQ + 1}.</span>
              <h2 className="text-2xl font-semibold text-gray-900 leading-tight">
                {currentQuestion.text}
              </h2>
            </div>
            
            <div className="space-y-3 pl-12">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = answers[currentQuestion.id] === option;
                return (
                  <label 
                    key={idx} 
                    className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      isSelected ? 'border-blue-500 bg-blue-50 shadow-sm' : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-gray-50'
                    }`}
                  >
                    <input 
                      type="radio" 
                      className="hidden" 
                      name={`question-${currentQuestion.id}`} 
                      checked={isSelected}
                      onChange={() => handleSelectOption(option)}
                    />
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-4 shrink-0 transition-colors ${
                      isSelected ? 'border-blue-500' : 'border-gray-300'
                    }`}>
                      {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>}
                    </div>
                    <span className={`text-lg ${isSelected ? 'text-gray-900 font-medium' : 'text-gray-700'}`}>
                      {option}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="flex justify-between items-center px-4">
            <button
              onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
              disabled={currentQ === 0}
              className={`flex items-center px-5 py-2.5 rounded-lg font-medium transition-colors ${
                currentQ === 0 ? 'text-gray-400 bg-gray-100 cursor-not-allowed' : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 shadow-sm'
              }`}
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              上一題
            </button>
            
            {currentQ === mockExamData.questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="flex items-center justify-center px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium transition-colors shadow-sm"
              >
                交卷 <CheckCircle className="w-5 h-5 ml-2" />
              </button>
            ) : (
              <button
                onClick={() => setCurrentQ(Math.min(mockExamData.questions.length - 1, currentQ + 1))}
                className="flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors shadow-sm"
              >
                下一題
                <ChevronRight className="w-5 h-5 ml-1" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
