import {atom} from 'recoil';
import {IconType} from "react-icons";
import {TiHome} from "react-icons/ti";

export type DirectoryMenuItem = {
    displayText: string,
    imageURL?: string,
    link: string
}

interface DirectoryMenuState {
    isOpen: boolean,
    selectedMenuItem: DirectoryMenuItem,

}

export const defaultMenuItem: DirectoryMenuItem = {
    displayText: 'Trang chủ',
    link: '/',
    imageURL: '/assets/Home-icon.png'
}

export const defaultMenuState: DirectoryMenuState = {
    isOpen: false,
    selectedMenuItem: defaultMenuItem
}

export const directoryMenuState = atom<DirectoryMenuState>({
    key: 'directoryMenuState',
    default: defaultMenuState,
})