import React from "react";
import { useHistory } from "react-router";
const Fade = require('react-reveal/Fade');

const sectionStyle: React.CSSProperties = {
  height: '60vh',
};

const ContactSection = (props: any) => {
  const history = useHistory();
  return (
    <section id="contactForm" className="relative flex justify-center gradient" style={sectionStyle}>
      <Fade bottom cascade>
        <div className="w-11/12 md:w-8/12 flex flex-wrap">

          <div className="w-5/6 sm:w-5/12 mx-auto flex items-center">
            <div>
              <h1 className="w-full text-4xl md:text-5xl text-white font-extrabold tracking-tight">
                {props.t('contact.title')}
              </h1>
              <p className="text-lg md:text-2xl font-medium text-white">
                {props.t('contact.text')}
              </p>
            </div>
          </div>

          <div className="w-11/12 sm:w-5/12 mx-auto px-4 flex items-center">
            <button onClick={() => history.push('/slides')}
              className="w-full mx-auto md:w-8/12 p-4 text-xl bg-green text-white font-bold rounded-lg transform transition duration-500 hover:scale-125"
            >
              {props.t('hero.buttons.join')}
            </button>
          </div>
        </div>
      </Fade>
      <img src="./assets/images/waves-inverted-gray.svg" className="absolute inset-x-0 bottom-0 w-full" alt="" />
    </section>
  );
}

export default ContactSection;
