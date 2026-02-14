import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle, 
  ClipboardList, 
  MapPin, 
  User, 
  Activity, 
  Plus, 
  BarChart3,
  X,
  Mail,
  Download,
  ArrowLeft,
  ShieldCheck,
  Leaf,
  Info,
  Lock,
  LogOut,
  ChevronRight,
  Globe
} from 'lucide-react';

// --- TRADUCCIONES ---
const translations = {
  es: {
    appTitle: "HYDROGLOBAL PERÚ",
    appSub: "Seguridad, Salud y Medio Ambiente",
    adminAccess: "Acceso Admin",
    dashboard: "Dashboard",
    logout: "Salir",
    loginTitle: "SISTEMA DE GESTIÓN RACS",
    loginSub: "Acceso restringido para personal SSOMA",
    user: "Usuario",
    pass: "Contraseña",
    loginBtn: "INGRESAR AL PANEL",
    backToForm: "Volver al Formulario Público",
    loginError: "Credenciales Incorrectas",
    adminDashboard: "Dashboard Administrativo",
    activeSession: "Sesión Activa: SSOMA",
    totalReports: "Total Reportes",
    criticalRisk: "Críticos (Alto)",
    safetySST: "Seguridad SST",
    envMA: "M. Ambiente",
    reportList: "Lista de Hallazgos",
    back: "VOLVER",
    docManagement: "Documento de Gestión",
    racsTitle: "REPORTE DE ACTOS Y CONDICIONES SUBESTANDARES - RACS",
    racsArea: "ÁREA DE SEGURIDAD Y SALUD EN EL TRABAJO",
    code: "CÓDIGO",
    date: "FECHA",
    rev: "REV",
    page: "PÁGINA",
    reporterData: "Datos del Reportante",
    name: "Nombre",
    location: "Ubicación",
    classification: "Clasificación",
    sst: "SST",
    ma: "M. AMBIENTE",
    acto: "ACTO",
    condicion: "CONDICIÓN",
    riskLevel: "Nivel de Riesgo del Hallazgo",
    eventDesc: "Descripción del Evento",
    immediateAction: "Acción Inmediata Implementada",
    signatureReporter: "Firma del Reportante",
    signatureSSOMA: "VB° SSOMA Hydroglobal Perú",
    downloadPDF: "DESCARGAR PDF (FR-018)",
    notifySSOMA: "NOTIFICAR A SSOMA",
    formTitle: "REPORTE RACS",
    formSub: "Hydroglobal Perú S.A.C.",
    system: "Sistema",
    nature: "Naturaleza",
    placeholderArea: "Ej: Planta Tratamiento",
    placeholderName: "Su nombre completo",
    placeholderDesc: "Detalle el acto o condición observado...",
    placeholderAction: "¿Qué medida se tomó al momento del hallazgo?",
    generateReport: "GENERAR REPORTE Y CONTINUAR",
    riskAlto: "ALTO",
    riskMedio: "MEDIO",
    riskBajo: "BAJO",
    riskRef: "Referencia del formato HGP-SGIII-SST-FR-018:",
    riskLegends: {
      alto: {
        title: "NIVEL DE RIESGO ALTO",
        sst: "SST: Condición o acto subestándar que de no implementar se controles podría generar lesión con incapacidad permanente, tales como amputaciones, fracturas mayores e inclusive la muerte con relaciona la salud podría generar daños irreversibles tales como intoxicaciones, lesiones múltiples, lesiones letales, pérdida auditiva, etc.",
        ma: "MA: Daños irreversibles al ambiente. No es posible aplicar una remediación al 100% con los controles actuales."
      },
      medio: {
        title: "NIVEL DE RIESGO MEDIO",
        sst: "SST: Condición o acto subestándar que de no implementarse controles podría generar lesiones con incapacidad temporal tales como fracturas menores, entre otros. Con relación a salud podría generar daños reversibles tales como dermatitis, asmas, trastornos musculoesqueléticos, etc.",
        ma: "MA: Daños reversibles al ambiente aplicando controles. Es posible aplicar controles y restablecer las condiciones iniciales del ambiente."
      },
      bajo: {
        title: "NIVEL DE RIESGO BAJO",
        sst: "SST: Condición o acto subestándar que de no implementarse controles podría generar lesiones sin discapacidad tales como pequeños cortes o magulladuras. Con relación a la salud podría generar daños irreversibles tales como molestias, dolor de cabeza, etc.",
        ma: "MA: Daños potenciales o reales reversibles al ambiente en forma inmediata."
      }
    }
  },
  en: {
    appTitle: "HYDROGLOBAL PERU",
    appSub: "Safety, Health and Environment",
    adminAccess: "Admin Access",
    dashboard: "Dashboard",
    logout: "Logout",
    loginTitle: "RACS MANAGEMENT SYSTEM",
    loginSub: "Restricted access for SSOMA personnel",
    user: "User",
    pass: "Password",
    loginBtn: "ENTER PANEL",
    backToForm: "Back to Public Form",
    loginError: "Incorrect Credentials",
    adminDashboard: "Administrative Dashboard",
    activeSession: "Active Session: SSOMA",
    totalReports: "Total Reports",
    criticalRisk: "Critical (High)",
    safetySST: "SST Safety",
    envMA: "Environment",
    reportList: "Findings List",
    back: "BACK",
    docManagement: "Management Document",
    racsTitle: "SUBSTANDARD ACTS AND CONDITIONS REPORT - RACS",
    racsArea: "OCCUPATIONAL SAFETY AND HEALTH AREA",
    code: "CODE",
    date: "DATE",
    rev: "REV",
    page: "PAGE",
    reporterData: "Reporter Data",
    name: "Name",
    location: "Location",
    classification: "Classification",
    sst: "SST",
    ma: "ENVIRONMENT",
    acto: "ACT",
    condicion: "CONDITION",
    riskLevel: "Finding Risk Level",
    eventDesc: "Event Description",
    immediateAction: "Immediate Action Implemented",
    signatureReporter: "Reporter's Signature",
    signatureSSOMA: "Appr. SSOMA Hydroglobal Peru",
    downloadPDF: "DOWNLOAD PDF (FR-018)",
    notifySSOMA: "NOTIFY SSOMA",
    formTitle: "RACS REPORT",
    formSub: "Hydroglobal Peru S.A.C.",
    system: "System",
    nature: "Nature",
    placeholderArea: "e.g., Treatment Plant",
    placeholderName: "Your full name",
    placeholderDesc: "Detail the observed act or condition...",
    placeholderAction: "What measure was taken at the time of the finding?",
    generateReport: "GENERATE REPORT AND CONTINUE",
    riskAlto: "HIGH",
    riskMedio: "MEDIUM",
    riskBajo: "LOW",
    riskRef: "Reference from format HGP-SGIII-SST-FR-018:",
    riskLegends: {
      alto: {
        title: "HIGH RISK LEVEL",
        sst: "SST: Substandard condition or act that, if controls are not implemented, could generate permanent disabling injury, such as amputations, major fractures and even death. Regarding health, it could generate irreversible damage such as poisoning, multiple injuries, lethal injuries, hearing loss, etc.",
        ma: "MA: Irreversible damage to the environment. It is not possible to apply 100% remediation with current controls."
      },
      medio: {
        title: "MEDIUM RISK LEVEL",
        sst: "SST: Substandard condition or act that, if controls are not implemented, could generate temporary disabling injuries such as minor fractures, among others. Regarding health, it could generate reversible damage such as dermatitis, asthma, musculoskeletal disorders, etc.",
        ma: "MA: Reversible damage to the environment by applying controls. It is possible to apply controls and restore the initial conditions of the environment."
      },
      bajo: {
        title: "LOW RISK LEVEL",
        sst: "SST: Substandard condition or act that, if controls are not implemented, could generate non-disabling injuries such as small cuts or bruises. Regarding health, it could generate irreversible damage such as discomfort, headache, etc.",
        ma: "MA: Potential or real reversible damage to the environment immediately."
      }
    }
  },
  zh: {
    appTitle: "HYDROGLOBAL 秘鲁",
    appSub: "安全、健康与环境",
    adminAccess: "管理员登录",
    dashboard: "仪表板",
    logout: "登出",
    loginTitle: "RACS 管理系统",
    loginSub: "仅限 SSOMA 人员访问",
    user: "用户名",
    pass: "密码",
    loginBtn: "进入面板",
    backToForm: "返回公共表单",
    loginError: "凭据错误",
    adminDashboard: "行政管理面板",
    activeSession: "当前会话：SSOMA",
    totalReports: "报告总数",
    criticalRisk: "关键（高）",
    safetySST: "SST 安全",
    envMA: "环境",
    reportList: "发现列表",
    back: "返回",
    docManagement: "管理文件",
    racsTitle: "违规行为与状况报告 - RACS",
    racsArea: "职业安全与健康部门",
    code: "代码",
    date: "日期",
    rev: "版本",
    page: "页码",
    reporterData: "报告人信息",
    name: "姓名",
    location: "地点",
    classification: "分类",
    sst: "SST",
    ma: "环境",
    acto: "行为",
    condicion: "状况",
    riskLevel: "风险等级",
    eventDesc: "事件描述",
    immediateAction: "立即采取的措施",
    signatureReporter: "报告人签名",
    signatureSSOMA: "SSOMA 审批 (Hydroglobal 秘鲁)",
    downloadPDF: "下载 PDF (FR-018)",
    notifySSOMA: "通知 SSOMA",
    formTitle: "RACS 报告",
    formSub: "Hydroglobal Peru S.A.C.",
    system: "系统",
    nature: "性质",
    placeholderArea: "例如：处理厂",
    placeholderName: "您的全名",
    placeholderDesc: "详细描述观察到的行为或状况...",
    placeholderAction: "发现当时采取了什么措施？",
    generateReport: "生成报告并继续",
    riskAlto: "高",
    riskMedio: "中",
    riskBajo: "低",
    riskRef: "参考 HGP-SGIII-SST-FR-018 格式：",
    riskLegends: {
      alto: {
        title: "高风险等级",
        sst: "SST：如果不实施控制，不标准状况或行为可能导致永久性残疾，如截肢、重大骨折甚至死亡。关于健康，可能产生不可逆转的损害，如中毒、多发伤、致命伤、听力损失等。",
        ma: "MA：对环境产生不可逆转的损害。目前的控制措施无法实现 100% 的修复。"
      },
      medio: {
        title: "中风险等级",
        sst: "SST：如果不实施控制，不标准状况或行为可能导致暂时性残疾，如轻微骨折等。关于健康，可能产生可逆转的损害，如皮炎、哮喘、肌肉骨骼疾病等。",
        ma: "MA：通过实施控制措施可对环境产生可逆转损害。可以实施控制措施并恢复环境的初始状态。"
      },
      bajo: {
        title: "低风险等级",
        sst: "SST：如果不实施控制，不标准状况或行为可能导致非致残性伤害，如小割伤或瘀伤。关于健康，可能产生不可逆转的损害，如不适、头痛等。",
        ma: "MA：对环境产生的潜在或真实的可立即逆转的损害。"
      }
    }
  }
};

