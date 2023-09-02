export class Swipers {

    public static initMainSwiper(dom){
        return new Swiper('.swiper', {
            loop: true,

            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
        });
    }
}