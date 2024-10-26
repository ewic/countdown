import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { NumbersGame } from "./numbers.ts";
const numbersgame: NumbersGame = new NumbersGame();
numbersgame.startGame();

const router = new Router();
router
  .get("/", (context) => {
    context.response.body = "Hello world!";
  })
  .get("/numbers", (context) => {

    context.response.body = 'Created New Game!';
  })
  ;

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });