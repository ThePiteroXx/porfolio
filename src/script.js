import "./scss/style.scss";
import LoadingScreen from "./Js/LoadingScreen/LoadingScreen.js";
import Contact from './Js/Contact/Contact'
import { update } from "./Js/updateRender";

import "./Js/navigation.js";

new LoadingScreen();
new Contact();
update();


