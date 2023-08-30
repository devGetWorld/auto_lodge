import { InitScripts } from "./components/initScripts/index"
import { MainMenuEvent } from "./components/mainEvents/mainMenuEvent"

let pageId = document.querySelector("main").className
let initWeb = new InitScripts(pageId)
let initMenuEvent = new MainMenuEvent()

initWeb.init()
