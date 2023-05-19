const Footer = (props: any) =>
  <footer>
    <div className="text-center py-10 flex justify-evenly items-center flex-wrap mx-auto">
      <div className="w-full md:w-auto flex justify-center">
        <img className="w-3/6 md:w-48" src="./assets/images/slinqer_logo.svg" alt="logo slinqer" />
      </div>

      <div className="w-full md:w-auto my-6">
        <p className="text-xl md:text-2xl text-center text-gray-800 text-lg font-inter">
          Hecho con 💚 para el 🌎
        </p>
      </div>

      <div className="w-full md:w-auto flex items-center justify-center space-x-6">
        <a href="https://instagram.com/slinqerglobal" target="_blank" rel="noreferrer">
          <img className="w-10" src="./assets/icons/logo-instagram.svg" alt="logo instagram"/>
        </a>
        <a href="https://twitter.com/slinqer" className="text-gray-800" target="_blank" rel="noreferrer">
          <svg className="w-10 h-10 fill-current" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.995 6.68799C20.8914 6.15208 21.5622 5.30823 21.882 4.31399C21.0397 4.81379 20.118 5.16587 19.157 5.35499C17.8246 3.94552 15.7135 3.60251 14.0034 4.51764C12.2933 5.43277 11.4075 7.37948 11.841 9.26999C8.39062 9.09676 5.17598 7.4669 2.99702 4.78599C1.85986 6.74741 2.44097 9.25477 4.32502 10.516C3.64373 10.4941 2.97754 10.3096 2.38202 9.97799C2.38202 9.99599 2.38202 10.014 2.38202 10.032C2.38241 12.0751 3.82239 13.8351 5.82502 14.24C5.19308 14.4119 4.53022 14.4372 3.88702 14.314C4.45022 16.0613 6.06057 17.2583 7.89602 17.294C6.37585 18.4871 4.49849 19.1342 2.56602 19.131C2.22349 19.1315 1.88123 19.1118 1.54102 19.072C3.50341 20.333 5.78739 21.0023 8.12002 21C11.3653 21.0223 14.484 19.7429 16.7787 17.448C19.0734 15.1531 20.3526 12.0342 20.33 8.78899C20.33 8.60299 20.3257 8.41799 20.317 8.23399C21.1575 7.62659 21.8828 6.87414 22.459 6.01199C21.676 6.35905 20.8455 6.58691 19.995 6.68799Z"></path>
          </svg>
        </a>
      </div>
    </div>
  </footer>
export default Footer;
