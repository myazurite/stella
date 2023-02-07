import React from 'react';
import {Flex, Button} from "@chakra-ui/react";
import AuthButtons from "@/components/Navbar/RightContent/AuthButtons";
import AuthModal from "@/components/Modal/Auth/AuthModal";
import {signOut, User} from "@firebase/auth";
import {auth} from "@/firebase/clientApp";
import Icons from "@/components/Navbar/RightContent/Icons";
import UserMenu from "@/components/Navbar/RightContent/UserMenu";

type RightContentProps = {
    user?: User | null;
}

const RightContent: React.FC<RightContentProps> = ({user}) => {
    return (
        <>
            <AuthModal/>
            <Flex justify='center' align='center'>
                {user ? <Icons/> : <AuthButtons/>}
                <UserMenu user={user}/>
            </Flex>
        </>
    )
}

export default RightContent;