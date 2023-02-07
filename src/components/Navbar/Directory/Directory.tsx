import React from 'react';
import {
    Menu,
    MenuButton,
    MenuList,
    Flex, Icon, Text, Image
} from '@chakra-ui/react'
import {ChevronDownIcon} from "@chakra-ui/icons";
import Communities from "@/components/Navbar/Directory/Communities";
import useDirectory from "@/hooks/useDirectory";

const UserMenu: React.FC = () => {
    const {directoryState, toggleMenuOpen} = useDirectory();

    return (
        <Menu isOpen={directoryState.isOpen}>
            <MenuButton
                cursor='pointer'
                padding='0px 6px'
                borderRadius={4}
                _hover={{outline: '1px solid', outlineColor: 'gray.200'}}
                mr={2}
                mt={4}
                ml={{base:0, md:2}}
                height='fit-content'
                onClick={toggleMenuOpen}
            >
                <Flex
                    align='center'
                    justify='space-between'
                    width={{base: 'auto', lg: '200px'}}
                >
                    <Flex align='center'>
                        {directoryState.selectedMenuItem.imageURL ? (
                            <Image
                                src={directoryState.selectedMenuItem.imageURL}
                                boxSize='25px'
                                borderRadius='full'
                                mr={2}
                            />
                        ) : (
                            <Image
                                src='/assets/communityDefault.png'
                                borderRadius='full'
                                boxSize='25px'
                                mr={{base: 1, md: 2}}
                            />
                        )}
                        <Flex display={{base: 'none', lg: 'flex'}}>
                            <Text fontWeight={600} fontSize='10pt'>
                                {directoryState.selectedMenuItem.displayText}
                            </Text>
                        </Flex>
                    </Flex>
                    <ChevronDownIcon/>
                </Flex>
            </MenuButton>
            <MenuList>
                <Communities/>
            </MenuList>
        </Menu>
    )
}

export default UserMenu;