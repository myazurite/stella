import React, { useState } from "react";
import { Button, Flex, Icon, Input, Text, Image } from "@chakra-ui/react";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import { BsDot } from "react-icons/bs";
import {authModalState} from "@/atoms/authModalAtom";
import {auth} from "@/firebase/clientApp";
import { useSetRecoilState } from "recoil";

const ResetPassword: React.FC = () => {
    const setAuthModalState = useSetRecoilState(authModalState);
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(false);
    const [sendPasswordResetEmail, sending, error] =
        useSendPasswordResetEmail(auth);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        await sendPasswordResetEmail(email);
        setSuccess(true);
    };
    return (
        <Flex direction="column" alignItems="center" width="100%">
            <Image src='/assets/stellaLogo.png' alt='stella logo' mb={2}/>
            <Text fontWeight={700} mb={2}>
                Đặt lại mật khẩu
            </Text>
            {success ? (
                <Text mb={4}>Kiểm tra mail</Text>
            ) : (
                <>
                    <Text fontSize="sm" textAlign="center" mb={2}>
                        Điền mail liên kết với tài khoản
                    </Text>
                    <form onSubmit={onSubmit} style={{ width: "100%" }}>
                        <Input
                            required
                            name="email"
                            placeholder="email"
                            type="email"
                            mb={2}
                            onChange={(event) => setEmail(event.target.value)}
                            fontSize="10pt"
                            _placeholder={{ color: "gray.500" }}
                            _hover={{
                                bg: "white",
                                border: "1px solid",
                                borderColor: "blue.500",
                            }}
                            _focus={{
                                outline: "none",
                                bg: "white",
                                border: "1px solid",
                                borderColor: "blue.500",
                            }}
                            bg="gray.50"
                        />
                        <Text textAlign="center" fontSize="10pt" color="red">
                            {error?.message}
                        </Text>
                        <Button
                            width="100%"
                            height="36px"
                            mb={2}
                            mt={2}
                            type="submit"
                            isLoading={sending}
                        >
                            Đặt lại mật khẩu
                        </Button>
                    </form>
                </>
            )}
            <Flex
                alignItems="center"
                fontSize="9pt"
                color="blue.500"
                fontWeight={700}
                cursor="pointer"
            >
                <Text
                    onClick={() =>
                        setAuthModalState((prev) => ({
                            ...prev,
                            view: "login",
                        }))
                    }
                >
                    ĐĂNG NHẬP
                </Text>
                <Icon as={BsDot} />
                <Text
                    onClick={() =>
                        setAuthModalState((prev) => ({
                            ...prev,
                            view: "signup",
                        }))
                    }
                >
                    ĐĂNG KÍ
                </Text>
            </Flex>
        </Flex>
    );
};
export default ResetPassword;