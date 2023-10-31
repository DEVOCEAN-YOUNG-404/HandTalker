import { ModalPortal } from "../../../utils/helpers/ModalPortal";
import { useEffect, useRef, useState, Fragment } from "react";
import axios from "axios";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { ConfigSuccess } from "./ConfigSuccess";
import { useSetRecoilState } from "recoil";
import { dchannel } from "../../../utils/recoil/atom";
import book from "../../../assets/images/plugin/book.webp";
import discord_blue from "../../../assets/images/plugin/discord_blue.webp";
import naver from "../../../assets/images/plugin/naver.webp";
import google from "../../../assets/images/plugin/google.webp";
import kakaotalk from "../../../assets/images/plugin/kakaotalk.webp";
import instagram from "../../../assets/images/plugin/instagram.webp";
import facebook from "../../../assets/images/plugin/facebook.webp";
import twitter from "../../../assets/images/plugin/twitter.webp";
import devocean from "../../../assets/images/plugin/devocean.webp";

export type ModalProps = {
  onOpenModal: () => void;
};

interface Platform {
  id: string;
  name: string;
  img: string;
}

const platforms: Platform[] = [
  {
    id: "0",
    name: "선택해주세요",
    img: book,
  },
  {
    id: "1",
    name: "Discord",
    img: discord_blue,
  },
  {
    id: "2",
    name: "Naver",
    img: naver,
  },
  {
    id: "3",
    name: "Google",
    img: google,
  },
  {
    id: "4",
    name: "KakaoTalk",
    img: kakaotalk,
  },
  {
    id: "5",
    name: "Instagram",
    img: instagram,
  },
  {
    id: "6",
    name: "Facebook",
    img: facebook,
  },
  {
    id: "7",
    name: "Twitter",
    img: twitter,
  },
  {
    id: "8",
    name: "DEVOCEAN",
    img: devocean,
  },
];

interface Channel {
  id: string;
  name: string;
}

let channels: Channel[] = [
  {
    id: "1",
    name: "1",
  },
];

const ConfigModal = ({ onOpenModal }: ModalProps) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.addEventListener("mousedown", outsideClickHandler);
    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("mousedown", outsideClickHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* select platform */
  const [selectedItem, setSelectedItem] = useState<Platform | null>(
    platforms[0]
  );
  useEffect(() => {
    if (selectedItem) {
      console.log(selectedItem!.name);
      if (selectedItem && selectedItem.name === "Discord") {
        axios
          .get("https://localhost:3002/api/discord-channels")
          .then((response) => {
            console.log(response.data);
            channels = response.data;
            setSelectedChannel(response.data[0]);
            setLoading(false);
          })
          .catch((e) => console.error(e));
        // eslint-disable-next-line react-hooks/exhaustive-deps
        console.log(channels);
      }
    }
  }, [selectedItem]);

  /* select discord channel */
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(
    channels[0]
  );
  const [loading, setLoading] = useState(true);
  const setChannel = useSetRecoilState(dchannel);
  useEffect(() => {
    if (selectedChannel) {
      console.log(selectedChannel.id);
      setChannel(selectedChannel.id);
    }
  }, [selectedChannel]);

  /* config success */
  const [success, setSuccess] = useState(false);
  const successHandler = () => {
    setSuccess(true);
  };

  /* modal outside click */
  const modalRef = useRef<HTMLDivElement | null>(null);

  const outsideClickHandler = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onOpenModal();
    }
  };

  return (
    <ModalPortal>
      <div className="fixed top-0 left-0 flex items-center justify-center w-full h-screen bg-black bg-opacity-40">
        {success ? (
          <div
            ref={modalRef}
            className="container w-[22rem] h-[18rem] md:w-[42rem] md:h-[28rem] flex flex-col items-center justify-center bg-white rounded-3xl shadow-lg"
          >
            <ConfigSuccess onModalAlert={onOpenModal} />
          </div>
        ) : (
          <div
            ref={modalRef}
            className="container w-[22rem] h-[18rem] md:w-[42rem] md:h-[28rem] flex flex-col items-center justify-center bg-white rounded-3xl shadow-lg"
          >
            <p className="text-2xl font-bold text-black md:text-3xl font-main">
              설정할 플랫폼을 선택해주세요
            </p>
            <div className="flex flex-col items-center justify-center md:mt-6 md:mb-6 md:flex-row">
              <div
                className={`items-end justify-end w-48 h-12 md:mt-10 ${
                  selectedItem!.name === "Discord" ? "mr-0 md:mr-5" : ""
                } scale-100`}
              >
                <Listbox value={selectedItem} onChange={setSelectedItem}>
                  <div className="mt-4 md:mt-2">
                    <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-green-300 sm:text-sm">
                      {selectedItem && (
                        <span className="flex flex-row truncate">
                          <div className="w-[26px] items-center justify-center flex ml-1">
                            <img
                              src={selectedItem.img}
                              alt="logo"
                              className="w-auto h-[20px]"
                            />
                          </div>
                          <p className="ml-2">{selectedItem.name}</p>
                        </span>
                      )}
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
                        {platforms.map((item, itemIdx) => (
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
                                  className={`flex flex-row items-start truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  <div className="w-[26px] items-center justify-center flex ml-2">
                                    <img
                                      src={item.img}
                                      alt="logo"
                                      className="w-auto h-[20px] mr-3"
                                    />
                                  </div>
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
              {selectedItem!.name === "Discord" ? (
                loading ? (
                  <div className="w-48 h-12 mt-8 md:mt-10">
                    <p className="py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md sm:text-sm">
                      loading...
                    </p>
                  </div>
                ) : (
                  <div className="w-48 h-12 mt-8 md:mt-10">
                    <Listbox
                      value={selectedChannel}
                      onChange={setSelectedChannel}
                    >
                      <div className="mt-2">
                        <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-green-300 sm:text-sm">
                          <span className="block truncate">
                            {selectedChannel!.name}
                          </span>
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
                          <Listbox.Options className="absolute w-48 py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {channels.map((item, itemIdx) => (
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
                )
              ) : (
                ""
              )}
            </div>
            <button
              onClick={successHandler}
              className="w-[250px] h-[46px] mt-10 bg-main-2 font-main font-bold text-white text-xl rounded-xl"
            >
              설정 완료
            </button>
          </div>
        )}
      </div>
    </ModalPortal>
  );
};

export default ConfigModal;
