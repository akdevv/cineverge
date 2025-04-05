export type User = {
	id: string;
	name?: string | null;
	email: string;
	password?: string | null;
	image?: string | null;
	createdAt: Date;
	updatedAt: Date;

	// Authentication metadata
	lastLoginAt?: Date | null;
	lastLoginIp?: string | null;
	lastLoginUserAgent?: string | null;
};

export type Session = {
	id: string;
	sessionToken: string;
	userId: string;
	expires: Date;
	
	// Login metadata
	userAgent?: string | null;
	ipAddress?: string | null;
	createdAt: Date;
	
	user: User;
};

export type VerificationToken = {
	identifier: string;
	token: string;
	expires: Date;
};
