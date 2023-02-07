import React, {useState} from 'react';
import {Post} from "@/atoms/postsAtom";
import { AiOutlineDelete } from "react-icons/ai";
import { BsChat, BsDot } from "react-icons/bs";
import {
    IoArrowDownCircleOutline,
    IoArrowDownCircleSharp,
    IoArrowRedoOutline,
    IoArrowUpCircleOutline,
    IoArrowUpCircleSharp,
    IoBookmarkOutline,
} from "react-icons/io5";
import {Flex, Icon, Stack, Text, Image, Skeleton, Spinner, Alert, AlertIcon} from "@chakra-ui/react";
import moment from "moment";
import {useRouter} from "next/router";
import Link from 'next/link';
import communityId from "@/pages/s/[communityId]";

type PostItemProps = {
    post: Post;
    userIsCreator: boolean;
    userVoteValue?: number;
    onVote: (
        event: React.MouseEvent<SVGElement, MouseEvent>,
        post: Post,
        vote: number,
        communityId: string
    ) => void;
    onDeletePost: (post: Post) => Promise<boolean>;
    onSelectPost?: (post: Post) => void;
    homePage?: boolean
}


const PostItem:React.FC<PostItemProps> = ({
        post,
        userIsCreator,
        userVoteValue,
        onVote,
        onDeletePost,
        onSelectPost,
        homePage
}) => {
    const router = useRouter();
    const [loadingImage, setLoadingImage] = useState(true);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [error, setError] = useState(false);
    const singlePostPage = !onSelectPost;

    const handleDelete = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        event.stopPropagation();
        setLoadingDelete(true);
        try {
            const success = await onDeletePost(post);

            if (!success) {
                throw new Error('Lỗi khi xóa post, kiểm tra console log.')
            }
            console.log('Xóa post thành công.')
            if(singlePostPage) {
                router.push(`/s/${post.communityId}`)
            }
        } catch (error: any) {
            setError(error.message);
        }
        setLoadingDelete(false);
    }

    return(
        <Flex
            border='1px solid'
            bg='white'
            borderColor={singlePostPage ? 'white' : 'gray.300'}
            borderRadius={singlePostPage ? '4px 4px 0 0' : '4px'}
            _hover={{borderColor: singlePostPage ? 'none' : 'gray.500'}}
            cursor={singlePostPage ? 'unset' : 'pointer'}
            onClick={() => onSelectPost && onSelectPost(post)}
        >
            <Flex
                direction='column'
                align='center'
                bg={singlePostPage ? 'none' : 'gray.100'}
                p={2}
                width='40px'
                borderRadius={singlePostPage ? '0' : '3px 0 0 3px'}
            >
                <Icon
                    as={userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline}
                    color={userVoteValue === 1 ? 'brand.100' : 'gray.400'}
                    fontSize={22}
                    onClick={(event) => onVote(event, post, 1, post.communityId)}
                    cursor='pointer'
                />
                <Text fontSize='9pt'>{post.voteStatus}</Text>
                <Icon
                    as={userVoteValue === -1 ? IoArrowDownCircleSharp : IoArrowDownCircleOutline}
                    color={userVoteValue === -1 ? '#4379ff' : 'gray.400'}
                    fontSize={22}
                    onClick={(event) => onVote(event, post, -1, post.communityId)}
                    cursor='pointer'
                />
            </Flex>
            <Flex
                direction='column'
                width='100%'
            >
                {error && (
                    <Alert status='error'>
                        <AlertIcon/>
                        <Text fontSize='10pt' color='gray.700'>{error}</Text>
                    </Alert>
                )}
                <Stack spacing={1} p='10px'>
                    <Stack
                        direction='row'
                        spacing={0.6}
                        align='center'
                        fontSize='9pt'
                    >
                        {/*Home page check*/}
                        {homePage && (
                            <>
                                {post.communityImageURL ? (
                                    <Image
                                        src={post.communityImageURL}
                                        borderRadius='full'
                                        mr={2}
                                        boxSize='25px'
                                    />
                                ) : (
                                    <Image
                                        src='/assets/communityDefault.png'
                                        borderRadius='full'
                                        boxSize='25px'
                                        mr={2}
                                    />
                                )}
                                <Link href={`s/${post.communityId}`}>
                                    <Text
                                        fontWeight={700}
                                        _hover={{textDecoration: 'underline'}}
                                        onClick={(event) => event.stopPropagation()}
                                    >
                                        {`s/${post.communityId}`}
                                    </Text>
                                </Link>
                                <Icon as={BsDot} color='gray.500' fontSize={8} />
                            </>
                        )}
                        <Text>
                            Đăng bởi u/{post.creatorDisplayName}{' '}
                            {moment(new Date(post.createdAt?.seconds * 1000)).fromNow()}
                        </Text>
                    </Stack>
                    <Text fontSize='12pt' fontWeight={600}>{post.title}</Text>
                    <Text fontSize='10pt'>{post.body}</Text>
                    {post.imageURL && (
                        <Flex justify='center' p={2}>
                            {loadingImage && (
                                <Skeleton height='200px' width='100%' borderRadius={4}/>
                            )}
                            <Image
                                src={post.imageURL}
                                maxHeight='460px'
                                alt='post image'
                                display={loadingImage ? 'none' : 'unset'}
                                onLoad={() => setLoadingImage(false)}
                            />
                        </Flex>
                    )}
                </Stack>
                <Flex ml={1} mb={0.5} color='gray.500' fontWeight={500}>
                    <Flex
                        align='center'
                        p='8px 10px'
                        borderRadius={4}
                        _hover={{bg:'gray.200'}}
                        cursor='pointer'
                    >
                        <Icon as={BsChat} mr={2}/>
                        <Text fontSize='9pt'>{post.numberOfComments}</Text>
                    </Flex>
                    <Flex
                        align='center'
                        p='8px 10px'
                        borderRadius={4}
                        _hover={{bg:'gray.200'}}
                        cursor='pointer'
                    >
                        <Icon as={IoArrowRedoOutline} mr={2}/>
                        <Text fontSize='9pt'>Chia sẻ</Text>
                    </Flex>
                    <Flex
                        align='center'
                        p='8px 10px'
                        borderRadius={4}
                        _hover={{bg:'gray.200'}}
                        cursor='pointer'
                    >
                        <Icon as={IoBookmarkOutline} mr={2}/>
                        <Text fontSize='9pt'>Lưu</Text>
                    </Flex>
                    {userIsCreator && (
                        <Flex
                            align='center'
                            p='8px 10px'
                            borderRadius={4}
                            _hover={{bg:'gray.200'}}
                            cursor='pointer'
                            onClick={handleDelete}
                        >
                            {loadingDelete ? (
                                <Spinner size='sm'/>
                            ) : (
                                <>
                                    <Icon as={AiOutlineDelete} mr={2}/>
                                    <Text fontSize='9pt'>Xóa</Text>
                                </>
                            )}
                        </Flex>
                    )}
                </Flex>
            </Flex>
        </Flex>
    )
}

export default PostItem;