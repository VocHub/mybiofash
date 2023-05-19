import { useHistory } from "react-router";

const Fade = require('react-reveal/Fade');

const Hero = (props: any) => {
  const history = useHistory();
  return (
    <section className="flex h-screen justify-center items-center bg-gray-100" id="top">
      <video className="absolute w-full h-screen object-cover" autoPlay loop muted>
        <source src="https://res.cloudinary.com/slinqer/video/upload/v1631900417/video_background_eshz8b.mp4" type="video/mp4" />
      </video>
      <Fade bottom cascade>
        <div className="text-center z-10">
          <h1 className="text-5xl text-white mb-4 font-extrabold leading-none tracking-tight lg:text-7xl ">
            <span>{props.t('hero.title')}</span>
            &nbsp;
            <span className="text-green">{props.t('hero.titleColored')}</span>
          </h1>
          <p className="text-2xl md:text-3xl mb-8 text-white max-w-sm sm:max-w-xl mx-auto ">
            {props.t('hero.text')}
          </p>

          <button onClick={() => history.push('/slides')} className="w-5/6  md:w-1/2 p-4 text-xl bg-green text-white font-bold rounded-lg transform transition duration-500 hover:scale-150">
            {props.t('hero.buttons.join')}
          </button>
        </div>

      </Fade>
      <img src="./assets/images/waves-inverted-gray.svg" className="absolute inset-x-0 bottom-0 w-full" alt="Olas de decoracion" />
    </section>
  );
};

export default Hero;
