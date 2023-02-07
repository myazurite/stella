import React from 'react';
import PageContent from "@/components/Layout/PageContent";
import {Box, Text} from "@chakra-ui/react";
import NewPostForm from "@/components/Posts/NewPostForm";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "@/firebase/clientApp";
import {useRecoilValue} from "recoil";
import {communityState} from "@/atoms/communitiesAtom";
import About from "@/components/Community/About";
import useCommunityData from "@/hooks/useCommunityData";

const SubmitPostPage:React.FC = () => {
    const [user] = useAuthState(auth);
    // const communityStateValue = useRecoilValue(communityState);
    const {communityStateValue} = useCommunityData();
    console.log('Community:', communityStateValue);

    return(
        <PageContent>
            <>
                <Box py='14px' borderBottom='1px solid' borderColor='white'>
                    <Text>Viết bài</Text>
                </Box>
                {user &&
                    <NewPostForm
                        user={user}
                        communityImageURL={communityStateValue.currentCommunity?.imageURL}
                    />
                }
            </>
            <>
                {communityStateValue.currentCommunity && (
                    <About communityData={communityStateValue.currentCommunity}/>
                )}
            </>
        </PageContent>
    )
}

export default SubmitPostPage;