export default function App() {
  const [lang, setLang] = useState('es');
  const [currentView, setCurrentView] = useState('form'); 
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [reports, setReports] = useState([
    {
      id: "HGP-RACS-2026-001",
      type: 'condicion',
      category: 'SST',
      risk: 'alto',
      area: 'Planta de Procesos',
      description: 'Andamio mal asegurado en nivel 3, riesgo de caída de altura.',
      status: 'pendiente',
      date: '2024-02-14',
      reporter: 'Frans Vargas',
      action: 'Se paralizó la labor y se solicitó re-armado por personal certificado.'
    }
  ]);

  const t = translations[lang];

  const emailsSSOMA = [
    "fransvargas@hydroglobal.hk",
    "saludocupacional@hydroglobal.hk"
  ];

  const handleAddReport = (newReport) => {
    setReports([newReport, ...reports]);
    setSelectedReport(newReport);
    setCurrentView('detail');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentView('form');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Navbar Hydroglobal Perú */}
      <nav className="bg-[#003366] text-white shadow-xl sticky top-0 z-50 border-b-4 border-blue-400 no-print">
        <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-white p-1 rounded-sm">
              <ShieldCheck size={28} className="text-[#003366]" />
            </div>
            <div>
              <h1 className="font-black text-xl tracking-tighter leading-none italic">{t.appTitle}</h1>
              <p className="text-[9px] uppercase tracking-[0.2em] font-bold text-blue-200">{t.appSub}</p>
            </div>
          </div>
          
          <div className="flex gap-4 items-center">
            {/* SELECTOR DE IDIOMA */}
            <div className="flex bg-blue-900/50 p-1 rounded-lg border border-blue-700 items-center">
              <Globe size={14} className="mx-2 text-blue-300" />
              <button onClick={() => setLang('es')} className={`px-2 py-1 text-[10px] font-black rounded ${lang === 'es' ? 'bg-blue-500 text-white' : 'text-blue-300 hover:text-white'}`}>ES</button>
              <button onClick={() => setLang('en')} className={`px-2 py-1 text-[10px] font-black rounded ${lang === 'en' ? 'bg-blue-500 text-white' : 'text-blue-300 hover:text-white'}`}>EN</button>
              <button onClick={() => setLang('zh')} className={`px-2 py-1 text-[10px] font-black rounded ${lang === 'zh' ? 'bg-blue-500 text-white' : 'text-blue-300 hover:text-white'}`}>ZH</button>
            </div>

            {!isAuthenticated ? (
              <button 
                onClick={() => setCurrentView('login')}
                className="text-[10px] font-black uppercase flex items-center gap-2 bg-blue-800/50 px-3 py-1.5 rounded border border-blue-700 hover:bg-blue-700 transition-colors"
              >
                <Lock size={14} /> {t.adminAccess}
              </button>
            ) : (
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setCurrentView('dashboard')}
                  className="text-[10px] font-black uppercase text-blue-200 hover:text-white"
                >
                  {t.dashboard}
                </button>
                <button 
                  onClick={logout}
                  className="text-[10px] font-black uppercase flex items-center gap-2 bg-red-900/50 px-3 py-1.5 rounded border border-red-700 hover:bg-red-700 transition-colors"
                >
                  <LogOut size={14} /> {t.logout}
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-6">
        {currentView === 'form' && (
          <ReportForm 
            onSubmit={handleAddReport} 
            t={t}
          />
        )}
        {currentView === 'login' && (
          <LoginView 
            onLoginSuccess={() => { setIsAuthenticated(true); setCurrentView('dashboard'); }}
            onCancel={() => setCurrentView('form')}
            t={t}
          />
        )}
        {currentView === 'dashboard' && isAuthenticated && (
          <Dashboard 
            reports={reports} 
            onNewReport={() => setCurrentView('form')} 
            onViewDetail={(r) => { setSelectedReport(r); setCurrentView('detail'); }}
            t={t}
          />
        )}
        {currentView === 'detail' && (
          <ReportDetail 
            report={selectedReport} 
            emails={emailsSSOMA}
            onBack={() => setCurrentView(isAuthenticated ? 'dashboard' : 'form')} 
            t={t}
          />
        )}
      </main>
    </div>
  );
}

