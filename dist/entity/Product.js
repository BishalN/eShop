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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const typeorm_1 = require("typeorm");
const type_graphql_1 = require("type-graphql");
const User_1 = require("./User");
const Review_1 = require("./Review");
let Product = class Product extends typeorm_1.BaseEntity {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.Int),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(() => User_1.User),
    typeorm_1.ManyToOne(() => User_1.User, (user) => user.products),
    __metadata("design:type", User_1.User)
], Product.prototype, "creator", void 0);
__decorate([
    type_graphql_1.Field(() => [Review_1.Review]),
    typeorm_1.OneToMany(() => Review_1.Review, (review) => review.productId, { nullable: true }),
    __metadata("design:type", Array)
], Product.prototype, "reviews", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Product.prototype, "brand", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Product.prototype, "image", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Product.prototype, "category", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "rating", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({ default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "numReviews", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Product.prototype, "countInStock", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Product.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Product.prototype, "updatedAt", void 0);
Product = __decorate([
    typeorm_1.Entity(),
    type_graphql_1.ObjectType()
], Product);
exports.Product = Product;
//# sourceMappingURL=Product.js.map