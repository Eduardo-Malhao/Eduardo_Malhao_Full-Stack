"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserDto {
    static BodyToUser(body) {
        return {
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            password: body.password,
            avatar: body.avatar,
        };
    }
    // public static UserToBody(user: IUser): IResponseUser {
    //     return {
    //         id: user!.id!,
    //         first_name: user.first_name,
    //         last_name: user.last_name,
    //         email: user.email,
    //         avatar: user.avatar ?? undefined
    //     };
    // }
    // public static UserToBody(user: IUser): IResponseUser {
    //     return {
    //         id: user!.id!,
    //         first_name: user.first_name,
    //         last_name: user.last_name,
    //         email: user.email,
    //         avatar: user.avatar_mimetype && user.avatar
    //             ? `data:${user.avatar_mimetype};base64,${user.avatar}`
    //             : user.avatar || undefined
    //     };
    // }
    static UserToBody(user) {
        return {
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            avatar: user.avatar_mimetype && user.avatar
                ? `data:${user.avatar_mimetype};base64,${user.avatar}`
                : user.avatar || undefined
        };
    }
}
exports.default = UserDto;
