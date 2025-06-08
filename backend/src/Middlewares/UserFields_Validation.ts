import { Request, Response, NextFunction } from 'express';

export default class UserFields_Validation {
  public static validateFields(req: Request, res: Response, next: NextFunction): void {
    const fields = req.body;

    if (!fields.email || !fields.password || !fields.first_name || !fields.last_name) {
      res.status(400).json({ message: 'All fields must be filled' });
      return;
    }
  
		next();
	}

    public static validateUpdateFields(req: Request, res: Response, next: NextFunction): void {
    const fields = req.body;

    if (!fields.email || !fields.first_name || !fields.last_name) {
      res.status(400).json({ message: 'All fields must be filled' });
      return;
    }
  
		next();
	}

      public static validateUpdatePasswordFields(req: Request, res: Response, next: NextFunction): void {
    const fields = req.body;

    if (!fields.actual_password || !fields.new_password) {
      res.status(400).json({ message: 'All fields must be filled' });
      return;
    }
  
		next();
	}

  public static validateEmail(req: Request, res: Response, next: NextFunction): void {
    const fields = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		const emailCheck: boolean = emailRegex.test(fields.email)
    if (emailCheck === false) {
			res.status(400).json({ message: 'Invalid email' });
      return;
    }

    next();
  }
};