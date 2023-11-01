const express = require("express");
const axios = require("axios");
const cors = require("cors");
const https = require("https");
const http = require("http");
const app = express();
const fs = require("fs");
const port = process.env.PORT || 3001;

const { Client, GatewayIntentBits, Guild } = require("discord.js");
// const Discord = require("discord.js");
const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

// // HTTP 서버를 생성합니다. (웹소켓 서버와 함께 사용됩니다.)
// const server = http.createServer((req, res) => {
//   res.writeHead(200, { "Content-Type": "text/plain" });
//   res.end("WebSocket 서버\n");
// });

// // HTTP 서버를 8080 포트로 시작합니다.
// server.listen(8080, () => {
//   console.log("WebSocket 서버가 8080 포트에서 실행 중입니다.");
// });

// // 웹소켓 서버를 HTTP 서버 위에 생성합니다.
// const wss = new WebSocket.Server({ server });

// // 클라이언트가 웹소켓에 연결할 때 실행됩니다.
// wss.on("connection", (ws) => {
//   console.log("클라이언트가 연결되었습니다.");

//   // 클라이언트로부터 메시지를 받을 때 실행됩니다.
//   ws.on("message", (message) => {
//     console.log(`클라이언트로부터 받은 메시지: ${message}`);

//     try {
//       // const jsonData = JSON.parse(message);
//       // // 클라이언트로부터 받은 JSON 데이터를 처리합니다.
//       // console.log(`message: ${jsonData}`);
//     } catch (error) {
//       console.error("JSON 파싱 오류:", error);
//     }
//   });

//   // 클라이언트와 연결이 끊겼을 때 실행됩니다.
//   ws.on("close", () => {
//     console.log("클라이언트와 연결이 끊겼습니다.");
//   });
// });

const options = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem"),
  ca: fs.readFileSync("cert.pem"),
};

app.use(express.json());
app.use(cors());

app.get("/api/discord-channels", async (req, res) => {
  try {
    const response = await axios.get(
      "https://discord.com/api/guilds/1139101314656260207/channels",
      {
        headers: {
          Authorization:
            "Bot MTEzOTA5MTU5MzI4Mjk4MTg4OA.GIV7xe.OQTBr16HyEO6u8ePS4OdXDmccBBAhWFeFQBpew",
        },
      }
    );

    const channelNames = response.data
      .filter((item) => item.type !== 4 && item.type !== 2)
      .map((item) => ({ id: item.id, name: item.name }));

    res.json(channelNames);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data from Discord API: get_channel");
  }
});

app.post("/api/send_message", async (req, res) => {
  const data = {
    // username: "HandTalker",
    content: req.body.message,
    embeds: [
      {
        description: "👋🏻 HandTalker 이용자가 전송한 메시지입니다.",
      },
    ],
  };

  const CHANNEL_ID = req.body.CHANNEL_ID;
  try {
    axios
      .post(`https://discord.com/api/channels/${CHANNEL_ID}/messages`, data, {
        headers: {
          Authorization:
            "Bot MTEzOTA5MTU5MzI4Mjk4MTg4OA.GIV7xe.OQTBr16HyEO6u8ePS4OdXDmccBBAhWFeFQBpew",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Send complete: ", response.data);
        res.status(200).send("Send complete!");
      });
  } catch (e) {
    console.error(e);
    res.status(500).send("Error fetching data from Discord API: send_message");
  }
});

client.on("ready", () => {
  console.log("client ready");
});

client.on("guildCreate", (guild) => {
  console.log("joined new guild");
  console.log(`ID: ${guild.id}`);
});

client.login(
  "MTEzOTA5MTU5MzI4Mjk4MTg4OA.GIV7xe.OQTBr16HyEO6u8ePS4OdXDmccBBAhWFeFQBpew"
);

https.createServer(options, app).listen(3002, () => {
  console.log(`HTTPS server listening at here`);
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
