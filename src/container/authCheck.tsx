"use client"
import { getCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const AuthCheck = () => {
    const router = useRouter();
    useEffect(() => {
        const token = getCookie('tokenkey');
        if (!token) {
            router.replace('/login');
        }
    }, [])
    return (
        <></>
    )
}

export default AuthCheck

export const AuthAdminCheck=()=>{
    const router = useRouter();
    useEffect(() => {
        const token = getCookie('tokenkey');
        if (!token) {
            router.replace('/login');
        }
        else if(token){
            router.replace('/admin/dashboard');

        }
    }, [])
    return (
        <></>
    )
}