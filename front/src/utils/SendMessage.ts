import axios from "axios";

const url =
  "https://discord.com/api/webhooks/1139136714456186990/azfF8czT77M-Wk-2uhqIsG-xQwZrg0uzuQdCtQ93ssiROMKxOaOD6e-VxVrW0RS4WWFl";

export const SendMessage = async (text: String) => {
  const embeds = [
    {
      description: "👋🏻 HandTalker 이용자가 전송한 메시지입니다.",
    },
  ];

  const message = {
    username: "HandTalker",
    content: text,
    embeds: embeds,
  };

  axios
    .post(url, message)
    .then((response) => console.log(response))
    .catch((e) => console.log(e));
};
