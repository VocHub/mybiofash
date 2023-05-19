const Fade = require('react-reveal/Fade');

const AboutUsSection = (props: any) =>
  <section className="flex justify-center h-screen bg-gray-100" >
    <Fade bottom cascade>
      <div className="w-11/12 md:w-9/12 items-center flex flex-wrap">
        <div className="w-11/12 md:w-6/12 mx-auto pr-4">
          <img alt="Mujer sosteniendo una planta" className="rounded-2xl shadow-lg" src="./assets/images/save_world.webp"/>
        </div>

        <div className="w-11/12 md:w-6/12 mx-auto pl-2">
          <div className="lg:pr-10">
            <div className="p-3 text-center inline-flex justify-center w-12 h-12 mb-2 md:w-16 md:h-16 md:mb-6 shadow-lg rounded-full bg-white">
              <span className="text-2xl md:text-3xl">🌎</span>
            </div>
            <h2 className="text-4xl md:text-5xl mb-4 font-black text-gray-800">{props.t('aboutUs.title')}</h2>
            <p className="text-2xl text-gray-600 mb-8 md:text-3xl ">
              {props.t('aboutUs.text')}
            </p>
            <div className="flex justify-center items-center flex-wrap">
              <img src="./assets/images/ecopoop.webp" alt="Logo aliado Ecopoop" className="h-16 mr-2 md:h-20 md:mr-2" />
              <img src="./assets/images/lifepack.webp" alt="Logo aliado Lifepack" className="h-16 mr-2 md:h-24 md:mr-2" />
              <img src="./assets/images/kaoba.webp" alt="Logo aliado Kaoba" className="h-16 mr-2 md:h-24 md:mr-2" />
              <img src="./assets/images/grafincol.webp" alt="Logo aliado Grafincol" className="h-12 mr-2 md:h-14" />
              <img src="./assets/images/induecon.webp" alt="Logo aliado Induecon" className="h-12" />
            </div>
          </div>
        </div>

      </div>
    </Fade>
  </section>

export default AboutUsSection;
