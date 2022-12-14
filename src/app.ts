import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import * as dotenv from "dotenv";
import { signinRouter } from "./routes/auth/signin";
import { signoutRouter } from "./routes/auth/signout";
import { signupRouter } from "./routes/auth/signup";
import { currentUserRouter } from "./routes/auth/current-user";
import { isLoggedIn } from "./middlewares/is-loggedin";
import { deleteUserRouter } from "./routes/user/delete-user";
import { updateUserRouter } from "./routes/user/update-user";
import { createProductRouter } from "./routes/product/create-product";
import { updateProductRouter } from "./routes/product/update-product";
import { productsRouter } from "./routes/product/read-product";
import { deleteProductRouter } from "./routes/product/delete-product";
import { depositUserRouter } from "./routes/user/deposit";
import { resetUserDepositRouter } from "./routes/user/reset-deposit";
import { buyRouter } from "./routes/user/buy";
dotenv.config();

const app = express();
app.use(json());

app.use(
    cookieSession({
        signed: false,
        secure: false,
    })
);
app.use(signinRouter);
app.use(signupRouter);

app.use(isLoggedIn);

// CRUD User
app.use(currentUserRouter);
app.use(signoutRouter);
app.use(deleteUserRouter);
app.use(updateUserRouter);

// CRUD Product
app.use(createProductRouter);
app.use(updateProductRouter);
app.use(productsRouter);
app.use(deleteProductRouter);

// Buyer deposit
app.use(depositUserRouter);
// Reset deposit
app.use(resetUserDepositRouter);
// Buy
app.use(buyRouter);

app.all("*", async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
