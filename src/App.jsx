import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInAnonymously, 
  signInWithCustomToken, 
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  onSnapshot 
} from 'firebase/firestore';
import { 
  AlertTriangle, ClipboardList, MapPin, User, Activity, 
  Plus, BarChart3, X, Mail, Download, ArrowLeft, ShieldCheck, 
  Leaf, Info, Lock, LogOut, ChevronRight, Globe 
} from 'lucide-react';

// --- CONFIGURACIÓN DE FIREBASE ---
// El sistema detectará automáticamente si estás en el entorno de vista previa o en tu laptop.
// Si estás en tu laptop, asegúrate de reemplazar los valores de abajo con los de tu consola de Firebase.
const firebaseConfig = typeof __firebase_config !== 'undefined' 
  ? JSON.parse(__firebase_config) 
  : {
      apiKey: "AIzaSyD_9TOuzhsE4lVYx1NlmbpvucHtl8EbVAI",
  authDomain: "app-reporte-ssoma-hgp.firebaseapp.com",
  projectId: "app-reporte-ssoma-hgp",
  storageBucket: "app-reporte-ssoma-hgp.firebasestorage.app",
  messagingSenderId: "973942937347",
  appId: "1:973942937347:web:cfd80eeebfaf3e7797fb36"
    };

// Inicialización de Firebase con validación básica para evitar errores de ejecución
let app, auth, db;
try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
} catch (error) {
  console.error("Error al inicializar Firebase:", error);
}

const appId = typeof __app_id !== 'undefined' ? __app_id : 'hydroglobal-peru-racs';

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
        sst: "SST: Condición o acto subestándar que podría generar lesión con incapacidad permanente o muerte.",
        ma: "MA: Daños irreversibles al ambiente."
      },
      medio: {
        title: "NIVEL DE RIESGO MEDIO",
        sst: "SST: Podría generar lesiones con incapacidad temporal.",
        ma: "MA: Daños reversibles al ambiente aplicando controles."
      },
      bajo: {
        title: "NIVEL DE RIESGO BAJO",
        sst: "SST: Podría generar lesiones sin discapacidad (cortes menores).",
        ma: "MA: Daños potenciales reversibles en forma inmediata."
      }
    }
  },
  en: {
    appTitle: "HYDROGLOBAL PERU",
    appSub: "Safety, Health and Environment",
    adminAccess: "Admin Access",
    dashboard: "Dashboard",
    logout: "Logout",
    loginTitle: "RACS SYSTEM",
    loginSub: "SSOMA Access Only",
    user: "User",
    pass: "Password",
    loginBtn: "LOGIN",
    backToForm: "Back",
    loginError: "Error",
    adminDashboard: "Admin Dashboard",
    activeSession: "Active: SSOMA",
    totalReports: "Total",
    criticalRisk: "High Risk",
    safetySST: "SST Safety",
    envMA: "Environment",
    reportList: "Findings",
    back: "BACK",
    docManagement: "Management Doc",
    racsTitle: "RACS REPORT",
    racsArea: "SSOMA AREA",
    code: "CODE",
    date: "DATE",
    rev: "REV",
    page: "PAGE",
    reporterData: "Reporter Data",
    name: "Name",
    location: "Location",
    classification: "Classification",
    sst: "SST",
    ma: "ENV",
    acto: "ACT",
    condicion: "COND",
    riskLevel: "Risk Level",
    eventDesc: "Description",
    immediateAction: "Action",
    signatureReporter: "Signature",
    signatureSSOMA: "Appr. SSOMA",
    downloadPDF: "DOWNLOAD PDF",
    notifySSOMA: "NOTIFY",
    formTitle: "RACS REPORT",
    formSub: "Hydroglobal Peru S.A.C.",
    system: "System",
    nature: "Nature",
    placeholderArea: "Location",
    placeholderName: "Full Name",
    placeholderDesc: "Details...",
    placeholderAction: "Immediate action...",
    generateReport: "CONTINUE",
    riskAlto: "HIGH",
    riskMedio: "MEDIUM",
    riskBajo: "LOW",
    riskRef: "FR-018 Ref:",
    riskLegends: {
      alto: { title: "HIGH RISK", sst: "Permanent injury or death risk.", ma: "Irreversible damage." },
      medio: { title: "MEDIUM RISK", sst: "Temporary disability risk.", ma: "Reversible with controls." },
      bajo: { title: "LOW RISK", sst: "Minor injury risk.", ma: "Immediate reversible damage." }
    }
  },
  zh: {
    appTitle: "HYDROGLOBAL 秘鲁",
    appSub: "安全、健康与环境",
    adminAccess: "管理员登录",
    dashboard: "仪表板",
    logout: "登出",
    loginTitle: "RACS 系统",
    loginSub: "SSOMA 专用",
    user: "用户",
    pass: "密码",
    loginBtn: "登录",
    backToForm: "返回",
    loginError: "错误",
    adminDashboard: "管理面板",
    activeSession: "状态：SSOMA",
    totalReports: "报告总数",
    criticalRisk: "高风险",
    safetySST: "SST 安全",
    envMA: "环境",
    reportList: "列表",
    back: "返回",
    docManagement: "管理文件",
    racsTitle: "RACS 报告",
    racsArea: "SSOMA 部门",
    code: "代码",
    date: "日期",
    rev: "版本",
    page: "页码",
    reporterData: "报告人资料",
    name: "姓名",
    location: "地点",
    classification: "分类",
    sst: "SST",
    ma: "环境",
    acto: "行为",
    condicion: "状况",
    riskLevel: "风险等级",
    eventDesc: "事件描述",
    immediateAction: "立即措施",
    signatureReporter: "签名",
    signatureSSOMA: "SSOMA 审批",
    downloadPDF: "下载 PDF",
    notifySSOMA: "通知",
    formTitle: "RACS 报告",
    formSub: "Hydroglobal Peru S.A.C.",
    system: "系统",
    nature: "性质",
    placeholderArea: "地点",
    placeholderName: "全名",
    placeholderDesc: "详细信息...",
    placeholderAction: "采取了什么措施？",
    generateReport: "继续",
    riskAlto: "高",
    riskMedio: "中",
    riskBajo: "低",
    riskRef: "FR-018 参考：",
    riskLegends: {
      alto: { title: "高风险", sst: "永久性伤害或死亡风险。", ma: "不可逆转的损害。" },
      medio: { title: "中风险", sst: "暂时性残疾风险。", ma: "可通过控制修复。" },
      bajo: { title: "低风险", sst: "轻微伤害风险。", ma: "可立即修复。" }
    }
  }
};

