import React, {useEffect, useState} from 'react';
import {useRecoilState, useSetRecoilState} from "recoil";
import {Community, CommunitySnippet, communityState} from "@/atoms/communitiesAtom";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, firestore} from "@/firebase/clientApp";
import {collection, doc, getDoc, getDocs, increment, writeBatch} from "@firebase/firestore";
import {authModalState} from "@/atoms/authModalAtom";
import {useRouter} from "next/router";

const useCommunityData = () => {
    const [user] = useAuthState(auth);
    const [communityStateValue, setCommunityStateValue] = useRecoilState(communityState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const setAuthModalState = useSetRecoilState(authModalState);
    const router = useRouter();

    const onJoinOrLeaveCommunity = (communityData: Community, isJoined: boolean) => {
        if (!user) {
            setAuthModalState({open: true, view: 'login'});
            return;
        }
        if(isJoined) {
            leaveCommunity(communityData.id);
            return;
        }
        joinCommunity(communityData);
    }

    const getMySnippets = async () => {
        setLoading(true);
        try {
            const snippetDocs = await getDocs(
                collection(firestore, `users/${user?.uid}/communitySnippets`)
            )
            const snippets = snippetDocs.docs.map(doc => ({...doc.data()}));
            console.log(snippets);
            setCommunityStateValue(prev => ({
                ...prev,
                mySnippets: snippets as CommunitySnippet[],
                snippetsFetched: true
            }));
        } catch (error: any) {
            console.log('getMySnippets error', error);
            setError(error.message);
        }
        setLoading(false);
    }

    const joinCommunity = async (communityData: Community) => {
        //Batch write
        try {
            //Create new community snippet
            const batch = writeBatch(firestore);
            const newSnippet: CommunitySnippet = {
                communityId: communityData.id,
                imageURL: communityData.imageURL || '',
                isModerator: user?.uid === communityData.creatorId
            }
            batch.set(
                doc(
                    firestore,
                    `users/${user?.uid}/communitySnippets`,
                    communityData.id
                ),
                newSnippet
            )

            //Update NumberOfMembers
            batch.update(doc(firestore, 'communities', communityData.id), {
                numberOfMembers: increment(1)
            });

            await batch.commit();

            //Update recoil state - communityState.mySnippets
            setCommunityStateValue((prev) => ({
                ...prev,
                mySnippets: [...prev.mySnippets, newSnippet]
            }));
        }catch (error: any) {
            console.log('joinCommunity error', error);
            setError(error.message);
        }
        setLoading(false);
    }

    const leaveCommunity = async (communityId: string) => {
        //Batch write
        try {
            const batch = writeBatch(firestore);
            //Delete community snippet
            batch.delete(doc(
                firestore,
                `users/${user?.uid}/communitySnippets`,
                communityId
            ))

            //Update NumberOfMembers
            batch.update(doc(firestore, 'communities', communityId), {
                numberOfMembers: increment(-1)
            });
            await batch.commit();

            //Update recoil state - communityState.mySnippets
            setCommunityStateValue((prev) => ({
                ...prev,
                mySnippets: prev.mySnippets.filter(
                    (item) => item.communityId !== communityId
                ),
            }));
        } catch (error: any) {
            console.log('leaveCommunity error', error);
            setError(error.message);
        }
        setLoading(false);
    }

    const getCommunityData = async (communityId: string) => {
        try {
            const communityDocRef = doc(firestore, 'communities', communityId);
            const communityDoc = await getDoc(communityDocRef);

            setCommunityStateValue((prev) => ({
                ...prev,
                currentCommunity: {
                    id: communityDoc.id,
                    ...communityDoc.data()
                } as Community
            }));
        } catch (error) {
            console.log('getCommunityData error', error);
        }
    }

    useEffect(() => {
        if (!user) {
            setCommunityStateValue((prev) => ({
                ...prev,
                mySnippets: [],
                snippetsFetched: false
            }));
            return;
        }
        getMySnippets();
    }, [user]);

    useEffect(() => {
        const {communityId} = router.query;
        if(communityId && !communityStateValue.currentCommunity) {
            getCommunityData(communityId as string);
        }
    }, [router.query, communityStateValue.currentCommunity]);

    return {
        communityStateValue,
        onJoinOrLeaveCommunity,
        loading
    }
}

export default useCommunityData;