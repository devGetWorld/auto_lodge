export class Swipers {

    public static initMainSwiper(dom, argument){
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
                        argument.action("changeMainLight", argument.id)
                    },100)
                },
            },
        });

        return mainSwiper;
    }

    public static  initNewCarSwiper(dom){
        const btnLeft = document.getElementById("swiperButton_toPrev_newCar")
        const btnRight = document.getElementById("swiperButton_toNext_newCar")
        new Swiper(dom,{
            loop: false,
            slidesPerView: 3,
            spaceBetween: 33,
            slidesPerGroup: 1,
            navigation: {
                prevEl: btnLeft,
                nextEl: btnRight,
            },
        })
    }
}