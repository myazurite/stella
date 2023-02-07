import React from 'react';
import {Community} from "@/atoms/communitiesAtom";
import {Box, Flex, Image, Text, Button} from "@chakra-ui/react";
import useCommunityData from "@/hooks/useCommunityData";

type HeaderProps = {
    communityData: Community;
}

const Header:React.FC<HeaderProps> = ({communityData}) => {
    const {communityStateValue, onJoinOrLeaveCommunity, loading} = useCommunityData();
    const isJoined = !!communityStateValue.mySnippets.find(
        (item) => item.communityId === communityData.id
    );

    return(
        <Flex
            direction='column'
            width='100%'
            height='150px'
        >
            <Box height='50%' bg='blue.400'></Box>
            <Flex justify='center' bg='white' flexGrow={1}>
                <Flex width='95%' maxWidth='860px'>
                    {communityStateValue.currentCommunity?.imageURL ? (
                        <Image
                            src={communityStateValue.currentCommunity?.imageURL}
                            boxSize='64px'
                            alt='community image'
                            position='relative'
                            top={-3}
                            border='4px solid white'
                            borderRadius='full'
                        />
                    ) : (
                        <Image
                            src='/assets/communityDefault.png'
                            boxSize='64px'
                            alt='community default'
                            position='relative'
                            top={-3}
                            border='4px solid white'
                            borderRadius='full'
                        />
                    )}
                    <Flex padding='10px 16px'>
                        <Flex direction='column' mr={6}>
                            <Text fontWeight={800} fontSize='16pt'>{communityData.id}</Text>
                            <Text fontWeight={600} fontSize='10pt' color='gray.400'>s/{communityData.id}</Text>
                        </Flex>
                        <Button
                            variant={isJoined ? 'outline' : 'solid'}
                            height='30px'
                            px={6}
                            isLoading={loading}
                            onClick={() => onJoinOrLeaveCommunity(communityData, isJoined)}
                        >
                            {isJoined ? 'Đã vào nhóm' : 'Xin vào nhóm'}
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}

export default Header;