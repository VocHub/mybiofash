import { useEffect }  from "react";
// import { useEffect, useState }  from "react";
import '../../pages/Landing/Landing';
// import Switch from "react-switch";
// import {useTranslation} from "react-i18next";

const styleNavbar: any = {
  transition: "0.8s"
};

const Navbar = (props: any) => {
  // const {i18n} = useTranslation('common');
  // const [languageCheck, setLanguageCheck] = useState(false);
  // const [showDropMenu, setShowDropMenu] = useState(false);


  const navBarStyles = () => {
    const header = document.getElementById("header");
    const navcontent = document.getElementById("nav-content");
    const navButton = document.getElementById("navButton");
    // const brandname = document.getElementById("brandname");
    const toToggle = document.querySelectorAll(".toggleColour");
    const languageSwitch = document.querySelectorAll(".languageSwitch");
    const slinqerLogo = document.getElementById("logo") as HTMLImageElement;
    const scrollpos = window.scrollY;
    /*Apply classes for slide in bar*/
    if (header && navButton && slinqerLogo && navcontent) {
      if (scrollpos > 10 ) {
        header.classList.add("bg-white");
        // Nav Button
        navButton.classList.remove("bg-white");
        navButton.classList.remove("hidden");
        navButton.classList.add("gradient");
        navButton.classList.remove("text-gray-800");
        navButton.classList.add("text-white");
        slinqerLogo.src = './assets/images/logo.svg'
        languageSwitch.forEach(element => {
          element.classList.add('invisible');
        });
        for (var i = 0; i < toToggle.length; i++) {
          toToggle[i].classList.add("text-black");
          toToggle[i].classList.remove("font-bold");
          toToggle[i].classList.remove("text-white");
        }
        //Use to switch toggleColour colours
        for (var j = 0; j < toToggle.length; j++) {
          toToggle[j].classList.add("text-black");
          toToggle[j].classList.remove("font-bold");
          toToggle[j].classList.remove("text-white");
        }
        header.classList.add("shadow");
        navcontent.classList.remove("bg-gray-100");
        navcontent.classList.add("bg-white");
      } else {
        slinqerLogo.src = './assets/images/logo_symbolic.svg'
        header.classList.remove("bg-white");

        // BUtton
        navButton.classList.remove("gradient");
        navButton.classList.add("hidden");
        navButton.classList.add("bg-white");
        navButton.classList.remove("text-white");
        navButton.classList.add("text-gray-800");
        languageSwitch.forEach(element => {
          element.classList.remove('invisible');
        });
        //Use to switch toggleColour colours
        for (let i = 0; i < toToggle.length; i++) {
          toToggle[i].classList.add("text-white");
          toToggle[i].classList.add("font-bold");
          toToggle[i].classList.remove("font-semi-bold");
          toToggle[i].classList.remove("text-white-800");
        }
        header.classList.remove("shadow");
        navcontent.classList.remove("bg-white");
        navcontent.classList.add("bg-gray-100");
      }

    }
  }

  // const changeLanguage = (checked: boolean) => {
  //   setLanguageCheck(checked);
  // }

  // useEffect(() => {
  //   languageCheck ? i18n.changeLanguage('en') : i18n.changeLanguage('es')
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [languageCheck]);

  useEffect(() => {
    document.addEventListener('scroll', navBarStyles)
  }, []);

  // const languageSwitchComponent = () =>
  //   <>
  //     <li className="text-2xl">🇪🇸</li>
  //     <li className="mx-4">
  //       <Switch uncheckedIcon={false} offColor={"#3FB0B0"} onColor={"#3FB0B0"} checkedIcon={false} onChange={changeLanguage} checked={languageCheck} />
  //     </li>
  //     <li className="text-2xl">🇺🇸</li>
  //   </>

  return (
    <nav id="header" className="absolute z-10 w-full text-white bg-transparent" style={styleNavbar} >
      <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2" >

        <a href="#top" className="flex items-center mx-2 md:ml-40">
          <img id="logo" className="h-16 md:h-24 fill-current inline" src="./assets/images/slinqer_logo_white.svg" alt="logo slinqer" />
        </a>

        {/* <div className="block lg:invisible">
          <button id="nav-toggle" onClick={() => setShowDropMenu(!showDropMenu)} className="flex items-center p-1 text-orange-800 hover:text-gray-900">
            <svg className="fill-current h-6 w-6" style={{color: "white"}} viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div> */}

        {/* <div id="nav-content"
          className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block mt-2 lg:mt-0 bg-white lg:bg-transparent text-black p-4 lg:p-0 z-20"
        >
          <ul className="list-reset lg:flex justify-end flex-1 items-center mr-60">
            {languageSwitchComponent()}
          </ul>
        </div> */}
        {/* <div id="nav-content"
          className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block mt-2 lg:mt-0 bg-white lg:bg-transparent text-black p-4 lg:p-0 z-20"
        >
          <button className="w-5/6  md:w-1/2 p-4 text-xl bg-green text-white font-bold rounded-lg transform transition duration-500 hover:scale-150">
              {props.t('hero.buttons.join')}
            </button>
        </div> */}
      </div>

      {/* Drowpdown Menu */}
      {/* <div id="dropMenu"
        className={`${!showDropMenu && 'invisible'} origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
      >
        <ul className="flex justify-center mt-2">
          {languageSwitchComponent()}
        </ul>

        <div className="flex justify-center mb-2">
          <button className="gradient text-white font-bold rounded-full mt-4 py-4 px-8 shadow opacity-75">
            {props.t('navbar.contact')}
          </button>
        </div>
      </div> */}

    </nav>
  );
};

export default Navbar;
