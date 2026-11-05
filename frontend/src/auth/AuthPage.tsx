import {useState,type FormEvent} from 'react';
import {ArrowLeft,ArrowRight,Eye,EyeOff,LockKeyhole,Mail,UserRound,LoaderCircle} from 'lucide-react';
import SnakeIcon from '../components/ui/SnakeIcon';
import {useAuth} from './AuthContext';
import rainforestBg from './rainforest.png';
import './auth.css';
export default function AuthPage({mode,returnTo='home'}:{mode:'login'|'register';returnTo?:string}){
 const {authenticate}=useAuth();const [name,setName]=useState(''),[email,setEmail]=useState(''),[password,setPassword]=useState('');
 const [visible,setVisible]=useState(false),[busy,setBusy]=useState(false),[error,setError]=useState('');const register=mode==='register';
 async function submit(e:FormEvent){e.preventDefault();if(busy)return;setBusy(true);setError('');try{await authenticate(mode,{...(register?{name:name.trim()}:{}),email:email.trim(),password});location.hash=['home','history','detector'].includes(returnTo)?returnTo:'home';}catch(e){setError(e instanceof Error?e.message:'Koneksi gagal. Coba lagi.');}finally{setBusy(false);}}
 return <main className="sa-screen" style={{ backgroundImage: `url(${rainforestBg})` }}><a href="#home" className="sa-back"><ArrowLeft size={16}/> Kembali menjelajah</a>
 <section className="sa-glass" aria-labelledby="sa-title">
  <a href="#home" className="sa-brand"><SnakeIcon size={55} strokeWidth={2}/><span>Serpenta<span className="sa-dot">.</span></span></a>
  <div className="sa-heading"><span className="sa-eyebrow">YOUR PERSONAL FIELD JOURNAL</span><h1 id="sa-title">{register?'Buat Akun':'Masuk'}</h1><p>{register?'Awali rasa ingin tahumu. Simpan setiap penemuan.':'Selamat datang kembali. Lanjutkan cerita pengamatanmu.'}</p></div>
  <form onSubmit={submit} className="sa-form">
   {register&&<label className="sa-field"><UserRound/><span className="sa-sr">Nama lengkap</span><input autoComplete="name" placeholder="Nama lengkap" required minLength={2} maxLength={100} value={name} onChange={e=>setName(e.target.value)} disabled={busy}/></label>}
   <label className="sa-field"><Mail/><span className="sa-sr">Email</span><input type="email" autoComplete="email" placeholder="Email kamu" required maxLength={254} value={email} onChange={e=>setEmail(e.target.value)} disabled={busy}/></label>
   <label className="sa-field"><LockKeyhole/><span className="sa-sr">Password</span><input type={visible?'text':'password'} autoComplete={register?'new-password':'current-password'} placeholder="Password" required minLength={register?12:1} maxLength={128} value={password} onChange={e=>setPassword(e.target.value)} disabled={busy}/><button type="button" className="sa-eye" aria-label={visible?'Sembunyikan password':'Tampilkan password'} aria-pressed={visible} onClick={()=>setVisible(!visible)}>{visible?<Eye size={20}/>:<EyeOff size={20}/>}</button></label>
   {register&&<p className="sa-hint">Minimal 12 karakter. Boleh berupa beberapa kata.</p>}
   {error&&<p className="sa-error" role="alert">{error}</p>}
   <button className="sa-submit" disabled={busy} type="submit">{busy?<><LoaderCircle className="sa-spin" size={19}/> Memproses…</>:<>{register?'Buat Akun':'Masuk'}<ArrowRight size={23}/></>}</button>
  </form>
  <div className="sa-divider"><span>{register?'Sudah punya akun?':'Belum punya akun?'}</span></div>
  <a className="sa-switch" aria-disabled={busy} onClick={e=>{if(busy)e.preventDefault();}} href={`#${register?'login':'register'}?next=${encodeURIComponent(returnTo)}`}>{register?'Masuk':'Buat Akun'}</a>
  <p className="sa-foot">OBSERVE. UNDERSTAND. COEXIST.</p>
 </section>
 <div className="sa-landscape-copy" aria-hidden="true"><span>THE SERPENTA FIELD JOURNAL</span><p>Setiap penemuan,<br/><em>punya cerita.</em></p><i>Kenali lebih dekat. Tetap jaga jarak.</i></div>
 </main>;
}
