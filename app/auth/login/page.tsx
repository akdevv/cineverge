import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-background p-6">
			<div className="w-full max-w-4xl">
				<LoginForm />
			</div>
		</div>
	);
}
