"use client"
import useFetch from '@/hooks/usefetch';
import React, {useEffect} from 'react'
import { Card ,CardContent, CardTitle ,CardHeader,CardFooter } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch';
import {ArrowDownRight, ArrowUpRight,} from 'lucide-react';
import Link from 'next/link';
import {updateDefaultAccount} from '@/actions/accounts';
import {toast} from 'sonner';
const AccountCard = ({account}) => {
const {name,type,balance,id,isDefault} = account;

const{
  loading: updateDefaultLoading,
  fn: updateDefaultFn,
  data: updateAccount,
  error,
} = useFetch(updateDefaultAccount);

const handleDefaultChange = async(event)=>{
  event.preventDefault();
  if(isDefault) {
    toast.warning("Need Atleast 1 default account.");
    return;
  }
  await updateDefaultFn(id);
};

useEffect(()=>{
  if(updateAccount?.success){
    toast.success("Default account updated successfully.");
  }
},[updateAccount,updateDefaultLoading]);

useEffect(()=>{
  if(error){
    toast.error(error.message||"Failed to update default account.");
  }
},[error]);
  return (
    <Card className='hover:shadow-md transition-shadow hover:border-cyan-800 group relative'>
  <Link href={`/account/${id}`}>
  <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
    <CardTitle className='text-md font-medium capitalize'>{name}</CardTitle>
    <Switch checked={isDefault} onClick={handleDefaultChange} disabled={updateDefaultLoading} className ="bg-blue-300" />
  </CardHeader>
  <CardContent>
    <div className='text-2xl font-bold'>${parseFloat(balance).toFixed(2)}</div>
    <p className='text-xs text-muted-foreground capitalize'> 
      {type.charAt(0) + type.slice(1).toLowerCase()} Account
    </p>
  </CardContent>
  <CardFooter className='flex justify-between text-sm text-muted-foreground'>
    <div  className='flex items-center'><ArrowUpRight className='mr-1 h-4 w-4 text-teal-400'/>Income</div>
    <div  className='flex items-center gap'><ArrowDownRight className='mr-1 h-4 w-4 text-orange-500' />Expense</div>
  </CardFooter>
  </Link>
</Card>
  )
}

export default AccountCard