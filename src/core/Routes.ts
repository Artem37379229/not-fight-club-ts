import {HomePage} from "../pages/Home/HomePage.ts";
import {CharacterPage} from "../pages/Character/CharacterPage.ts";
import {RegistrationPage} from "../pages/Registration/RegistrationPage.ts";
import {SettingsPage} from "../pages/Settings/SettingsPage.ts";

const ROUTES = {
    '/': HomePage,
    'registration': RegistrationPage,
    'settings': SettingsPage,
    'character': CharacterPage,
    '404': 'Error'
}

export default ROUTES