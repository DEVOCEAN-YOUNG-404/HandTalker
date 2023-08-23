import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useState, useEffect, Fragment } from "react";
import axios from "axios";

interface Channel {
  id: string;
  name: string;
}

let channels2: Channel[] = [
  {
    id: "1",
    name: "1",
  },
];

export const ConfigDiscord = () => {
  const [selectedItem, setSelectedItem] = useState<Channel | null>(null);
  useEffect(() => {
    if (selectedItem) {
      console.log(selectedItem.id);
    }
  }, [selectedItem]);

  useEffect(() => {
    axios
      .get("https://localhost:3002/api/discord-channels")
      .then((response) => {
        console.log(response.data);
        channels2 = response.data;
        setLoading(false);
        setSelectedItem(response.data[0]);
      })
      .catch((e) => console.error(e));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    console.log(channels2);
  }, []);
  const [loading, setLoading] = useState(true);
  return (
    <div className="flex flex-col items-start justify-start w-full h-full">
      <p className="pt-4 pl-3 text-3xl font-bold text-black font-main">
        Discord
      </p>
      <div className="flex flex-col items-start justify-start">
        <p className="pl-3 mt-5 text-xl text-black font-main">채널 설정</p>
      </div>
    </div>
  );
};
