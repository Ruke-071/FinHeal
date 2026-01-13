import { ButtonGroup } from "./ui/button-group";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import {Button} from "./ui/button";
import Link from "next/link";
import Image from "next/image";
import {LayoutDashboard, PenBox} from "lucide-react";
import {checkUser} from "@/lib/checkUser";


const Header = async() => {
  await checkUser();
  return (
    
    <div className="fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-#131F30 shadow-md z-50">
      <nav className="container mx-auto px-4 py-0 bg-#131F30 flex justify-between items-center">
        <Link href = "/"><Image src = {"/logo-3.png"} alt="LOgo" width = {100} height={60} className="h-13 w-auto object-fill"/></Link>
      <div>
      <SignedOut>
        <ButtonGroup
          aria-label="Button group"
          orientation="horizontal"
          className="h-fit"
        >
          <SignInButton forceRedirectUrl="/dashboard">
            <Button variant="outline" className="text-white">
              Sign In
            </Button>
          </SignInButton>

          <SignUpButton asChild>
            <Button variant="outline" className="text-white">
              Sign Up
            </Button>
          </SignUpButton>
        </ButtonGroup>
      </SignedOut>
      <div className="flex items-center space-x-4">
      <SignedIn>
        <UserButton appearance={{
          elements: {
            userButtonAvatarBox: "w-11 h-11",
          },
        }}/>
        <Link href={"/dashboard"}>
         <Button variant="outline" className="text-white hover:text-blue-600 flex items-center gap-2">
          <LayoutDashboard size={18}/>
              <span className="hidden md:inline">Dashboard</span>
            </Button>
            </Link>
            <Link href={"/transaction"}>
         <Button variant="outline" className="text-white hover:text-blue-600 flex items-center gap-2">
          <PenBox size={18}/>
              <span className="hidden md:inline"> Add Transaction</span>
            </Button>
            </Link>
      </SignedIn>
      </div>
      </div>
       </nav>
    </div>
  );
};

export default Header;
