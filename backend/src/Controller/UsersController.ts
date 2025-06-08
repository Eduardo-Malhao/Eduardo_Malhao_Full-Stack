import { Request, Response } from 'express';
import Service from '../Service/UsersService';
import mapStatusHTTP from '../Utils/mapStatusHTTP';
import UserDto from './DTO/UserDto';

export default class UsersControllers {
    private service: Service;

    constructor() { this.service = new Service() }

    public async getUser(req: Request, res: Response): Promise<void> {

        const user_id = Number(req.params.id);
        const { status, data } = await this.service.getUser(user_id);

        res.status(mapStatusHTTP(status)).json({ data: data });
        return;
    }

    public async getUsersList(req: Request, res: Response): Promise<void> {

        const page = Number(req.query.page) || 1;
        const per_page = Number(req.query.per_page) || 5;

        const { status, data } = await this.service.getUsersList(page, per_page);

        res.status(mapStatusHTTP(status)).json(data);
        return;
    }

    public async create(req: Request, res: Response): Promise<void> {

        const body = UserDto.BodyToUser(req.body);
        const { status, data } = await this.service.create(body);

        res.status(mapStatusHTTP(status)).json({ data: data });
        return;
    }

    public async update(req: Request, res: Response): Promise<void> {

        const user = req.body;
        const avatar = req.file;
        const user_id = Number(req.params.id);
        const { status, data } = await this.service.update(user, user_id, avatar);

        res.status(mapStatusHTTP(status)).json({ data: data });
        return;
    }

    public async update_password(req: Request, res: Response): Promise<void> {

        const password = req.body;
        const user_id = Number(req.params.id);
        const { status, data } = await this.service.update_password(password, user_id);

        res.status(mapStatusHTTP(status)).json({ data: data });
        return;
    }

    public async delete(req: Request, res: Response): Promise<void> {

        const user_id = Number(req.params.id);
        const { status, data } = await this.service.delete(user_id);

        res.status(mapStatusHTTP(status)).json({ data: data });
        return;
    }
};