import React from "react";
import { Button, Flex, Icon, Stack, Text, Image } from "@chakra-ui/react";

const PersonalHome: React.FC = () => {
    return (
        <Flex
            direction="column"
            bg="white"
            borderRadius={4}
            cursor="pointer"
            border="1px solid"
            borderColor="gray.300"
            position="sticky"
        >
            <Flex
                align="flex-end"
                color="white"
                p="6px 10px"
                bg="blue.500"
                height="34px"
                borderRadius="4px 4px 0px 0px"
                fontWeight={600}
                bgImage="url(/images/redditPersonalHome.png)"
                backgroundSize="cover"
            ></Flex>
            <Flex direction="column" p="12px">
                <Flex align="center" mb={2}>
                    <Image src='/assets/communityDefault.png' boxSize='50px' mr={2} borderRadius='full'/>
                    <Text fontWeight={600}>Home</Text>
                </Flex>
                <Stack spacing={3}>
                    <Text fontSize="9pt">
                        Trang cá nhân (đang build)
                    </Text>
                    <Button height="30px">Viết bài</Button>
                    <Button variant="outline" height="30px">
                        Tạo nhóm
                    </Button>
                </Stack>
            </Flex>
        </Flex>
    );
};
export default PersonalHome;