import React, { useEffect } from "react";
import { RouteComponentProps, useHistory, withRouter  } from "react-router-dom";
import IPage from "../../interfaces/page";
import './Landing.css'
import AboutUs from '../../components/landing/AboutUsSection';
import ServicesCards from '../../components/landing/ServicesCards'
import Testimonials from "../../components/landing/Testimonials";
import Footer from '../../components/landing/Footer';
import ContactSection from '../../components/landing/ContactSection';
import Hero from "../../components/landing/Hero";
import Navbar from "../../components/landing/Navbar";
import {useTranslation} from "react-i18next";

const visited = localStorage.getItem("visited");
const LandingPage: React.FC<IPage & RouteComponentProps<any>> = props => {
  const history = useHistory();
  const { t } = useTranslation('common');

  useEffect(() => {
    // If visited property is setted, must redirect user to /home route
    if (visited === 'true') {
      return history.push('/home');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="font-inter bg-gray-100" >
      <Navbar t={t} />

      <Hero t={t} />

      <AboutUs t={t} />

      <ServicesCards t={t}/>

      <Testimonials t={t} />

      <ContactSection t={t}/>

      <Footer t={t}/>
    </div>
  );
};

export default withRouter(LandingPage);