export default function App() {
  const [lang, setLang] = useState('es');
  const [currentView, setCurrentView] = useState('form'); 
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userAuth, setUserAuth] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [configError, setConfigError] = useState(null);

  const t = translations[lang];

  useEffect(() => {
    const initAuth = async () => {
      // Si la API Key no es válida o es de ejemplo, mostramos error amigable
      if (!firebaseConfig.apiKey || firebaseConfig.apiKey.includes("TU_API_KEY") || firebaseConfig.apiKey.includes("REEMPLAZAR")) {
        setConfigError("Firebase no está configurado. Por favor, ingresa tus credenciales reales en SafetyApp.jsx.");
        setLoading(false);
        return;
      }

      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      } catch (err) {
        console.error("Auth Error", err);
        setConfigError("Error de autenticación: " + err.message);
      }
    };
    
    initAuth();
    const unsubscribe = onAuthStateChanged(auth, setUserAuth);
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!userAuth || !db) return;
    const reportsRef = collection(db, 'artifacts', appId, 'public', 'data', 'reports');
    const unsubscribe = onSnapshot(reportsRef, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setReports(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      setLoading(false);
    }, (err) => {
      console.error("Firestore Snapshot Error", err);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [userAuth]);

  const handleAddReport = async (newReport) => {
    if (!userAuth || !db) return;
    try {
      const reportsRef = collection(db, 'artifacts', appId, 'public', 'data', 'reports');
      const docData = { ...newReport, createdAt: new Date().toISOString(), userId: userAuth.uid };
      await addDoc(reportsRef, docData);
      setSelectedReport(docData);
      setCurrentView('detail');
    } catch (err) { 
      console.error("Save Error", err);
      alert("Error al guardar el reporte. Verifica tu conexión.");
    }
  };

  if (configError) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 text-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md border border-red-100">
          <AlertTriangle size={48} className="text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-black text-slate-800 mb-2 uppercase tracking-tight">Error de Configuración</h2>
          <p className="text-slate-600 mb-6 font-medium">{configError}</p>
          <div className="bg-slate-50 p-4 rounded-lg text-left text-xs font-mono text-slate-500 overflow-auto border border-slate-200">
            Paso: Ve a tu consola de Firebase &gt; Configuración &gt; Copia tu apiKey e introdúcela en el objeto firebaseConfig de SafetyApp.jsx.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <nav className="bg-[#003366] text-white shadow-xl sticky top-0 z-50 border-b-4 border-blue-400 no-print">
        <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-white p-1 rounded-sm"><ShieldCheck size={28} className="text-[#003366]" /></div>
            <div><h1 className="font-black text-xl italic leading-none">{t.appTitle}</h1><p className="text-[9px] uppercase font-bold text-blue-200 mt-0.5">{t.appSub}</p></div>
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex bg-blue-900/50 p-1 rounded-lg border border-blue-700">
              {['es', 'en', 'zh'].map(l => (
                <button key={l} onClick={() => setLang(l)} className={`px-2 py-1 text-[10px] font-black rounded uppercase transition-colors ${lang === l ? 'bg-blue-500 text-white shadow-sm' : 'text-blue-300 hover:text-white'}`}>{l}</button>
              ))}
            </div>
            {!isAuthenticated ? (
              <button onClick={() => setCurrentView('login')} className="text-[10px] font-black uppercase flex items-center gap-2 bg-blue-800/50 px-3 py-1.5 rounded border border-blue-700 hover:bg-blue-600 transition-colors"><Lock size={14} /> {t.adminAccess}</button>
            ) : (
              <button onClick={logout} className="text-[10px] font-black uppercase bg-red-900/50 px-3 py-1.5 rounded border border-red-700 hover:bg-red-600 transition-colors"><LogOut size={14} /> {t.logout}</button>
            )}
          </div>
        </div>
      </nav>
      <main className="max-w-5xl mx-auto px-4 py-6">
        {loading ? <div className="text-center py-20 animate-pulse font-black text-blue-900 uppercase text-xs tracking-widest flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          {lang === 'es' ? 'Sincronizando Sistema Hydroglobal...' : 'Syncing System...'}
        </div> : (
          <>
            {currentView === 'form' && <ReportForm onSubmit={handleAddReport} t={t} />}
            {currentView === 'login' && <LoginView onLoginSuccess={() => { setIsAuthenticated(true); setCurrentView('dashboard'); }} onCancel={() => setCurrentView('form')} t={t} />}
            {currentView === 'dashboard' && isAuthenticated && <Dashboard reports={reports} onViewDetail={(r) => { setSelectedReport(r); setCurrentView('detail'); }} t={t} />}
            {currentView === 'detail' && <ReportDetail report={selectedReport} onBack={() => setCurrentView(isAuthenticated ? 'dashboard' : 'form')} t={t} />}
          </>
        )}
      </main>
    </div>
  );

  function logout() {
    setIsAuthenticated(false);
    setCurrentView('form');
  }
}

