import React, {useEffect} from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton, Button, Flex, Text
} from '@chakra-ui/react';
import {useRecoilState} from "recoil";
import {authModalState} from "@/atoms/authModalAtom";
import AuthInputs from "@/components/Modal/Auth/AuthInputs";
import OAuthButtons from "@/components/Modal/Auth/OAuthButtons";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "@/firebase/clientApp";
import ResetPassword from "@/components/Modal/Auth/ResetPassword";

const Layout: React.FC = () => {
    const [modalState, setModalState] =useRecoilState(authModalState);
    const [user, loading, error] = useAuthState(auth);

    const handleClose = () => {
        setModalState(prev => ({
            ...prev,
            open: false
        }))
    }

    useEffect(() => {
        if(user) handleClose();
        console.log('user:', user)
    }, [user]);


    return (
        <>
            <Modal isOpen={modalState.open} onClose={handleClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader textAlign='center'>
                        {modalState.view === 'login' && 'Đăng nhập'}
                        {modalState.view === 'signup' && 'Đăng kí'}
                        {modalState.view === 'resetPassword' && 'Đổi mật khẩu'}
                    </ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody
                        display='flex'
                        flexDirection='column'
                        alignItems='center'
                        justifyContent='center'
                        pb={6}
                    >
                        <Flex
                            direction='column'
                            align='center'
                            justify='center'
                            width='70%'
                        >
                            {modalState.view === 'login' || modalState.view === 'signup' ? (
                                <>
                                    <OAuthButtons/>
                                    <Text color='gray.500' fontWeight={700}>HOẶC</Text>
                                    <AuthInputs/>
                                </>
                            ) : <ResetPassword/>}
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default Layout;