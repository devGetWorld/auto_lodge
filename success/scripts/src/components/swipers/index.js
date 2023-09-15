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

    public static initReviwsSwiper(dom, argument){
        //swiper_reviews_main

        new Swiper(dom, {
            loop: false,
            slidesPerView: 3,
            spaceBetween: 75,
            slidesPerGroup: 1,
            navigation: {
                prevEl: argument.left,
                nextEl: argument.right,
            },
        });

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

    public static  initProductSwiper(){
        const btnLeft = document.getElementById("swiper_product-left")
        const btnRight = document.getElementById("swiper_product-right")


        new Swiper(document.getElementById("swiper_product"),{
            loop: false,
            slidesPerView: 1,
            spaceBetween: 20,
            slidesPerGroup: 1,
            navigation: {
                prevEl: btnLeft,
                nextEl: btnRight,
            },
        })
    }

    public static initFullScreen(){

        new Swiper(document.getElementById("fullSwiperWrapperSmall"),{
            loop: false,
            slidesPerView: 8,
            slidesPerGroup: 1,
            navigation: {
                // prevEl: btnLeft,
                // nextEl: btnRight,
            },
        })
    }

    public static initAutoSwiper(){
        document.querySelectorAll(".initAutoSwiper").forEach((el) => {

            new Swiper(el,{
                loop: true,
                slidesPerView: 1,
                slidesPerGroup: 1,
                effect: 'fade',
                noSwiping: true,
                allowTouchMove: false,
                autoplay:{
                    delay: 3000
                },
                fadeEffect: {
                    crossFade: true,
                    delay: 700
                },
            })
        })
    }
}