// --- COMPONENTES SECUNDARIOS ---

function ReportForm({ onSubmit, t }) {
  const [formData, setFormData] = useState({ category: 'SST', type: 'acto', risk: 'medio', area: '', description: '', reporter: '', action: '' });
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
      <div className="bg-[#003366] px-8 py-6 text-white text-center">
        <h2 className="text-2xl font-black italic">{t.formTitle}</h2>
        <p className="text-blue-300 text-[10px] font-bold uppercase tracking-[0.3em] mt-1">{t.formSub}</p>
      </div>
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="p-8 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{t.system}</label>
            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button type="button" onClick={() => setFormData({...formData, category: 'SST'})} className={`flex-1 py-2 text-[10px] font-black rounded-lg transition-all ${formData.category==='SST'?'bg-white text-[#003366] shadow-md':'text-slate-400 hover:text-slate-600'}`}>{t.sst}</button>
              <button type="button" onClick={() => setFormData({...formData, category: 'MA'})} className={`flex-1 py-2 text-[10px] font-black rounded-lg transition-all ${formData.category==='MA'?'bg-white text-emerald-700 shadow-md':'text-slate-400 hover:text-slate-600'}`}>{t.ma}</button>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{t.nature}</label>
            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button type="button" onClick={() => setFormData({...formData, type: 'acto'})} className={`flex-1 py-2 text-[10px] font-black rounded-lg transition-all ${formData.type==='acto'?'bg-white text-[#003366] shadow-md':'text-slate-400 hover:text-slate-600'}`}>{t.acto}</button>
              <button type="button" onClick={() => setFormData({...formData, type: 'condicion'})} className={`flex-1 py-2 text-[10px] font-black rounded-lg transition-all ${formData.type==='condicion'?'bg-white text-[#003366] shadow-md':'text-slate-400 hover:text-slate-600'}`}>{t.condicion}</button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InputField label={t.location} placeholder={t.placeholderArea} value={formData.area} onChange={v => setFormData({...formData, area:v})} />
          <InputField label={t.name} placeholder={t.placeholderName} value={formData.reporter} onChange={v => setFormData({...formData, reporter:v})} />
        </div>
        <div className="space-y-3">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{t.riskLevel}</label>
          <div className="grid grid-cols-3 gap-2">
            {['bajo','medio','alto'].map(l => (
              <button key={l} type="button" onClick={()=>setFormData({...formData, risk:l})} className={`py-3 text-[10px] font-black uppercase rounded-xl border-2 transition-all ${formData.risk===l? (l==='bajo'?'border-emerald-500 bg-emerald-500 text-white shadow-lg':l==='medio'?'border-amber-500 bg-amber-500 text-white shadow-lg':'border-red-600 bg-red-600 text-white shadow-lg') : 'border-slate-100 text-slate-400 hover:border-slate-200'}`}>{t['risk'+l.charAt(0).toUpperCase()+l.slice(1)]}</button>
            ))}
          </div>
          <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl animate-in fade-in duration-300">
            <p className="text-[10px] font-black text-blue-800 uppercase flex items-center gap-2 mb-1"><Info size={14}/> {t.riskLegends[formData.risk].title}</p>
            <p className="text-[10px] text-blue-900 leading-snug font-medium italic">{t.riskLegends[formData.risk].sst}</p>
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{t.eventDesc}</label>
          <textarea required rows="4" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-sm font-medium resize-none shadow-inner" placeholder={t.placeholderDesc} value={formData.description} onChange={e => setFormData({...formData, description:e.target.value})} />
        </div>
        <button type="submit" className="w-full bg-[#003366] text-white py-4 rounded-xl font-black uppercase shadow-xl hover:bg-black transition-all active:scale-[0.98] tracking-widest">{t.generateReport}</button>
      </form>
    </div>
  );
}

