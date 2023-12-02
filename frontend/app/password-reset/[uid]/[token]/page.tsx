import ResetPasswordConfirmForm from "@/components/Forms/ResetPasswordConfirm";
export default function Page() {
	return (
		<>			
			<h1 className="h-title">Reset Password Confirmation</h1>
			<p className="h-description">Please enter information below to change your password</p>
			<ResetPasswordConfirmForm />
		</>
	);
}
