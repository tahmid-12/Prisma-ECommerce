// import { User } from "../generated/prisma";
import { User } from "@prisma/client";
import express from "express";

declare global {
  namespace Express {
    interface Request {
      user?: Record<string,any>
    }
  }
}