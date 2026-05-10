import React from 'react';import{cn}from'../../lib/utils';
export function Button({className,...p}:React.ButtonHTMLAttributes<HTMLButtonElement>){return <button className={cn('rounded-2xl px-4 py-2 font-semibold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition disabled:opacity-50',className)} {...p}/>}
