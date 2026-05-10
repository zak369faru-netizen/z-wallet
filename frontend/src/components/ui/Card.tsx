import React from 'react';import{cn}from'../../lib/utils';
export function Card({className,...p}:React.HTMLAttributes<HTMLDivElement>){return <div className={cn('glass rounded-3xl p-5',className)} {...p}/>}
