import LoginForm from "@/components/Forms/Login";
import { Button } from "@nextui-org/button";
import {FaGoogle} from "react-icons/fa6";
import Link from "next/link";

export default function Page() {
	return (
		<>
			<h1 className="h-title">Authentication</h1>
            <p className="h-description">Please enter your credentials</p>
			<LoginForm />
            <p className="text-right w-[300px]"><Link href={"/password-reset"} className="hover:text-primary-500 hover:underline">Forgot Password?</Link></p>
            <p className="text-center">OR</p>
            {/* <Button color="success" variant="ghost" type="button" size="lg"
                className="w-[300px] font-bold"
                startContent={<span className={'inline-flex align-middle justify-center text-2xl pointer-events-none flex-shrink-0 w-[2rem]'}><FaGoogle /></span>}>
                Google Sign In
            </Button> */}
            <p className="text-center">Don&apos;t have an account? <br/> 
            <Link href={"/auth/register"} className="text-primary-500 hover:underline">Go to Registration</Link>
        </p>
		</>
	);
}
