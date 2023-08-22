import { useState, useEffect } from 'react'
import { auth } from '../firebase-config/firebase'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { FirebaseError } from '@firebase/util'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

const AuthPage = () => {
  const [authState, setAuthState] = useState<"login" | "signup">("login");  
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const navigate = useNavigate();

  const login = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
        setIsLoading(true);
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        console.log(user);
        toast({
            description: "Logged In!",
        })
        navigate("/");
    } catch(error) {
        if (error instanceof FirebaseError) {
            if(error.code === "auth/user-not-found") {
                console.log(error);
                toast({
                    description: "User with the entered email does not exist!",
                    variant: "destructive"
                })
            }
            else if(error.code === "auth/wrong-password") {
                console.log(error);
                toast({
                    description: "Invalid Credentials!",
                    variant: "destructive"
                })
            }
            else {
                console.log(error);
                toast({
                    description: "Something went wrong! Please try again later!",
                    variant: "destructive"
                })
            }
        }
    } finally {
        setIsLoading(false);
    }
  }

  const register = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
        setIsLoading(true);
        await createUserWithEmailAndPassword(auth, email, password);
        setEmail("");
        setPassword("");
        navigate("/");
        toast({
            description: "Registered Successfully!",
        });
    } catch(error) {
        if (error instanceof FirebaseError) {
            if(error.code === "auth/email-already-in-use") {
                console.log(error);
                toast({
                    description: "User with the entered email already exists!",
                    variant: "destructive"
                })
            }
        }
        else {
            console.log(error);
            toast({
                description: "Something went wrong! Please try again later!",
                variant: "destructive"
            })
        }
    } finally {
        setIsLoading(false);
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if(user) {
            navigate("/")
        }
    })
  });

  return (
    <div className="flex flex-col h-screen items-center dark:bg-black py-20">
        <h1 className="text-3xl mb-5 font-bold dark:text-white">
            {authState === "login" ? "Login" : "Sign Up"}
        </h1>
        <form className='flex flex-col gap-5 dark:text-white w-80'>
            <div>
                <Label htmlFor="email">Email</Label>
                <Input 
                    type="email" 
                    id="email" 
                    required
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                />
            </div>
            
            <div>
                <Label htmlFor="passwd">Password</Label>
                <Input 
                    type="password" 
                    id="passwd" 
                    required
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                />
            </div>

            {authState === "login" ? (
                <Button
                    type='submit'
                    onClick={login}
                    disabled={isLoading}
                >
                    Login
                </Button>
            ) : (
                <Button
                    type='submit'
                    onClick={register}
                    disabled={isLoading}
                >
                    Sign Up
                </Button>
            )}
        </form>
        {authState === "login" ? (
            <p className='text-zinc-400 text-sm mt-2'>
                New to ChatX?
                <Button variant="link" className='-mt-2.5' onClick={() => setAuthState("signup")}>Sign Up here</Button>
            </p>   
        ) : (
            <p className='text-zinc-400 text-sm mt-2'>
                Already a ChatX user?{" "}
                <Button variant="link" className='-mt-2.5' onClick={() => setAuthState("login")}>Login here</Button>
            </p>
        )}
    </div>
  )
}

export default AuthPage