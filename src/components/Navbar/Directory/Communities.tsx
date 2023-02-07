import React, {useState} from 'react';
import CreateCommunityModal from "@/components/Modal/CreateCommunity/CreateCommunityModal";
import {Box, Flex, MenuItem, Text} from "@chakra-ui/react";
import {GrAdd} from "react-icons/gr";
import {Icon} from "@chakra-ui/icons";
import {useRecoilValue} from "recoil";
import {communityState} from "@/atoms/communitiesAtom";
import MenuListItem from "@/components/Navbar/Directory/MenuListItem";

const Communities:React.FC = () => {
    const [open, setOpen] = useState(false);
    const mySnippets = useRecoilValue(communityState).mySnippets;

    return(
        <>
            <CreateCommunityModal open={open} handleClose={() => setOpen(false)}/>
            <Box mt={3} mb={4}>
                <Text pl={3} mb={1} fontSize='10pt' fontWeight={500} color='gray.500'>MOD</Text>
                {mySnippets.filter((snippet) => snippet.isModerator).map((snippet) => (
                    <MenuListItem
                        key={snippet.communityId}
                        link={`/s/${snippet.communityId}`}
                        displayText={`s/${snippet.communityId}`}
                        imageURL={snippet.imageURL}
                    />
                ))}
            </Box>
            <Box mt={3} mb={4}>
                <Text pl={3} mb={1} fontSize='10pt' fontWeight={500} color='gray.500'>NHÓM</Text>
                <MenuItem
                    width='100%'
                    fontSize='10pt'
                    _hover={{bg:'gray.100'}}
                    onClick={() => setOpen(true)}
                >
                    <Flex align='center'>
                        <Icon as={GrAdd} fontSize={20} mr={2}/>
                        Tạo Nhóm
                    </Flex>
                </MenuItem>
                {mySnippets.map((snippet) => (
                    <MenuListItem
                        key={snippet.communityId}
                        link={`/s/${snippet.communityId}`}
                        displayText={`s/${snippet.communityId}`}
                        imageURL={snippet.imageURL}
                    />
                ))}
            </Box>
        </>
    )
}

export default Communities;