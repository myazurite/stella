import {Inter} from '@next/font/google'
import PageContent from "@/components/Layout/PageContent";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, firestore} from "@/firebase/clientApp";
import {useEffect, useState} from "react";
import {collection, doc, getDocs, limit, orderBy, query, where} from "@firebase/firestore";
import usePosts from "@/hooks/usePosts";
import {Post, PostVote} from "@/atoms/postsAtom";
import PostLoader from "@/components/Posts/PostLoader";
import {Stack} from "@chakra-ui/react";
import PostItem from '@/components/Posts/PostItem';
import CreatePostLink from '@/components/Community/CreatePostLink';
import useCommunityData from "@/hooks/useCommunityData";
import Recommendation from "@/components/Community/Recommendation";
import PersonalHome from "@/components/Community/PersonalHome";

const inter = Inter({subsets: ['latin']})

export default function Home() {
    const [user, loadingUser] = useAuthState(auth);
    const [loading, setLoading] = useState(false);
    const {postStateValue, setPostStateValue, onDeletePost, onSelectPost, onVote} = usePosts();
    const {communityStateValue} = useCommunityData();

    const buildUserHomeFeed = async () => {
        setLoading(true);
        try {
            if (communityStateValue.mySnippets.length) {
                const myCommunityIds = communityStateValue.mySnippets.map(
                    (snippet) => snippet.communityId
                );
                const postQuery = query(
                    collection(firestore, 'posts'),
                    where('communityId', 'in', myCommunityIds),
                    limit(10)
                );
                const postDocs = await getDocs(postQuery);
                const posts = postDocs.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setPostStateValue((prev) => ({
                    ...prev,
                    posts: posts as Post[]
                }))
            } else buildNoUserHomeFeed();
        } catch (error) {
            console.log('buildUserHome error', error);
        }
        setLoading(false);
    };

    const buildNoUserHomeFeed = async () => {
        setLoading(true);
        try {
            const postQuery = query(
                collection(firestore, 'posts'),
                orderBy('voteStatus', 'desc'),
                limit(10)
            );

            const postDocs = await getDocs(postQuery);
            const posts = postDocs.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setPostStateValue((prev) => ({
                ...prev,
                posts: posts as Post[]
            }))
        } catch (error) {
            console.log('buildNoUser error', error);
        }
        setLoading(false);
    };

    const getUserPostVote = async () => {
        try {
            const postIds = postStateValue.posts.map((post) => post.id);
            const postVotesQuery = query(
                collection(firestore, `users/${user?.uid}/postVotes`),
                where('postId', 'in', postIds)
            );
            const postVoteDocs = await getDocs(postVotesQuery);
            const postVotes = postVoteDocs.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setPostStateValue((prev) => ({
                ...prev,
                postVotes: postVotes as PostVote[]
            }))
        } catch (error) {
            console.log('getUserPostVotes error', error);
        }
    }

    useEffect(() => {
        if (communityStateValue.snippetsFetched) buildUserHomeFeed();
    }, [communityStateValue.snippetsFetched]);


    useEffect(() => {
        if (!user && !loadingUser) buildNoUserHomeFeed();
    }, [user, loadingUser]);

    useEffect(() => {
        if (user && postStateValue.posts.length) getUserPostVote();

        return () => {
            setPostStateValue((prev) => ({
                ...prev,
                postVotes: []
            }))
        }
    }, [user, postStateValue.posts]);


    return (
        <PageContent>
            <>
                <CreatePostLink/>
                {loading ? (
                    <PostLoader/>
                ) : (
                    <Stack>
                        {postStateValue.posts.map((post) => (
                            <PostItem
                                post={post}
                                onVote={onVote}
                                onDeletePost={onDeletePost}
                                userIsCreator={user?.uid === post.creatorId}
                                userVoteValue={postStateValue.postVotes.find((item) => item.postId === post.id)?.voteValue}
                                onSelectPost={onSelectPost}
                                key={post.id}
                                homePage
                            />
                        ))}
                    </Stack>
                )}
            </>
            <Stack spacing={5}>
                <Recommendation/>
                <PersonalHome/>
            </Stack>
        </PageContent>
    )
}
