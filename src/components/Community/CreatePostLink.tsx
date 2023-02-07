import { Flex, Icon, Input, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import {useAuthState} from "react-firebase-hooks/auth";
import { BsLink45Deg } from "react-icons/bs";
import { IoImageOutline } from "react-icons/io5";
import {useSetRecoilState} from "recoil";
import {authModalState} from "@/atoms/authModalAtom";
import {auth} from "@/firebase/clientApp";
import useDirectory from "@/hooks/useDirectory";

const CreatePostLink: React.FC = () => {
    const router = useRouter();
    const [user] = useAuthState(auth);
    const setAuthModalState = useSetRecoilState(authModalState);
    const {toggleMenuOpen} = useDirectory();

    const onClick = () => {
        if (!user) {
            setAuthModalState({open: true, view: 'login'});
            return;
        }
        const {communityId} = router.query;
        if (communityId) {
            router.push(`/s/${communityId}/submit`);
            return;
        }
        toggleMenuOpen();
    };
    return (
        <Flex
            justify="space-evenly"
            align="center"
            bg="white"
            height="56px"
            borderRadius={4}
            border="1px solid"
            borderColor="gray.300"
            p={2}
            mb={4}
        >
            <Image
                src='/assets/stellaLogout.png'
                width='42px'
                height='42px'
                mr={4}
                borderRadius='full'
                border='2px solid'
                borderColor='gray.500'
            />
            <Input
                placeholder="Viết bài"
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
                borderColor="gray.200"
                height="36px"
                borderRadius={4}
                mr={4}
                onClick={onClick}
            />
            <Icon
                as={IoImageOutline}
                fontSize={24}
                mr={4}
                color="gray.400"
                cursor="pointer"
            />
            <Icon as={BsLink45Deg} fontSize={24} color="gray.400" cursor="pointer" />
        </Flex>
    );
};
export default CreatePostLink;