// --- VISTA: LOGIN ---
function LoginView({ onLoginSuccess, onCancel, t }) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (user === 'admin' && pass === 'hydro2026') {
      onLoginSuccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 animate-in fade-in zoom-in duration-300">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        <div className="bg-[#003366] p-8 text-center text-white">
          <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-blue-400">
            <Lock size={32} />
          </div>
          <h2 className="text-xl font-black italic">{t.loginTitle}</h2>
          <p className="text-blue-300 text-[10px] font-bold uppercase tracking-widest mt-1">{t.loginSub}</p>
        </div>
        <form onSubmit={handleLogin} className="p-8 space-y-4">
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{t.user}</label>
            <input 
              type="text" 
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
          </div>
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{t.pass}</label>
            <input 
              type="password" 
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
            />
          </div>
          {error && <p className="text-red-600 text-[10px] font-bold text-center uppercase animate-pulse">{t.loginError}</p>}
          <button type="submit" className="w-full bg-[#003366] text-white py-4 rounded-xl font-black uppercase tracking-widest hover:bg-blue-900 transition-all shadow-lg">
            {t.loginBtn}
          </button>
          <button type="button" onClick={onCancel} className="w-full text-slate-400 text-[10px] font-black uppercase hover:text-slate-600 transition-colors">
            {t.backToForm}
          </button>
        </form>
      </div>
    </div>
  );
}

