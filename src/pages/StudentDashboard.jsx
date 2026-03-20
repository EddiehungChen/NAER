import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { FileText, Clock, CheckCircle, AlertCircle, PlayCircle, BarChart2 } from 'lucide-react';

export default function StudentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const assignedExams = [
    { id: 101, title: '期中生物總測驗', subject: '生物', duration: '60 分鐘', questions: 25, dueDate: '今天 23:59前', status: '待完成' },
    { id: 102, title: '代數每週小考', subject: '數學', duration: '20 分鐘', questions: 10, dueDate: '明天 17:00前', status: '待完成' }
  ];

  const recentResults = [
    { id: 201, title: '物理期末考', score: 78, date: '2025年5月15日' },
    { id: 202, title: '歷史期中申論題', score: 92, date: '2025年5月10日' }
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">歡迎回來，{user?.name}！</h1>
          <p className="text-blue-100 max-w-lg">你目前有 {assignedExams.length} 項待完成的測驗項目。繼續保持好表現！</p>
        </div>
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-1/4 translate-y-1/4">
          <BarChart2 className="w-64 h-64" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content: Pending Exams */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <AlertCircle className="w-5 h-5 text-orange-500 mr-2" />
              待完成測驗
            </h2>
          </div>

          <div className="space-y-4">
            {assignedExams.map((exam) => (
              <div key={exam.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-blue-300 transition-colors">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-md uppercase tracking-wider">
                      {exam.subject}
                    </span>
                    <span className="text-xs text-orange-600 font-semibold bg-orange-50 px-2 py-1 rounded-md flex items-center">
                      <Clock className="w-3 h-3 mr-1" /> 期限：{exam.dueDate}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{exam.title}</h3>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <span className="flex items-center"><FileText className="w-4 h-4 mr-1.5" /> {exam.questions} 題</span>
                    <span className="flex items-center"><Clock className="w-4 h-4 mr-1.5" /> {exam.duration}</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => navigate(`/exam/${exam.id}`)}
                  className="w-full sm:w-auto px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm flex items-center justify-center shrink-0"
                >
                  <PlayCircle className="w-5 h-5 mr-2" />
                  開始測驗
                </button>
              </div>
            ))}
            {assignedExams.length === 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center text-gray-500">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                <p className="text-lg font-medium text-gray-900">太棒了！</p>
                <p>你目前沒有任何待完成的測驗。</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar: Recent Results */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
            最近成績
          </h2>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="divide-y divide-gray-100">
              {recentResults.map((result) => (
                <div key={result.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <h4 className="font-semibold text-gray-900 line-clamp-1">{result.title}</h4>
                  <div className="flex justify-between items-end mt-2">
                    <span className="text-xs text-gray-500">{result.date}</span>
                    <span className={`font-bold text-lg ${result.score >= 80 ? 'text-green-600' : 'text-blue-600'}`}>
                      {result.score} 分
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 bg-gray-50 border-t border-gray-200 text-center">
              <button className="text-sm font-semibold text-blue-600 hover:text-blue-800">
                查看所有成績
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