function LoginView({ onLoginSuccess, onCancel, t }) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState(false);
  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-2xl border border-slate-200 p-8 space-y-6 animate-in zoom-in duration-300">
      <div className="text-center"><Lock className="mx-auto text-blue-900 mb-2" size={40} /><h2 className="text-xl font-black italic uppercase tracking-wider">{t.loginTitle}</h2></div>
      <form onSubmit={(e) => { e.preventDefault(); if(user==='admin' && pass==='hydro2026') onLoginSuccess(); else { setError(true); setTimeout(()=>setError(false),2000); } }} className="space-y-4">
        <div><label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{t.user}</label><input type="text" className="w-full p-3 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-blue-600" value={user} onChange={e=>setUser(e.target.value)} /></div>
        <div><label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{t.pass}</label><input type="password" className="w-full p-3 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-blue-600" value={pass} onChange={e=>setPass(e.target.value)} /></div>
        {error && <p className="text-red-600 text-[10px] font-bold text-center uppercase animate-pulse tracking-tighter">{t.loginError}</p>}
        <button type="submit" className="w-full bg-[#003366] text-white py-4 rounded-xl font-black uppercase shadow-lg hover:bg-blue-900 transition-all">{t.loginBtn}</button>
        <button type="button" onClick={onCancel} className="w-full text-slate-400 text-[10px] font-black uppercase hover:text-slate-600 transition-colors mt-2">{t.backToForm}</button>
      </form>
    </div>
  );
}

