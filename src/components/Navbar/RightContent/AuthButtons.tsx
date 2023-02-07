import React from 'react';
import {Button, Flex, Text} from "@chakra-ui/react";
import {useSetRecoilState} from "recoil";
import {authModalState} from "@/atoms/authModalAtom";

const AuthButtons:React.FC = () => {
    const setAuthModalState = useSetRecoilState(authModalState);

    return(
        <>
            <Button
                variant='outline'
                height='25px'
                width={{base: '70px', md: '110px'}}
                display={{base: 'none', sm: 'flex'}}
                onClick={() => setAuthModalState({open: true, view: 'login'})}
                mr={2}
            >Sign In</Button>
            <Button
                height='25px'
                width={{base: '70px', md: '110px'}}
                display={{base: 'none', sm: 'flex'}}
                onClick={() => setAuthModalState({open: true, view: 'signup'})}
            >Sign Up</Button>
        </>
    )
}

export default AuthButtons;