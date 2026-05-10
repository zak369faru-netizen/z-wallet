const API_BASE = import.meta.env.VITE_API_BASE || 'https://api-wallet.zak369.com';
let csrfToken = localStorage.getItem('csrf') || '';
async function request<T>(path:string, init:RequestInit={}){
  const res = await fetch(`${API_BASE}${path}`, { ...init, credentials:'include', headers:{ 'Content-Type':'application/json', ...(csrfToken?{'X-CSRF-Token':csrfToken}:{}), ...(init.headers||{}) }});
  const data = await res.json().catch(()=>null);
  if(!res.ok || data?.ok===false) throw new Error(data?.error?.message || 'Request failed');
  if(data?.data?.csrfToken){ csrfToken=data.data.csrfToken; localStorage.setItem('csrf', csrfToken); }
  return data?.data as T;
}
export const api = {
  register:(payload:any)=>request('/api/auth/register',{method:'POST',body:JSON.stringify(payload)}),
  login:(payload:any)=>request<any>('/api/auth/login',{method:'POST',body:JSON.stringify(payload)}),
  logout:()=>request('/api/auth/logout',{method:'POST'}),
  me:()=>request<any>('/api/auth/me'),
  analytics:()=>request<any>('/api/analytics'),
  wallets:()=>request<any[]>('/api/wallets'),
  createWallet:(p:any)=>request('/api/wallets',{method:'POST',body:JSON.stringify(p)}),
  categories:()=>request<any[]>('/api/categories'),
  transactions:(q='')=>request<any[]>(`/api/transactions?q=${encodeURIComponent(q)}`),
  createTransaction:(p:any)=>request('/api/transactions',{method:'POST',body:JSON.stringify(p)}),
  budgets:()=>request<any[]>('/api/budgets'),
  createBudget:(p:any)=>request('/api/budgets',{method:'POST',body:JSON.stringify(p)}),
  goals:()=>request<any[]>('/api/goals'),
  createGoal:(p:any)=>request('/api/goals',{method:'POST',body:JSON.stringify(p)}),
  reportCsv:()=>`${API_BASE}/api/reports/csv`
};
