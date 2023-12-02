import ResetPasswordForm from "@/components/Forms/ResetPassword";

export default function Page() {
	return (
		<>
			<h1 className="h-title">Reset Password</h1>
			<p className="h-description">Please enter information below to send confirmation email</p>
			<ResetPasswordForm />
		</>
	);
}
