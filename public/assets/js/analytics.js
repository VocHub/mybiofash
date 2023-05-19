// Hotjar Tracking Code for https://strayker.com 
(function(h,o,t,j,a,r){
    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
    h._hjSettings={hjid:1945899,hjsv:6};
    a=o.getElementsByTagName('head')[0];
    r=o.createElement('script');r.async=1;
    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
    a.appendChild(r);
})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
// FIrebase
var firebaseConfig = {
    apiKey: "AIzaSyBcome8uZfSWYQlCTX3VuVtN1T-O07lkEU",
    authDomain: "timugo-labs.firebaseapp.com",
    databaseURL: "https://timugo-labs.firebaseio.com",
    projectId: "timugo-labs",
    storageBucket: "timugo-labs.appspot.com",
    messagingSenderId: "699141459179",
    appId: "1:699141459179:web:ab0e455fae6e7262a202ae",
    measurementId: "G-C625WGP2M1"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();