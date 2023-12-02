import RegisterForm from "@/components/Forms/Register";
import { Button } from "@nextui-org/button";
import {FaGoogle} from "react-icons/fa6";
import Link from "next/link";
export default function Page(){
    return <>
        <h1 className="h-title">Registration</h1>
        <p className="h-description">Please enter your informtaion</p>
        <RegisterForm />
        <p className="text-center">OR</p>
        {/* <Button color="success" variant="ghost" type="button" size="lg"
            className="w-[300px] font-bold"
            startContent={<span className={'inline-flex align-middle justify-center text-2xl pointer-events-none flex-shrink-0 w-[2rem]'}><FaGoogle /></span>}>
            Google Sign Up
        </Button> */}
        <p className="text-center">Already have an account? <br/> 
            <Link href={"/auth/login"} className="text-primary-500 hover:underline">Go to Authentication</Link>
        </p>
    </>
}