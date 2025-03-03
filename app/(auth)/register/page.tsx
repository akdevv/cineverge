import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-background p-6">
			<div className="w-full max-w-4xl">
				<RegisterForm />
			</div>
		</div>
	);
}
