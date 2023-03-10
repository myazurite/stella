import React, {PropsWithChildren} from 'react';
import {Flex} from "@chakra-ui/react";

interface IChildren extends PropsWithChildren {}
type PageContentProps = {

}

const PageContent:React.FC<IChildren> = ({children}) => {
    return(
        <Flex justify='center' p='16px 0'>
            <Flex
                width='95%'
                maxWidth='860px'
                justify='center'
            >
                {/*LHS*/}
                <Flex
                    direction='column'
                    width={{base: '100%', md:'65%'}}
                    mr={{base: 0, md: 6}}
                >
                    {children && children[0 as keyof typeof children]}
                </Flex>

                {/*RHS*/}
                <Flex
                    direction='column'
                    display={{base:'none', md:'flex'}}
                    flexGrow={1}
                >
                    {children && children[1 as keyof typeof children]}
                </Flex>
            </Flex>
        </Flex>
    )
}

export default PageContent;