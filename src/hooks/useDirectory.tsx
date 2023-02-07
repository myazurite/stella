import React, {useEffect} from 'react';
import {useRecoilState, useRecoilValue} from "recoil";
import {DirectoryMenuItem, directoryMenuState} from "@/atoms/directoryMenuAtom";
import {useRouter} from "next/router";
import {communityState} from "@/atoms/communitiesAtom";

const useDirectory = () => {
    const [directoryState, setDirectoryState] = useRecoilState(directoryMenuState);
    const router = useRouter();
    const communityStateValue = useRecoilValue(communityState);

    const onSelectMenuItem = (menuItem: DirectoryMenuItem) => {
        setDirectoryState((prev) => ({
            ...prev,
            selectedMenuItem: menuItem,
        }));
        router.push(menuItem.link);
        if(directoryState.isOpen) {
            toggleMenuOpen();
        }
    }

    const toggleMenuOpen = () => {
        setDirectoryState((prev) => ({
            ...prev,
            isOpen: !directoryState.isOpen
        }));
    };

    useEffect(() => {
        const {currentCommunity} = communityStateValue;
        if(currentCommunity) {
            setDirectoryState((prev) => ({
                ...prev,
                selectedMenuItem: {
                    displayText: `s/${currentCommunity.id}`,
                    link: `/s/${currentCommunity.id}`,
                    imageURL: currentCommunity.imageURL
                }
            }))
        }

    }, [communityStateValue.currentCommunity]);

    return {
        directoryState,
        toggleMenuOpen,
        onSelectMenuItem
    }
}

export default useDirectory;