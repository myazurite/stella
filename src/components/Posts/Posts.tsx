import React, {useEffect, useState} from 'react';
import {Community} from "@/atoms/communitiesAtom";
import {collection, getDocs, orderBy, query, where} from "@firebase/firestore";
import {auth, firestore} from "@/firebase/clientApp";
import usePosts from "@/hooks/usePosts";
import {Post} from "@/atoms/postsAtom";
import PostItem from "@/components/Posts/PostItem";
import {useAuthState} from "react-firebase-hooks/auth";
import {Stack} from "@chakra-ui/react";
import PostLoader from "@/components/Posts/PostLoader";

type PostsProps = {
    communityData: Community;
}

const Posts: React.FC<PostsProps> = ({communityData}) => {
    const [user] = useAuthState(auth);
    const [loading, setLoading] = useState(false);
    const {postStateValue, setPostStateValue, onVote, onSelectPost, onDeletePost} = usePosts();

    const getPost = async () => {
        setLoading(true);
        try {
            //Get posts for current community
            const postQuery = query(
                collection(firestore, 'posts'),
                where('communityId', '==', communityData.id),
                orderBy('createdAt', 'desc')
            );
            const postDocs = await getDocs(postQuery);

            //Store in post state
            const posts = postDocs.docs.map(doc => ({id: doc.id, ...doc.data()}));
            setPostStateValue((prev) => ({
                ...prev,
                posts: posts as Post[],
            }))

            console.log('Post:', posts);
        } catch (error: any) {
            console.log('getPosts error', error.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        getPost();
    }, [communityData]);


    return (
        <>
            {loading ? (
                <PostLoader/>
            ) : (
                <Stack>
                    {postStateValue.posts.map((item) => (
                        <PostItem
                            key={item.id}
                            post={item}
                            userIsCreator={user?.uid === item.creatorId}
                            userVoteValue={postStateValue.postVotes.find((vote) => vote.postId === item.id)?.voteValue}
                            onVote={onVote}
                            onSelectPost={onSelectPost}
                            onDeletePost={onDeletePost}
                        />
                    ))}
                </Stack>
            )}
        </>
    )
}

export default Posts;