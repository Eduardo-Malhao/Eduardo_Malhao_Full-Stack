import * as bcrypt from 'bcryptjs';

export default class PasswordValidation {

    public static validatePassword(bodyPassword: string, dbPassword: string) {
        return bcrypt.compareSync(bodyPassword, dbPassword);
    }
}