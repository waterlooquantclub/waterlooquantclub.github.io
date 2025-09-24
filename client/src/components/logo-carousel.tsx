function LogoCarousel() {
  return (
    <div
      className="mt-3 sm:mt-8 z-[999] inline-flex flex-nowrap w-full overflow-hidden
  [-webkit-mask-image:linear-gradient(to_right,transparent_0,black_60px,black_calc(100%-60px),transparent_100%)]
  [mask-image:linear-gradient(to_right,transparent_0,black_60px,black_calc(100%-60px),transparent_100%)]"
    >
      <ul className="companyList flex items-center justify-start [&_li]:mx-6 [&_img]:max-w-none">
        <li>
          <img
            src={"/JS.png"}
            className="aspect[14/5] h-10"
            alt="Jane Street"
          />
        </li>
        <li>
          <img src={"/SIG.png"} className="aspect[14/5] h-10" alt="SIG" />
        </li>
        <li>
          <img src={"/CIT.png"} className="aspect[14/5] h-10" alt="Citadel" />
        </li>
        <li>
          <img src={"/HRT.png"} className="aspect[14/5] h-10" alt="HRT" />
        </li>
        <li>
          <img src={"/IMC.png"} className="aspect[14/5] h-10" alt="IMC" />
        </li>
        <li>
          <img src={"/JUMP.png"} className="aspect[14/5] h-10" alt="Jump" />
        </li>
      </ul>
      <ul
        className="companyList flex items-center justify-start [&_li]:mx-6 [&_img]:max-w-none"
        aria-hidden="true"
      >
        <li>
          <img
            src={"/JS.png"}
            className="aspect[14/5] h-10"
            alt="Jane Street"
          />
        </li>
        <li>
          <img src={"/SIG.png"} className="aspect[14/5] h-10" alt="SIG" />
        </li>
        <li>
          <img src={"/CIT.png"} className="aspect[14/5] h-10" alt="Citadel" />
        </li>
        <li>
          <img src={"/HRT.png"} className="aspect[14/5] h-10" alt="HRT" />
        </li>
        <li>
          <img src={"/IMC.png"} className="aspect[14/5] h-10" alt="IMC" />
        </li>
        <li>
          <img src={"/JUMP.png"} className="aspect[14/5] h-10" alt="Jump" />
        </li>
      </ul>
    </div>
  );
}

export default LogoCarousel;
