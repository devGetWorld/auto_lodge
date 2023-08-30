export class MainMenuEvent {
    constructor() {
        document.querySelector(".navigation").querySelectorAll("li").forEach((element) => {
            element.querySelector("a").addEventListener("mouseover", (e) => {
                if(element.className.includes("active")) return;

                this.doHoverNavigation(element);
            });
        });

        document.querySelector(".navigation").querySelectorAll("li").forEach((element) => {
            element.querySelector("a").addEventListener("mouseleave", (e) => {
                if(element.className.includes("active")) return;

                this.removeHoverNavigation(element);
            });
        });
    }

    private doHoverNavigation(el){
        let light_block = el.querySelector(".light")
        let light = el.querySelector(".light_decor")
        let text = el.querySelector("a")

        text.style.color = "#FFF"
        let stops = light.querySelectorAll(".gradient stop");
        stops[0].setAttribute('stop-color', 'white');
        stops[1].setAttribute('stop-color', 'white');

        light_block.classList.add("animation_navigations_hover")
        light.classList.add("animation_navigations_hover")
        light_block.classList.add("hoverActivate")
        text.classList.add("animation_navigations_hover")
    }

    private removeHoverNavigation(el){
        let light_block = el.querySelector(".light")
        let light = el.querySelector(".light_decor")
        let text = el.querySelector("a")

        text.style.color = "#555"
        light_block.classList.remove("animation_navigations_hover")
        light.classList.remove("animation_navigations_hover")
        text.classList.remove("animation_navigations_hover")
        light_block.classList.remove("hoverActivate")
    }



}