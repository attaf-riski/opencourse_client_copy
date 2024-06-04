interface AuthAttributes {
    id: number;
    full_name?: string | null;
    email?: string | null;
    role?: string | null;
    token?: string | null;
}

export default AuthAttributes;