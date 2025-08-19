import Image from "next/image";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start bg-[url(/img/stinky.png)] bg-cover bg-center bg-no-repeat">
          <header>
              {/*<Image src="/img/stinky.png" alt="stinky" width={'200'} height={'200'} />*/}
              <h1 className="header text-left">
                  <span className={"font-geist-mono font-bold text-sky-500"} style={{fontStyle: 'bold', fontSize: '80px'}}>LockedIn</span>
              </h1>
              <h2>
                  <span className={"font-geist-mono font-medium"} style={{fontSize: '20px'}}>Your personal student dashboard app.</span>
              </h2>
          </header>
          {/*
          <div className="flex gap-[32px]" style={{fontSize: '25px'}}>
              <span>some stuff here yada yada</span>
          </div>*/}
      </main>
    </div>
  );
}
