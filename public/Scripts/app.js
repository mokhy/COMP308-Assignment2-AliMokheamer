/* Custom Javascript goes here */
// IIFE
(function(){

    function Start(){
        console.log('%c Connected!',
         "font-size: 20px; color: blue; font-weight: bold");
    }

    window.addEventListener('load', Start);
})();