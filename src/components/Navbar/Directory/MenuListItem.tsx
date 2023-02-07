import React from 'react';
import {IconType} from "react-icons";
import {Flex, MenuItem, Image, Text} from "@chakra-ui/react";
import useDirectory from "@/hooks/useDirectory";

type MenuListItemProps = {
    displayText: string,
    link: string,
    imageURL?: string
    icon?: IconType
}

const MenuListItem:React.FC<MenuListItemProps> = ({
    displayText,
    imageURL,
    link
}) => {
    const {onSelectMenuItem} = useDirectory();

    return(
        <MenuItem
            width='100%'
            fontSize='10pt'
            _hover={{bg: 'gray.100'}}
            onClick={() => onSelectMenuItem({displayText, link, imageURL})}
        >
            <Flex align='center'>
                {imageURL ? (
                    <Image
                        src={imageURL}
                        borderRadius='full'
                        boxSize='25px'
                        mr={2}
                    />
                ) : (
                    <Image
                        src='/assets/communityDefault.png'
                        borderRadius='full'
                        boxSize='25px'
                        mr={2}
                    />
                )}
                {displayText}
            </Flex>
        </MenuItem>
    )
}

export default MenuListItem;