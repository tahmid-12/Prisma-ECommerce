"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaClient = void 0;
const client_1 = require("@prisma/client");
// import { PrismaClient } from "../generated/prisma";
exports.prismaClient = new client_1.PrismaClient({});
// .$extends({
//     query: {
//         user:{
//             create({ args, query}){
//                 args.data = SingUpSchema.parse(args.data);
//                 return query(args);
//             }
//         }
//     }
// });
