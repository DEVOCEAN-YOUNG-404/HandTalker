import { FaArrowRightLong } from "react-icons/fa6";
import Input from "./Input";
import { translateState } from "../../utils/recoil/atom";
import { useRecoilState } from "recoil";
import { BsPersonFill } from "react-icons/bs";
import { useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { useEffect } from "react";
import discord from "../../assets/icons/discord.png";
import { BiCopy, BiRevision } from "react-icons/bi";
import Swal from "sweetalert2";

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

const Translate = () => {
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
    // channels2 = channels1.flat(Infinity);
    console.log(channels2);
  }, []);

  const [translate, setTranslate] = useRecoilState(translateState);
  const [loading, setLoading] = useState(true);
  const onClick = () => {
    setTranslate(true);
  };

  const [selectedItem, setSelectedItem] = useState<Channel | null>(null);

  const [text, setText] = useState("안녕하세요");

  useEffect(() => {
    if (selectedItem) {
      console.log(selectedItem.id);
    }
  }, [selectedItem]);

  const SendMessage = () => {
    axios
      .post("https://localhost:3002/api/send_message", {
        message: text,
        CHANNEL_ID: selectedItem?.id,
      })
      .then((response) => console.log(response.data))
      .catch((e) => console.error(e));
  };

  const copyToClipboardHandler = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      Toast.fire({
        icon: "success",
        title: "클립보드에 복사되었습니다!",
      });
    } catch (e) {
      console.error(e);
    }
  };

  const Toast = Swal.mixin({
    toast: true,
    position: "top-right",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  return (
    <div className="w-full h-full flex mt-[-60px] flex-col items-center justify-start md:scale-75 xl:scale-[85%] 2xl:scale-90 3xl:scale-100">
      {loading ? (
        <p className="w-[200px] scale-125 items-end justify-end ml-[629px]">
          loading...
        </p>
      ) : (
        <div className="w-[200px] h-[50px] scale-125 items-end justify-end ml-[629px]">
          <Listbox value={selectedItem} onChange={setSelectedItem}>
            <div className="mt-5">
              <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-green-300 sm:text-sm">
                <span className="block truncate">{selectedItem!.name}</span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <ChevronUpDownIcon
                    className="w-5 h-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {channels2.map((item, itemIdx) => (
                    <Listbox.Option
                      key={itemIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-3 pr-4 ${
                          active
                            ? "bg-green-100 text-green-900"
                            : "text-gray-900"
                        }`
                      }
                      value={item}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {item.name}
                          </span>
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
      )}

      <div className="ml-[-380px] flex flex-row items-center justify-center">
        {translate ? (
          <Input />
        ) : (
          <div className="w-[500px] h-[600px] ml-[120px] mt-[30px] flex flex-col justify-center items-center bg-gray-200 border-none rounded-xl">
            <p className="text-[400px] text-gray-300">
              <BsPersonFill />
            </p>
          </div>
        )}
        <p className="ml-[40px] text-6xl text-gray-200">
          <FaArrowRightLong />
        </p>
        {translate ? (
          <div className="flex flex-col font-main text-4xl text-black p-9 ml-[40px] mt-[30px] w-[500px] h-[600px] bg-white rounded-xl border border-gray-200 shadow-md">
            {text}
            <div className="flex flex-row items-center justify-center h-[50px] mt-[460px]">
              <button
                onClick={() => {
                  copyToClipboardHandler(text);
                }}
                className="text-4xl text-gray-300 mr-[15px] hover:bg-gray-200 hover:bg-opacity-30 rounded-full cursor-pointer"
              >
                <BiCopy />
              </button>
              <button className="text-4xl text-gray-300 mr-[75px] hover:bg-gray-200 hover:bg-opacity-30 rounded-full cursor-pointer">
                <BiRevision />
              </button>
              <button
                onClick={SendMessage}
                className=" flex flex-row justify-center items-center rounded-xl min-w-[300px] w-[300px] h-[50px] bg-[#5865f2] text-white font-main text-xl"
              >
                <img
                  src={discord}
                  alt="discord"
                  className="w-[50px] mr-[5px]"
                />
                디스코드로 전송
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="font-main font-bold text-3xl text-black p-9 ml-[40px] mt-[30px] w-[500px] h-[600px] bg-white rounded-xl border border-gray-200 shadow-md">
              번역을 시작하려면 아래 버튼을 눌러주세요. <br />
              <button
                onClick={onClick}
                className="w-[140px] h-[55px] mt-[30px] rounded-xl font-bold font-main text-xl text-white bg-main-2"
              >
                시작하기
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Translate;
