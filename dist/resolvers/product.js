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
const isAuth_1 = require("../middleware/isAuth");
let PrductResolver = class PrductResolver {
    creator(product) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(product);
            const creator = yield User_1.User.findOne(product.creatorId);
            return creator;
        });
    }
    products() {
        return Product_1.Product.find({});
    }
    product(id) {
        return Product_1.Product.findOne(id);
    }
    createProduct(options, { req }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne(req.session.userId);
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
                    description: options.description,
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
    updateProduct(options, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let updatedProduct;
            try {
                const result = yield typeorm_1.getConnection()
                    .createQueryBuilder()
                    .update(Product_1.Product)
                    .set(Object.assign({}, options))
                    .where('id =:id', {
                    id,
                })
                    .returning('*')
                    .execute();
                updatedProduct = result.raw[0];
            }
            catch (error) {
                throw new Error(error.message);
            }
            return updatedProduct;
        });
    }
};
__decorate([
    type_graphql_1.FieldResolver(() => User_1.User),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PrductResolver.prototype, "creator", null);
__decorate([
    type_graphql_1.Query(() => [Product_1.Product]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PrductResolver.prototype, "products", null);
__decorate([
    type_graphql_1.Query(() => Product_1.Product),
    __param(0, type_graphql_1.Arg('id', () => type_graphql_1.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PrductResolver.prototype, "product", null);
__decorate([
    type_graphql_1.UseMiddleware(isAuth_1.isAuthAsAdmin),
    type_graphql_1.Mutation(() => Product_1.Product),
    __param(0, type_graphql_1.Arg('options')),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ProductInput_1.ProductInput, Object]),
    __metadata("design:returntype", Promise)
], PrductResolver.prototype, "createProduct", null);
__decorate([
    type_graphql_1.UseMiddleware(isAuth_1.isAuthAsAdmin),
    type_graphql_1.Mutation(() => Product_1.Product),
    __param(0, type_graphql_1.Arg('options')),
    __param(1, type_graphql_1.Arg('id', () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ProductInput_1.ProductInput, Number]),
    __metadata("design:returntype", Promise)
], PrductResolver.prototype, "updateProduct", null);
PrductResolver = __decorate([
    type_graphql_1.Resolver(Product_1.Product)
], PrductResolver);
exports.PrductResolver = PrductResolver;
//# sourceMappingURL=product.js.map