"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.PrductResolver = void 0;
const Product_1 = require("../entity/Product");
const ProductInput_1 = require("../utils/ProductInput");
const type_graphql_1 = require("type-graphql");
const User_1 = require("../entity/User");
const typeorm_1 = require("typeorm");
let PrductResolver = class PrductResolver {
    createProduct(options, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne(req.session.userId);
            if (!user || !user.isAdmin) {
                throw new Error('Not authorized as an admin');
            }
            let product;
            try {
                const result = yield typeorm_1.getConnection()
                    .createQueryBuilder()
                    .insert()
                    .into(Product_1.Product)
                    .values({
                    name: options.name,
                    brand: options.brand,
                    category: options.category,
                    image: options.image,
                    countInStock: options.countInStock,
                    price: options.price,
                    creator: user,
                })
                    .returning('*')
                    .execute();
                product = result.raw[0];
            }
            catch (error) {
                console.log(error);
            }
            return product;
        });
    }
};
__decorate([
    type_graphql_1.Mutation(() => Product_1.Product),
    __param(0, type_graphql_1.Arg('options')),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ProductInput_1.ProductInput, Object]),
    __metadata("design:returntype", Promise)
], PrductResolver.prototype, "createProduct", null);
PrductResolver = __decorate([
    type_graphql_1.Resolver()
], PrductResolver);
exports.PrductResolver = PrductResolver;
//# sourceMappingURL=product.js.map