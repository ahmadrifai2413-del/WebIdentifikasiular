import {createContext,useContext,useEffect,useRef,useState,type ReactNode} from 'react';
export type Account={id:string;name:string;email:string};
type Credentials={name?:string;email:string;password:string};
const Context=createContext<{user:Account|null;loading:boolean;error:string;refresh:()=>Promise<void>;authenticate:(mode:'login'|'register',data:Credentials)=>Promise<void>;logout:()=>Promise<void>}|null>(null);
async function request(path:string,body:unknown){
 const r=await fetch('/api/v1/auth/'+path,{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json','X-Serpenta-Request':'1'},body:JSON.stringify(body)});
 if(r.status===204)return null;
 let d:any=null;
 try{d=await r.json();}catch{}
 if(!r.ok)throw Error(typeof d?.detail==='string'?d.detail:r.status>=500?'Terjadi kesalahan pada server backend. Silakan coba beberapa saat lagi.':'Periksa kembali nama, email, dan password kamu.');
 return d;
}
export function AuthProvider({children}:{children:ReactNode}){
 const [user,setUser]=useState<Account|null>(null),[loading,setLoading]=useState(true),[error,setError]=useState('');
 const generation=useRef(0);
 async function refresh(){const gen=++generation.current;setLoading(true);setError('');try{
  const r=await fetch('/api/v1/auth/me',{credentials:'same-origin',cache:'no-store'});
  if(r.status===401){if(gen===generation.current)setUser(null);return;}
  if(!r.ok)throw Error('Sesi belum bisa diperiksa. Pastikan backend menyala dan migrasi akun sudah dijalankan.');
  let data:any=null;
  try{data=await r.json();}catch{}
  if(gen===generation.current)setUser(data);
 }catch(e){if(gen===generation.current)setError(e instanceof Error?e.message:'Koneksi gagal.');}finally{if(gen===generation.current)setLoading(false);}}
 useEffect(()=>{void refresh();const expired=()=>{generation.current++;setUser(null);setLoading(false);};window.addEventListener('serpenta:expired',expired);return()=>window.removeEventListener('serpenta:expired',expired);},[]);
 async function authenticate(mode:'login'|'register',data:Credentials){const result=await request(mode,data);generation.current++;setUser(result);setLoading(false);setError('');}
 async function logout(){await request('logout',{});generation.current++;setUser(null);setLoading(false);location.hash='login';}
 return <Context.Provider value={{user,loading,error,refresh,authenticate,logout}}>{children}</Context.Provider>;
}
export function useAuth(){const ctx=useContext(Context);if(!ctx)throw Error('AuthProvider tidak ditemukan');return ctx;}
