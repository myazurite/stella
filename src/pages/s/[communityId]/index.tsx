import React, {useEffect} from 'react';
import {GetServerSidePropsContext} from "next";
import {doc, getDoc} from "@firebase/firestore";
import {firestore} from "@/firebase/clientApp";
import {Community, communityState} from "@/atoms/communitiesAtom";
import safeJsonStringify from "safe-json-stringify";
import NotFound from "@/components/Community/NotFound";
import Header from "@/components/Community/Header";
import PageContent from "@/components/Layout/PageContent";
import CreatePostLink from "@/components/Community/CreatePostLink";
import Posts from "@/components/Posts/Posts";
import {useSetRecoilState} from "recoil";
import About from '@/components/Community/About';

type CommunityPageProps = {
    communityData: Community;
}

const CommunityPage:React.FC<CommunityPageProps> = ({communityData}) => {
    console.log('Community data: ', communityData);
    const setCommunityStateValue = useSetRecoilState(communityState);

    useEffect(() => {
        if(communityData){
            setCommunityStateValue((prev) => ({
                ...prev,
                currentCommunity: communityData,
            }));
        }
    }, [communityData]);

    if(!communityData) return <NotFound/>

    return(
        <>
            <Header communityData={communityData}/>
            <PageContent>
                <>
                    <CreatePostLink/>
                    <Posts communityData={communityData}/>
                </>
                <>
                    <About communityData={communityData}/>
                </>
            </PageContent>
        </>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    //get community data and pass to client
    try {
        const communityDocRef = doc(firestore, 'communities', context.query.communityId as string);
        const communityDoc = await getDoc(communityDocRef);

        return {
            props: {
                communityData: communityDoc.exists()
                    ? JSON.parse(safeJsonStringify({id: communityDoc.id, ...communityDoc.data()}))
                    : ''
            }
        }
    } catch (error) {
        console.log('getServerSideProps error', error);
    }
}

export default CommunityPage;