import React from 'react';
import {ITabItem} from "@/components/Posts/NewPostForm";
import {Flex, Text} from "@chakra-ui/react";
import {Icon} from "@chakra-ui/icons";

type TabItemProps = {
    item: ITabItem;
    selected: boolean;
    setSelectedTab: (value: string) => void
}

const TabItem:React.FC<TabItemProps> = ({item, selected, setSelectedTab}) => {
    return(
        <Flex
            justify='center'
            align='center'
            flexGrow={1}
            py='14px'
            cursor='pointer'
            _hover={{bg:'gray.50'}}
            color={selected ? 'blue.500' : 'gray.500'}
            borderWidth={selected ? '0 1px 2px 0' : '0 1px 1px 0'}
            borderBottomColor={selected ? 'blue.500' : 'gray.200'}
            borderRightColor='gray.200'
            fontWeight={700}
            onClick={() => setSelectedTab(item.title)}
        >
            <Flex align='center' height='20px' mr={2}>
                <Icon as={item.icon}/>
            </Flex>
            <Text fontSize='10pt'>{item.title}</Text>
        </Flex>
    )
}

export default TabItem;