function Dashboard({ reports, onViewDetail, t }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <h2 className="text-2xl font-extrabold text-[#003366] flex items-center gap-2"><Activity size={24}/> {t.adminDashboard}</h2>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="divide-y divide-slate-100">
          {reports.length === 0 ? (
            <div className="p-12 text-center text-slate-400 font-bold uppercase tracking-widest text-xs italic">
              No se encontraron registros en la nube
            </div>
          ) : reports.map(r => (
            <div key={r.id} onClick={()=>onViewDetail(r)} className="p-4 hover:bg-blue-50 cursor-pointer flex justify-between items-center transition-colors group">
              <div className="flex-1 pr-4">
                <div className="flex gap-2 mb-1.5 flex-wrap">
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded shadow-sm border ${r.risk==='alto'?'bg-red-600 text-white border-red-700':'bg-slate-200 text-slate-600 border-slate-300'}`}>{r.risk.toUpperCase()}</span>
                  <span className="text-[9px] font-black text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-100 uppercase">{r.category}</span>
                </div>
                <h4 className="font-bold text-slate-800 text-sm group-hover:text-blue-700 transition-colors line-clamp-1 uppercase tracking-tight">{r.description}</h4>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter mt-1">{r.area} • {r.reporter}</p>
              </div>
              <ChevronRight className="text-slate-300 group-hover:text-blue-600 transition-all group-hover:translate-x-1" size={20} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ReportDetail({ report, onBack, t }) {
  const emails = ["fransvargas@hydroglobal.hk", "saludocupacional@hydroglobal.hk"];
  
  const handleNotify = () => {
    const subject = encodeURIComponent(`REPORTE RACS - ${report.id} - ${report.area}`);
    const body = encodeURIComponent(`Detalle del Reporte:\nID: ${report.id}\nÁrea: ${report.area}\nReportado por: ${report.reporter}\nNivel Riesgo: ${report.risk.toUpperCase()}\n\nDescripción:\n${report.description}\n\nAcción Inmediata:\n${report.action || 'No especificada'}`);
    window.location.href = `mailto:${emails.join(',')}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="pb-10 animate-in slide-in-from-right duration-300">
      <button onClick={onBack} className="mb-6 flex items-center gap-2 text-blue-700 font-black hover:underline no-print tracking-widest text-xs uppercase"><ArrowLeft size={16} /> {t.back}</button>
      <div className="bg-white border-[1px] border-black shadow-2xl max-w-4xl mx-auto p-0" id="printable-area">
        {/* Cabecera FR-018 */}
        <div className="grid grid-cols-6 border-b-[1px] border-black">
          <div className="col-span-1 p-2 border-r-[1px] border-black flex items-center justify-center font-black text-[11px] text-center italic bg-slate-50 uppercase tracking-tighter">HYDROGLOBAL PERÚ</div>
          <div className="col-span-3 p-2 border-r-[1px] border-black text-center flex flex-col justify-center bg-white">
            <h2 className="text-[9px] font-bold uppercase tracking-[0.1em]">{t.docManagement}</h2>
            <h1 className="text-[11px] font-black uppercase leading-tight tracking-tight px-2">{t.racsTitle}</h1>
            <p className="text-[8px] font-bold text-slate-600 uppercase mt-0.5">{t.racsArea}</p>
          </div>
          <div className="col-span-2 text-[8px] font-bold divide-y-[1px] divide-black uppercase bg-slate-50">
            <div className="p-1.5 flex justify-between"><span>{t.code}:</span> <span>HGP-SGIII-SST-FR-018</span></div>
            <div className="p-1.5 flex justify-between"><span>{t.date}:</span> <span>10/01/2026</span></div>
            <div className="p-1.5 flex justify-between"><span>{t.rev}.:</span> <span>00 / {t.page} 1/1</span></div>
          </div>
        </div>
        
        <div className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-6 text-[10px]">
            <div className="border border-black p-3 rounded shadow-sm">
              <span className="block font-black border-b border-black mb-2 uppercase tracking-widest text-blue-900">{t.reporterData}</span>
              <p className="mt-1 flex justify-between"><span className="font-bold">{t.name}:</span> <span className="text-right font-medium">{report.reporter}</span></p>
              <p className="flex justify-between"><span className="font-bold">{t.location}:</span> <span className="text-right font-medium">{report.area}</span></p>
              <p className="flex justify-between"><span className="font-bold">{t.date}:</span> <span className="text-right font-medium italic">{report.date || new Date().toISOString().split('T')[0]}</span></p>
            </div>
            <div className="border border-black p-3 rounded shadow-sm">
              <span className="block font-black border-b border-black mb-2 uppercase tracking-widest text-blue-900">{t.classification}</span>
              <div className="grid grid-cols-1 gap-1.5 mt-1 font-bold uppercase">
                <div className="flex items-center gap-2"><div className="w-3 h-3 border border-black bg-black"></div> {report.category}</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 border border-black bg-black"></div> {report.type}</div>
              </div>
            </div>
          </div>
          
          <div className="border border-black p-4 rounded bg-slate-50 shadow-inner">
            <span className="block font-black text-[10px] uppercase mb-2 border-b border-slate-300 pb-1">{t.riskLevel}: <span className="text-red-700">{report.risk.toUpperCase()}</span></span>
            <p className="text-[10px] font-black text-slate-800 uppercase mb-1 tracking-tight">{t.riskLegends[report.risk].title}</p>
            <p className="text-[10px] italic text-slate-600 leading-relaxed font-medium">{t.riskLegends[report.risk].sst}</p>
          </div>
          
          <div className="border border-black p-4 min-h-[140px] text-[10px] rounded shadow-sm bg-white">
            <span className="block font-black uppercase mb-2 border-b border-slate-100 pb-1">{t.eventDesc}:</span>
            <p className="text-slate-700 leading-relaxed whitespace-pre-wrap font-medium">{report.description}</p>
          </div>

          <div className="border border-black p-4 min-h-[100px] text-[10px] rounded shadow-sm bg-white">
            <span className="block font-black uppercase mb-2 border-b border-slate-100 pb-1">{t.immediateAction}:</span>
            <p className="text-slate-700 leading-relaxed font-medium">{report.action || '---'}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-20 pt-16 pb-6 text-[10px] font-bold text-center uppercase">
            <div className="border-t-2 border-slate-300 pt-2 text-slate-700">{t.signatureReporter}</div>
            <div className="border-t-2 border-slate-300 pt-2 text-slate-700">{t.signatureSSOMA}</div>
          </div>
        </div>
      </div>
      
      <div className="mt-10 flex flex-col sm:flex-row gap-4 no-print max-w-4xl mx-auto px-4 sm:px-0">
        <button onClick={() => window.print()} className="flex-1 bg-slate-800 text-white py-4 rounded-xl font-black shadow-2xl hover:bg-black transition-all active:scale-[0.98] uppercase tracking-widest text-xs flex items-center justify-center gap-3">
          <Download size={20} /> {t.downloadPDF}
        </button>
        <button onClick={handleNotify} className="flex-1 bg-blue-700 text-white py-4 rounded-xl font-black shadow-2xl hover:bg-blue-800 transition-all active:scale-[0.98] uppercase tracking-widest text-xs flex items-center justify-center gap-3 border-b-4 border-blue-900">
          <Mail size={20} /> {t.notifySSOMA}
        </button>
      </div>
    </div>
  );
}

function InputField({ label, placeholder, value, onChange }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{label}</label>
      <input 
        required 
        type="text" 
        className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-sm font-bold shadow-inner" 
        placeholder={placeholder} 
        value={value} 
        onChange={e => onChange(e.target.value)} 
      />
    </div>
  );
}