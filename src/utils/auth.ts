import bcrypt from 'bcrypt';

export const hashPassword = async (password : string):Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

export const comparePassword = async(passwordRequest: string, passwordRegisterHashed: string) => {
    const result:boolean = await bcrypt.compare(passwordRequest, passwordRegisterHashed);
    return result;
}