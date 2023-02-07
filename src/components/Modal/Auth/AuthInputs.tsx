import React from 'react';
import {Flex} from "@chakra-ui/react";
import {useRecoilState, useRecoilValue} from "recoil";
import {authModalState} from "@/atoms/authModalAtom";
import Login from './Login';
import SignUp from "@/components/Modal/Auth/SignUp";

const AuthInputs:React.FC = () => {
    const modalState = useRecoilValue(authModalState);

    return (
        <Flex
            direction='column'
            align='center'
            width='100%'
            mt={4}
        >
            {modalState.view === 'login' && <Login/>}
            {modalState.view === 'signup' && <SignUp/>}
        </Flex>
    );
};

export default AuthInputs;