import { Request, Response, NextFunction } from 'express';

export default class LoginFields_Validation {

  public static validateFields(req: Request, res: Response, next: NextFunction): void {
    const fields = req.body;

    if (!fields.email || !fields.password) {
      res.status(400).json({ message: 'All fields must be filled' });
      return;
    }

		next();
	}
}