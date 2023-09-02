export class Swipers {

    public static initMainSwiper(dom, action){
        let mainSwiper = new Swiper(dom, {
            loop: true,

            effect: 'fade',
            autoplay:{
              delay: 5000
            },
            fadeEffect: {
                crossFade: true,
                delay: 700
            },

            on: {
                slideChangeTransitionEnd: function() {
                    setTimeout(function (){
                        console.log("done")
                        action("changeMainLight")
                    },100)
                },
            },
        });

        return mainSwiper;
    }
}