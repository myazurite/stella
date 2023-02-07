import {Flex, Input, InputGroup, InputLeftElement, InputRightElement} from '@chakra-ui/react';
import React from 'react';
import {SearchIcon} from "@chakra-ui/icons";
import {User} from "@firebase/auth";

type SearchInputProps = {
    user?: User | null;
}

const SearchInput:React.FC<SearchInputProps> = ({user}) => {
    return(
        <Flex flexGrow={1} mr={2} align='center' maxWidth={user ? 'auto' : '600px'}>
            <InputGroup>
                <InputLeftElement pointerEvents='none'>
                    <SearchIcon color='gray.300' mb={2}/>
                </InputLeftElement>
                <Input
                    placeholder='Search...'
                    _placeholder={{color: 'gray.400'}}
                    fontSize='10pt'
                    _hover={{
                        bg: 'white',
                        border: '1px solid',
                        borderColor: 'blue.500'
                    }}
                    _focus={{
                        outline: 'none',
                        border: '1px solid',
                        borderColor: 'blue.500'
                    }}
                    height='30px'
                    bg='gray.50'
                />
            </InputGroup>
        </Flex>
    )
}

export default SearchInput;