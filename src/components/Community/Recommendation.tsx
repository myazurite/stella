import React, {useEffect, useState} from 'react';
import {Community} from "@/atoms/communitiesAtom";
import useCommunityData from "@/hooks/useCommunityData";
import {collection, doc, getDocs, limit, orderBy, query} from "@firebase/firestore";
import {firestore} from "@/firebase/clientApp";
import {Flex, Skeleton, SkeletonCircle, Stack, Text, Image, Box, Button} from "@chakra-ui/react";
import Link from "next/link";

const Recommendation: React.FC = () => {
    const [communities, setCommunities] = useState<Community[]>([]);
    const [loading, setLoading] = useState(false);
    const {communityStateValue, onJoinOrLeaveCommunity} = useCommunityData();

    const getCommunityRecommendation = async () => {
        setLoading(true);
        try {
            const communityQuery = query(
                collection(firestore, 'communities'),
                orderBy('numberOfMembers', 'desc'),
                // limit(10)
            );
            const communityDocs = await getDocs(communityQuery);
            const communities = communityDocs.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setCommunities(communities as Community[]);
        } catch (error) {
            console.log('getCommunityRecommend error', error);
        }
        setLoading(false);
    }

    useEffect(() => {
        getCommunityRecommendation();
    }, []);


    return (
        <Flex
            direction='column'
            bg='white'
            borderRadius={4}
            border='1px solid'
            borderColor='gray.300'
        >
            <Flex
                align='flex-end'
                color='white'
                p='6px 10px'
                height='90px'
                borderRadius='4px 4px 0 0'
                fontWeight={700}
                bgImage='url(/assets/recCommsArt.png)'
                backgroundSize='cover'
                bgGradient="linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75)), url('assets/recCommsArt.png')"
            >
                Tất cả nhóm
            </Flex>
            <Flex direction='column'>
                {loading ? (
                    <Stack mt={2} p={3}>
                        <Flex justify="space-between" align="center">
                            <SkeletonCircle size="10"/>
                            <Skeleton height="10px" width="70%"/>
                        </Flex>
                        <Flex justify="space-between" align="center">
                            <SkeletonCircle size="10"/>
                            <Skeleton height="10px" width="70%"/>
                        </Flex>
                        <Flex justify="space-between" align="center">
                            <SkeletonCircle size="10"/>
                            <Skeleton height="10px" width="70%"/>
                        </Flex>
                    </Stack>
                ) : (
                    <>
                        {communities.map((item, index) => {
                            const isJoined = !!communityStateValue.mySnippets.find((snippet) => snippet.communityId === item.id);
                            return (
                                <Link href={`/s/${item.id}`} key={item.id}>
                                    <Flex
                                        position='relative'
                                        align='center'
                                        fontSize='10pt'
                                        borderBottom='1px solid'
                                        borderColor='gray.200'
                                        p='10px 12px'
                                    >
                                        <Flex width='80%' align='center'>
                                            <Flex width='15%'>
                                                <Text>{index + 1}</Text>
                                            </Flex>
                                            <Flex align='center' width='80%'>
                                                {item.imageURL ? (
                                                    <Image src={item.imageURL} borderRadius='full' boxSize='28px' mr={2}/>
                                                ) : (
                                                    <Image src='/assets/communityDefault.png' borderRadius='full' boxSize='28px' mr={2}/>
                                                )}
                                                <span style={{
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow:'ellipsis'
                                                }}>
                                                    {`s/${item.id}`}
                                                </span>
                                            </Flex>
                                        </Flex>
                                        <Box position='absolute' right='10px'>
                                           <Button
                                               height='22px'
                                               fontSize='8pt'
                                               variant={isJoined ? 'outline' : 'solid'}
                                               onClick={(event) => {
                                                   event.stopPropagation();
                                                   onJoinOrLeaveCommunity(item, isJoined);
                                               }}
                                           >
                                               {isJoined ? 'Đã vào nhóm' : 'Xin vào nhóm'}
                                           </Button>
                                        </Box>
                                    </Flex>
                                </Link>
                            )
                        })}
                    </>
                )}
            </Flex>
        </Flex>
    )
}

export default Recommendation;