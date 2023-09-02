    import {randomIze} from "../../module/random";

    export class CarboneCanvas {
        private containerId
        private carbonImage
        private listsElements = []
        public animationStatus = {id: 0, status: false}
        private animationArray = []

        constructor(containerId, width, height) {
            if(!containerId) return
            this.containerId = containerId
            this.initCarbon(width, height)
        }

        private initCarbon(width, height){
            this.containerId.width = width
            this.containerId.height = height

            this.carbonImage = new Image();
            this.carbonImage.src = '../success/resourse/static/background/carbone.png';
            this.carbonImage.onload = () => this.doInitCarbon()
        }

        public resetAnimation = () => {
            console.log("reset")

            this.doAnimationCarbon()
        }

        private doInitCarbon(){
            const container = this.containerId
            const width = container.width
            const height = container.height
            const imgWidth = 224
            const imgHeight = 263
            const space = 10
            let reverse = true
            let spaceReverse = 0
            let listCarbon = []

            const numImgsHorizontally = (Math.floor((width + space) / (imgWidth + space))) + 1;
            const numImgsVertically = (Math.floor((height + space) / (imgWidth + space))) + 1;

            for(let i = 0; i < numImgsVertically; i++) {
                reverse = !reverse
                let thisEl

                if(!reverse){
                    this.containerId.insertAdjacentHTML('beforeend', "<div class='imagesGrid'></div>");
                }else{
                    this.containerId.insertAdjacentHTML('beforeend', "<div class='imagesGrid reverse'></div>");
                }

                thisEl = this.containerId.querySelectorAll('.imagesGrid');
                thisEl = thisEl[thisEl.length - 1]

                if (reverse){
                    spaceReverse=60
                }

                thisEl.style.marginTop = `-${spaceReverse}px`;

                for(let j = 0; j < numImgsHorizontally; j++) {
                    let startPointID = i * 8
                    // let x = j * (imgWidth + space);
                    // let y = (i * (imgHeight + space)) - spaceReverse;

                    // if(reverse){
                    //     x -= 117;
                    //     y -= 70
                    // }

                    listCarbon.push({id: startPointID + j})

                    const imageCopy = this.carbonImage.cloneNode();

                    thisEl.insertAdjacentHTML('beforeend', "<div class='wrapper'></div>");
                    const wrapper = thisEl.querySelector('.wrapper:last-child');
                    wrapper.appendChild(imageCopy);
                }

            }

            this.listsElements.push(listCarbon)
        }

        public doAnimationCarbon = () => {
            this.animationStatus.id = setInterval(function (){
                const allImages = [...document.querySelectorAll('#carbone_container .wrapper img')];
                const getRandomImages = (images, count) => {
                    const shuffled = [...images].sort(() => 0.5 - Math.random());
                    return shuffled.slice(0, count);
                };

                const rndImg = getRandomImages(allImages, 5);
                rndImg.forEach((img) => {
                    let getRnd_brightness = randomIze.getRandomFloat(0.5, 1.5)
                    img.style.filter = `brightness(${getRnd_brightness})`
                });

            },3000);

            this.animationStatus.status = true
        }

    }