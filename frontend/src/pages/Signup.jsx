import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import api from '@/lib/api'
import { toast } from 'sonner'

const Signup = () => {
    const [showPassword, setShowPassword]= useState(false)
    const [loading, setLoading]= useState(false)
    const[formData, setFormData]= useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
    })
    const navigate= useNavigate()
    const handleChange= (e)=>{
        const {name, value} =e.target;
        setFormData((prev)=>({
            ...prev,
            [name]:value
        }))
    }
const submitHandler= async(e)=>{
    e.preventDefault()
    console.log(formData);
    try {
        setLoading(true)
        const res= await api.post(`/user/register`,formData,{
            headers:{
                "Content-Type":"application/json"
            }
        })
        if(res.data.success){
            toast.success(res.data.message)
            navigate('/verify')
        }
    } catch (error) {
        toast.error(error.response?.data?.message || error.message || "An error occurred")
        console.log(error);

    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-slate-50 dark:bg-slate-950 flex justify-center items-center font-sans">
      <Card className="w-full max-w-sm rounded-none border border-slate-200 dark:border-slate-800 shadow-none bg-white dark:bg-slate-900 p-2">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-light font-serif tracking-wider uppercase text-slate-900 dark:text-white">Sign Up</CardTitle>
          <CardDescription className="text-xs text-slate-400 font-light">
            Enter your details below to create an account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2 text-left">
                <Label htmlFor="firstName" className="text-xs font-semibold uppercase tracking-wider text-slate-550">First Name</Label>
                <Input 
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="First name"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="rounded-none border-slate-200 focus:border-black"
                />
              </div>
              <div className="grid gap-2 text-left">
                <Label htmlFor="lastName" className="text-xs font-semibold uppercase tracking-wider text-slate-550">Last Name</Label>
                <Input 
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Last name"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="rounded-none border-slate-200 focus:border-black"
                />
              </div>
            </div>

            <div className="grid gap-2 text-left">
              <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-slate-550">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="email@example.com"
                required
                value={formData.email}
                onChange={handleChange}
                className="rounded-none border-slate-200 focus:border-black"
              />
            </div>
            
            <div className="grid gap-2 text-left">
              <Label htmlFor="password" className="text-xs font-semibold uppercase tracking-wider text-slate-555">Password</Label>
              <div className="relative">
                <Input 
                  id="password" 
                  name="password"
                  placeholder="Create your password"
                  type={showPassword ? 'text':'password'}
                  required 
                  value={formData.password}
                  onChange={handleChange}
                  className="rounded-none border-slate-200 pr-10 focus:border-black"
                />
                {showPassword ? (
                  <EyeOff onClick={()=>setShowPassword(false)} className="w-4.5 h-4.5 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"/>
                ) : (
                  <Eye onClick={()=>setShowPassword(true)} className="w-4.5 h-4.5 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"/>
                )}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-3.5 pt-4">
          <Button onClick={submitHandler} className="w-full bg-black hover:bg-neutral-800 text-white rounded-none tracking-widest text-xs uppercase font-bold h-11">
            {loading ? <><Loader2 className="h-4 w-4 animate-spin mr-2"/>Please wait</> : 'Sign Up'}
          </Button>
          <p className="text-xs text-slate-500">
            Already have an account? <Link to={"/login"} className="text-slate-900 dark:text-white font-bold hover:text-slate-550 transition-colors uppercase tracking-wider text-[11px] ml-1">Login</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Signup
