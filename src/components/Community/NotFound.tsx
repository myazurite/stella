import React from "react";
import { Flex, Button, Text } from "@chakra-ui/react";
import Link from "next/link";
import Image from 'next/image';
import hildeSadge from '../../../public/assets/notfound.png';

const CommunityNotFound: React.FC = () => {
    return (
        <Flex
            direction="column"
            justifyContent="center"
            alignItems="center"
            minHeight="60vh"
        >
            <Text mb={2}>Hội này không tồn tại hoặc bạn đã ăn ban.</Text>
            <Image src={hildeSadge} alt='not found'/>
            <Link href="/">
                <Button mt={4}>Quay về trang chủ</Button>
            </Link>
        </Flex>
    );
};
export default CommunityNotFound;