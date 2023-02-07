import React, {useState} from 'react';
import {Button, Flex, Input, Text} from "@chakra-ui/react";
import {useSetRecoilState} from "recoil";
import {authModalState} from "@/atoms/authModalAtom";
import {useSignInWithEmailAndPassword} from "react-firebase-hooks/auth";
import {auth} from "@/firebase/clientApp";
import {FIREBASE_ERRORS} from "@/firebase/errors";

type LoginProps = {}

const Login: React.FC<LoginProps> = () => {
    const setAuthModalState = useSetRecoilState(authModalState);
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    });
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    //Firebase logic
    const onSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        await signInWithEmailAndPassword(loginForm.email, loginForm.password);
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        //Update form state
        setLoginForm(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }))
    }

    return (
        <form onSubmit={onSubmit}>
            <Input
                required
                name='email'
                placeholder='Email'
                type='email'
                mb={2}
                onChange={onChange}
                fontSize='10pt'
                _placeholder={{color: 'gray.500'}}
                _hover={{
                    bg: 'white',
                    border: '1px solid',
                    borderColor: 'blue.500'
                }}
                _focus={{
                    outline: 'none',
                    bg: 'white',
                    border: '1px solid',
                    borderColor: 'blue.500'
                }}
                bg='gray.50'
            />
            <Input
                required
                name='password'
                placeholder='Password'
                type='password'
                onChange={onChange}
                mb={2}
                fontSize='10pt'
                _placeholder={{color: 'gray.500'}}
                _hover={{
                    bg: 'white',
                    border: '1px solid',
                    borderColor: 'blue.500'
                }}
                _focus={{
                    outline: 'none',
                    bg: 'white',
                    border: '1px solid',
                    borderColor: 'blue.500'
                }}
                bg='gray.50'
            />
            <Text textAlign='center' color='red' fontSize='10pt'>
                {FIREBASE_ERRORS[error?.message as keyof typeof FIREBASE_ERRORS]}
            </Text>
            <Button
                type='submit'
                width='100%'
                height='36px'
                mt={2}
                mb={2}
                isLoading={loading}
            >Đăng nhập</Button>
            <Flex justifyContent="center" mb={2}>
                <Text fontSize="9pt" mr={1}>
                    Quên mật khẩu?
                </Text>
                <Text
                    fontSize="9pt"
                    color="blue.500"
                    fontWeight={700}
                    cursor="pointer"
                    onClick={() =>
                        setAuthModalState((prev) => ({
                            ...prev,
                            view: 'resetPassword'
                        }))
                    }
                >
                    Đổi mật khẩu
                </Text>
            </Flex>
            <Flex fontSize='9pt' justifyContent='center'>
                <Text mr={1}>Muốn nhập hội của Cafe đẹptry?</Text>
                <Text
                    fontWeight={700}
                    color='blue.500'
                    cursor='pointer'
                    onClick={() =>
                        setAuthModalState((prev) => ({
                            ...prev,
                            view: 'signup'
                        }))
                    }
                >Đăng kí</Text>
            </Flex>
        </form>
    )
}

export default Login;