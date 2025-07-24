import { Input } from "@/components/ui/input";
import React from "react";
import Image from "next/image";
import { SearchCard } from "@/components/SearchCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const searchData = [
  {
    icon: <></>,
    name: "Linkedin",
    title: "Bruno Simone - Software Engineer - WeCheck AI",
    url: "www.linkedin.com/in/brunosimone",
    content:
      "Mar del Plata, Provincia de Buenos Aires, Argentina · Software Engineer · WeCheck AI ¡Hola! Soy Bruno. Me dedico al desarrollo de software y, más allá de la tecnología, me apasiona resolver problemas reales a través del código.",
  },
  {
    icon: <></>,
    name: "Github",
    title: "Bruno Simone Github - WeCheck AI",
    url: "www.github.com/brunosimone",
    content:
      "GitHub is where people build software. More than 150 million people use GitHub to discover, fork, and contribute to over 420 million projects",
  },
  {
    icon: <></>,
    name: "Instagram @brunosimone",
    title: "Bruno Simone (@bruunosimone) · Fotos y reels de ...",
    url: "www.instagram.com/brunosimone",
    content:
      '1.8K+ seguidores · 959 seguidos · 33 publicaciones · @bruunosimone: "Futbolista / @defensorsp"',
  },
  {
    icon: <></>,
    name: "Bruno Simone",
    title: "Titulo de la page",
    url: "www.soyunaurl.com",
    content: "Contenido de la pagina",
  },
  {
    icon: <></>,
    name: "Bruno Simone",
    title: "Titulo de la page",
    url: "www.soyunaurl.com",
    content: "Contenido de la pagina",
  },
];

export default function search() {
  return (
    <div className="w-full justify-center items-center flex flex-col gap-6">
      <div className="flex w-full flex-col gap-4">
      <div className="flex w-full items-center justify-between pl-18 pr-5 pt-6">
        <div className="flex gap-12 items-center w-full">
          <p className="text-4xl font-bold tracking-tight flex">
            <span className="text-blue-500">B</span>
            <span className="text-red-500">r</span>
            <span className="text-yellow-500">u</span>
            <span className="text-blue-500">n</span>
            <span className="text-green-500">o</span>
          </p>

          <Input
            type="text"
            className="rounded-4xl px-6 w-3/5 h-13"
            placeholder="Search in portfolio"
          />
        </div>

        <div className="flex justify-end items-center gap-4 p-3">
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200">
            <Image
              src="https://api.iconify.design/material-symbols:apps.svg"
              alt="Apps"
              width="24"
              height="24"
            />
          </button>
          <button className="w-8 h-8 p-2 rounded-full bg-primary text-white flex items-center justify-center">
            <span className="text-lg font-medium">B</span>
          </button>
        </div>
        </div>
        <div className="w-full border-b border-gray-200">
          <Tabs defaultValue="all" className="px-56">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      <div className="w-full flex justify-start pl-56 pr-74">
        <div className="flex flex-col gap-6 w-[60%]">
          {searchData.map((item, index) => (
            <SearchCard key={index} {...item} />
          ))}
        </div>
        <div className="flπex flex-col w-[30%] gap-5 h-min border-l-gray-300 border-l pl-5">
          <div className="flex flex-col">
            <p className="text-[#1F1F1F] text-[28px] font-semibold">
              Bruno Daniel Simone
            </p>

            <p className="text-[#474747] text-[14px]">Software Engineer</p>
          </div>
          <div className="flex flex-col gap-2 border border-gray-100 rounded-lg min-h-60"></div>
          <div className="flex flex-col gap-2">
            <div className="p-3 rounded-xl bg-gray-100">
              <p className="text-sm text-[#1F1F1F]">
                José Francisco de San Martín y Matorras[4]​ (Yapeyú, Imperio
                español; 25 de febrero de 1778-Boulogne-sur-Mer, Francia; 17 de
                agosto de 1850)[5]​ fue un militar y político argentino,
                conocido por ser el libertador de la Argentina y Chile, además
                haber proclamado e impulsado la independencia del Perú. Es una
                de las figuras más trascendentes de las guerras de independencia
                hispanoamericanas junto a Simón Bolívar.
              </p>
            </div>

            <div className="flex gap-2 w-full">
              <div className="p-3 rounded-xl bg-gray-100 w-1/2">
                <p className="text-sm text-[#1F1F1F]">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Reprehenderit corporis qui unde tempora earum aperiam animi
                  expedita eum error eaque!
                </p>
              </div>
              <div className="p-3 rounded-xl bg-gray-100 w-1/2">
                <p className="text-sm text-[#1F1F1F]">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Excepturi expedita perferendis ipsa, sed libero deserunt
                  incidunt tempore ex corporis enim ab. Sit sed nulla illo eos
                  vitae quo rem fuga.
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2"></div>
        </div>
      </div>
    </div>
  );
}