// --- VISTA: DASHBOARD (ADMIN) ---
function Dashboard({ reports, onNewReport, onViewDetail, t }) {
  const stats = {
    total: reports.length,
    highRisk: reports.filter(r => r.risk === 'alto').length,
    sst: reports.filter(r => r.category === 'SST').length,
    ma: reports.filter(r => r.category === 'MA').length
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-extrabold text-[#003366]">{t.adminDashboard}</h2>
        <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black uppercase border border-emerald-200">
          {t.activeSession}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatBox label={t.totalReports} value={stats.total} icon={<ClipboardList className="text-blue-600" size={18}/>} />
        <StatBox label={t.criticalRisk} value={stats.highRisk} icon={<AlertTriangle className="text-red-600" size={18}/>} highlight />
        <StatBox label={t.safetySST} value={stats.sst} icon={<ShieldCheck className="text-blue-800" size={18}/>} />
        <StatBox label={t.envMA} value={stats.ma} icon={<Leaf className="text-green-600" size={18}/>} />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 className="font-bold text-[#003366] flex items-center gap-2 text-sm uppercase tracking-wider">
            <BarChart3 size={16} /> {t.reportList}
          </h3>
        </div>
        <div className="divide-y divide-slate-100">
          {reports.map((report) => (
            <div 
              key={report.id} 
              onClick={() => onViewDetail(report)}
              className="p-4 hover:bg-blue-50/50 transition-colors cursor-pointer flex justify-between items-center"
            >
              <div>
                <div className="flex gap-2 mb-1">
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded ${report.risk === 'alto' ? 'bg-red-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                    {report.risk.toUpperCase()}
                  </span>
                  <span className="text-[9px] font-black text-blue-800 uppercase">{report.id}</span>
                </div>
                <h4 className="font-bold text-slate-800 text-sm line-clamp-1">{report.description}</h4>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter mt-1">{report.area} • {report.reporter}</p>
              </div>
              <ChevronRight className="text-slate-300" size={20} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- VISTA: DETALLE (FORMATO OFICIAL) ---
function ReportDetail({ report, emails, onBack, t }) {
  const generatePDF = () => window.print();

  const sendEmails = () => {
    const subject = encodeURIComponent(`${t.racsTitle} - ${t.appTitle} - ${report.id}`);
    const body = encodeURIComponent(`Hello,\n\nFinding attached report:\n\nID: ${report.id}\nCategory: ${report.category}\nLocation: ${report.area}\nRisk: ${report.risk.toUpperCase()}\nReporter: ${report.reporter}\n\nDescription:\n${report.description}`);
    window.location.href = `mailto:${emails.join(',')}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="animate-in slide-in-from-right duration-300 pb-10">
      <button onClick={onBack} className="mb-6 flex items-center gap-2 text-blue-700 font-black hover:underline no-print">
        <ArrowLeft size={18} /> {t.back}
      </button>

      <div className="bg-white border-[1px] border-black shadow-xl max-w-4xl mx-auto p-0" id="printable-area">
        {/* Encabezado Oficial */}
        <div className="grid grid-cols-6 border-b-[1px] border-black">
          <div className="col-span-1 p-2 border-r-[1px] border-black flex items-center justify-center bg-slate-50 font-black text-[10px] text-center italic">
            {t.appTitle}
          </div>
          <div className="col-span-3 p-2 border-r-[1px] border-black text-center flex flex-col justify-center">
            <h2 className="text-[10px] font-bold uppercase">{t.docManagement}</h2>
            <h1 className="text-[11px] font-black uppercase leading-tight">{t.racsTitle}</h1>
            <p className="text-[9px] font-bold text-slate-600 uppercase">{t.racsArea}</p>
          </div>
          <div className="col-span-2 text-[9px] font-bold divide-y-[1px] divide-black">
            <div className="p-1 uppercase">{t.code}: HGP-SGIII-SST-FR-018</div>
            <div className="p-1 uppercase">{t.date}: 10/01/2026</div>
            <div className="p-1 uppercase">{t.rev}. 00 / {t.page} 1 de 1</div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4 text-[11px]">
            <div className="border border-black p-2 bg-slate-50">
              <span className="block font-black border-b border-black mb-1 uppercase">{t.reporterData}</span>
              <p><span className="font-bold">{t.name}:</span> {report.reporter}</p>
              <p><span className="font-bold">{t.location}:</span> {report.area}</p>
              <p><span className="font-bold">{t.date}:</span> {report.date}</p>
            </div>
            <div className="border border-black p-2 bg-slate-50">
              <span className="block font-black border-b border-black mb-1 uppercase">{t.classification}</span>
              <div className="grid grid-cols-2 gap-2 mt-2 font-bold text-[10px]">
                <div className="flex items-center gap-1">
                  <div className={`w-3 h-3 border border-black ${report.category === 'SST' ? 'bg-black' : ''}`}></div> {t.sst}
                </div>
                <div className="flex items-center gap-1">
                  <div className={`w-3 h-3 border border-black ${report.category === 'MA' ? 'bg-black' : ''}`}></div> {t.ma}
                </div>
                <div className="flex items-center gap-1">
                  <div className={`w-3 h-3 border border-black ${report.type === 'acto' ? 'bg-black' : ''}`}></div> {t.acto}
                </div>
                <div className="flex items-center gap-1">
                  <div className={`w-3 h-3 border border-black ${report.type === 'condicion' ? 'bg-black' : ''}`}></div> {t.condicion}
                </div>
              </div>
            </div>
          </div>

          <div className="border border-black p-2">
            <span className="block font-black text-[10px] uppercase bg-slate-100 p-1 mb-2 border-b border-black">{t.riskLevel}</span>
            <div className="grid grid-cols-3 gap-2 text-center text-[9px] font-bold mb-3">
              <div className={`p-1 border ${report.risk === 'bajo' ? 'bg-emerald-500 text-white border-emerald-600' : 'border-slate-300'}`}>{t.riskBajo}</div>
              <div className={`p-1 border ${report.risk === 'medio' ? 'bg-amber-500 text-white border-amber-600' : 'border-slate-300'}`}>{t.riskMedio}</div>
              <div className={`p-1 border ${report.risk === 'alto' ? 'bg-red-600 text-white border-red-700' : 'border-slate-300'}`}>{t.riskAlto}</div>
            </div>
            <div className="text-[9px] space-y-1 italic leading-tight text-slate-600 px-2">
              <p><strong>{t.riskLegends[report.risk].title}:</strong></p>
              <p>{t.riskLegends[report.risk].sst}</p>
              <p>{t.riskLegends[report.risk].ma}</p>
            </div>
          </div>

          <div className="border border-black p-3 min-h-[100px]">
            <span className="block font-black text-[10px] uppercase mb-1 border-b border-slate-100">{t.eventDesc}:</span>
            <p className="text-xs text-slate-700">{report.description}</p>
          </div>

          <div className="border border-black p-3 min-h-[80px]">
            <span className="block font-black text-[10px] uppercase mb-1 border-b border-slate-100">{t.immediateAction}:</span>
            <p className="text-xs">{report.action || '---'}</p>
          </div>

          <div className="grid grid-cols-2 gap-10 pt-16 pb-4 text-[10px] font-bold text-center">
            <div className="border-t border-black pt-1 uppercase">{t.signatureReporter}</div>
            <div className="border-t border-black pt-1 uppercase">{t.signatureSSOMA}</div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row gap-4 no-print max-w-4xl mx-auto">
        <button 
          onClick={generatePDF}
          className="flex-1 flex items-center justify-center gap-2 bg-slate-800 text-white py-4 rounded-lg font-black hover:bg-black transition-all shadow-xl"
        >
          <Download size={20} /> {t.downloadPDF}
        </button>
        <button 
          onClick={sendEmails}
          className="flex-1 flex items-center justify-center gap-2 bg-blue-700 text-white py-4 rounded-lg font-black hover:bg-blue-800 transition-all shadow-xl shadow-blue-600/20"
        >
          <Mail size={20} /> {t.notifySSOMA}
        </button>
      </div>
    </div>
  );
}

// --- VISTA: FORMULARIO (LIBRE) ---
function ReportForm({ onSubmit, t }) {
  const [formData, setFormData] = useState({
    category: 'SST',
    type: 'acto',
    risk: 'medio',
    area: '',
    description: '',
    reporter: '',
    action: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReport = {
      ...formData,
      id: `HGP-RACS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'pendiente'
    };
    onSubmit(newReport);
  };

  return (
    <div className="max-w-2xl mx-auto animate-in slide-in-from-bottom duration-500">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        <div className="bg-[#003366] px-8 py-6 text-white text-center">
          <h2 className="text-2xl font-black italic uppercase tracking-wider">{t.formTitle}</h2>
          <p className="text-blue-300 text-[10px] font-bold uppercase tracking-[0.3em]">{t.formSub}</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{t.system}</label>
              <div className="flex bg-slate-100 p-1 rounded-xl">
                <button type="button" onClick={() => setFormData({...formData, category: 'SST'})} className={`flex-1 py-2 text-[10px] font-black rounded-lg transition-all ${formData.category === 'SST' ? 'bg-white text-[#003366] shadow-sm' : 'text-slate-400'}`}>{t.sst}</button>
                <button type="button" onClick={() => setFormData({...formData, category: 'MA'})} className={`flex-1 py-2 text-[10px] font-black rounded-lg transition-all ${formData.category === 'MA' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-400'}`}>{t.ma}</button>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{t.nature}</label>
              <div className="flex bg-slate-100 p-1 rounded-xl">
                <button type="button" onClick={() => setFormData({...formData, type: 'acto'})} className={`flex-1 py-2 text-[10px] font-black rounded-lg transition-all ${formData.type === 'acto' ? 'bg-white text-[#003366] shadow-sm' : 'text-slate-400'}`}>{t.acto}</button>
                <button type="button" onClick={() => setFormData({...formData, type: 'condicion'})} className={`flex-1 py-2 text-[10px] font-black rounded-lg transition-all ${formData.type === 'condicion' ? 'bg-white text-[#003366] shadow-sm' : 'text-slate-400'}`}>{t.condicion}</button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField label={t.location} icon={<MapPin size={16}/>} placeholder={t.placeholderArea} value={formData.area} onChange={v => setFormData({...formData, area: v})} t={t} />
            <InputField label={t.name} icon={<User size={16}/>} placeholder={t.placeholderName} value={formData.reporter} onChange={v => setFormData({...formData, reporter: v})} t={t} />
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{t.riskLevel}</label>
            <div className="grid grid-cols-3 gap-2">
              <button key="bajo" type="button" onClick={() => setFormData({...formData, risk: 'bajo'})} className={`
                py-3 text-[10px] font-black uppercase rounded-xl border-2 transition-all
                ${formData.risk === 'bajo' ? 'border-emerald-500 bg-emerald-500 text-white shadow-lg shadow-emerald-200' : 'border-slate-100 text-slate-400 bg-slate-50 hover:bg-slate-100'}
              `}>{t.riskBajo}</button>
              <button key="medio" type="button" onClick={() => setFormData({...formData, risk: 'medio'})} className={`
                py-3 text-[10px] font-black uppercase rounded-xl border-2 transition-all
                ${formData.risk === 'medio' ? 'border-amber-500 bg-amber-500 text-white shadow-lg shadow-amber-200' : 'border-slate-100 text-slate-400 bg-slate-50 hover:bg-slate-100'}
              `}>{t.riskMedio}</button>
              <button key="alto" type="button" onClick={() => setFormData({...formData, risk: 'alto'})} className={`
                py-3 text-[10px] font-black uppercase rounded-xl border-2 transition-all
                ${formData.risk === 'alto' ? 'border-red-600 bg-red-600 text-white shadow-lg shadow-red-200' : 'border-slate-100 text-slate-400 bg-slate-50 hover:bg-slate-100'}
              `}>{t.riskAlto}</button>
            </div>
            
            {/* LEYENDA DINÁMICA EN EL FORMULARIO */}
            <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center gap-2 text-blue-800">
                <Info size={18} />
                <span className="text-[11px] font-black uppercase tracking-tight">{t.riskLegends[formData.risk].title}</span>
              </div>
              <p className="text-[10px] text-blue-700 font-bold leading-tight uppercase opacity-80 italic">{t.riskRef}</p>
              <p className="text-[10px] text-blue-900 leading-snug font-medium">{t.riskLegends[formData.risk].sst}</p>
              <p className="text-[10px] text-blue-900 leading-snug font-medium">{t.riskLegends[formData.risk].ma}</p>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{t.eventDesc}</label>
            <textarea 
              required
              rows="4"
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-sm font-medium resize-none"
              placeholder={t.placeholderDesc}
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{t.immediateAction} ({t.ma.toLowerCase() === 'environment' ? 'Optional' : 'Opcional'})</label>
            <textarea 
              rows="2"
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-sm font-medium resize-none"
              placeholder={t.placeholderAction}
              value={formData.action}
              onChange={e => setFormData({...formData, action: e.target.value})}
            />
          </div>

          <button type="submit" className="w-full bg-[#003366] text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-blue-900/20 active:scale-[0.98]">
            {t.generateReport}
          </button>
        </form>
      </div>
    </div>
  );
}

// --- COMPONENTES AUXILIARES ---
function StatBox({ label, value, icon, highlight }) {
  return (
    <div className={`bg-white p-4 rounded-xl border-b-4 ${highlight ? 'border-red-600' : 'border-blue-800'} shadow-sm border-x border-t border-slate-200`}>
      <div className="flex justify-between items-center mb-2">
        <div className="bg-slate-50 p-2 rounded-lg">{icon}</div>
        <span className="text-2xl font-black text-slate-800">{value}</span>
      </div>
      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">{label}</p>
    </div>
  );
}

function InputField({ label, icon, placeholder, value, onChange, t }) {
  return (
    <div className="space-y-1">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600">{icon}</div>
        <input 
          required
          type="text"
          className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-sm font-medium"
          placeholder={placeholder}
          value={value}
          onChange={e => onChange(e.target.value)}
        />
      </div>
    </div>
  );
}