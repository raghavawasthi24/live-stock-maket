import * as dotenv from "dotenv";
dotenv.config();

import * as express from "express";
import { Application, Request, Response } from "express";
import * as cors from "cors";
import * as http from "http";
import { Server } from "socket.io";

const PORT = process.env.PORT || 5001;
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(`/${process.env.VERSION}`, require("./routes/index"));

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Hello, Welcome To This Page",
  });
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: `${process.env.FRONTEND_URL}`,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  let intervalId: NodeJS.Timeout;

  intervalId = setInterval(async () => {
    io.emit("response");
  }, 15000);

  socket.on("disconnect", () => {
    if (intervalId) clearInterval(intervalId);
  });
});

server.listen(PORT, () => {
  console.log(
    `--------------- Server is live at PORT: ${PORT} ---------------`
  );
});
