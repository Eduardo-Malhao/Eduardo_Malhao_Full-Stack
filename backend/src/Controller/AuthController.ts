import { Request, Response } from 'express';
import Service from '../Service/AuthService';
import mapStatusHTTP from '../Utils/mapStatusHTTP';
import UserDto from './DTO/UserDto';

export default class AuthControllers {
  private service: Service;

  constructor() { this.service = new Service() }

  public async login(req: Request, res: Response): Promise<void> {

    const user = (req.body);
    const { status, data } = await this.service.login(user);

    res.status(mapStatusHTTP(status)).json({ data:  data });
    return;
  }
}

