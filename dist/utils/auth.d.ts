export declare const hashPassword: (password: string) => Promise<string>;
export declare const comparePassword: (passwordRequest: string, passwordRegisterHashed: string) => Promise<boolean>;
