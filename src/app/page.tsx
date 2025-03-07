import Image from "next/image";
import { FiSearch } from "react-icons/fi";
import { HiLightningBolt } from "react-icons/hi";
import { PiStrategy } from "react-icons/pi";
import { TbTargetArrow } from "react-icons/tb";

export default function Home() {
  return (
    <>
      <div className="py-6 bg-gradient-to-br from-[#FBB394] via-white to-[#FBB394]">
        <header className="w-full pb-6 flex items-center justify-center">
          <Image src="/logo.svg" alt="Mikkoapp logo" width={85} height={23} />
        </header>

        <main className="px-5 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-center gap-1  text-secondary">
              <HiLightningBolt />
              <p className="font-red-hat text-[10px]">Recomendado +500 vezes pela minha mãezinha querida</p>
            </div>

            <div className="flex flex-col items-center text-2xl font-semibold ">
              <h1 className="text-center font-rubik">
                Retome o controle financeiro com pouquíssimo esforço {" "}
              </h1>

              <div className="relative w-fit">
                <div className="w-[110%] h-[110%] absolute bg-[#FB9366] z-0 -rotate-6 -left-[5px]"></div>
                <p className="relative z-10 font-rubik">
                  (mesmo)
                </p>
              </div>
            </div>
          </div>

          <p className="text-[#202020] text-xs font-red-hat text-center">
            Gerenciar planilhas gigantes? Aprender sobre finanças do zero? Tudo isso parece dar muito trabalho, não é? Toca pro Mikko que ele cuida disso tudo pra você.
          </p>

          <div className="w-full p-1 flex gap-2 items-center rounded-lg border border-neutral-200 bg-white">
            <input type="email" placeholder="Seu melhor e-mail" className="p-3 flex-grow text-[10px] font-red-hat" />
            <button className="bg-primary hover:brightness-90 font-rubik px-[22px] py-[10px] rounded-lg text-[10px] font-semibold whitespace-nowrap transition">
              Testar grátis
            </button>
          </div>
        </main>
      </div>

      <section className="w-full px-7 py-11 flex flex-col gap-5">
        <h2 className="text-xl text-dark font-rubik font-semibold">
          Mikko tá aí pra <strong className="text-secondary font-semibold">descomplicar</strong> suas finanças
        </h2>

        <div className="grid gap-[6px]">
          <article className="p-3 rounded-lg border border-neutral-200 flex gap-4">
            <div className="w-7 h-7 flex items-center justify-center rounded-full border border-neutral-200">
              <TbTargetArrow size={14} />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-xs font-semibold font-red-hat">Fale sobre sua meta financeira</h3>
              <p className="text-xs font-red-hat">Descreva onde você quer chegar financeiramente.</p>
            </div>
          </article>
          <article className="p-3 rounded-lg border border-neutral-200 flex gap-4">
            <div className="w-7 h-7 flex items-center justify-center rounded-full border border-neutral-200">
              <FiSearch size={14} />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-xs font-semibold font-red-hat">O Mikko analisa seus gastos</h3>
              <p className="text-xs font-red-hat">É feita uma breve análise sobre seu perfil financeiro.</p>
            </div>
          </article>
          <article className="p-3 rounded-lg border border-neutral-200 flex gap-4">
            <div className="w-7 h-7 flex items-center justify-center rounded-full border border-neutral-200">
              <PiStrategy size={14} />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-xs font-semibold font-red-hat">No final, tenha um planejamento completo</h3>
              <p className="text-xs font-red-hat">Alinhamos seu objetivo e seu perfil em um planejamento completamente personalizado.</p>
            </div>
          </article>
        </div>


        <button className="bg-primary hover:brightness-90 font-rubik px-[22px] py-[10px] rounded-lg text-xs font-semibold whitespace-nowrap transition">
          Quero organizar minhas finanças
        </button>
      </section>
    </>
  );
}
