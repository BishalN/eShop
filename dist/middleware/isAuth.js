"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthAsAdmin = exports.isAuth = void 0;
const User_1 = require("../entity/User");
const isAuth = ({ context }, next) => {
    if (!context.req.session.userId) {
        throw new Error('not authenticated');
    }
    return next();
};
exports.isAuth = isAuth;
const isAuthAsAdmin = ({ context }, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.User.findOne(context.req.session.userId);
    if (!user || !user.isAdmin) {
        throw new Error('not authenticated as an admin');
    }
    return next();
});
exports.isAuthAsAdmin = isAuthAsAdmin;
//# sourceMappingURL=isAuth.js.map