import { PrismaClient } from "@prisma/client";
// import { PrismaClient } from "../generated/prisma";

export const prismaClient = new PrismaClient({

})
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