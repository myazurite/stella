import React, {useState} from 'react';
import {Alert, AlertIcon, Flex, Text} from "@chakra-ui/react";
import {BsLink45Deg, BsMic} from "react-icons/bs";
import {IoDocumentText, IoImageOutline} from "react-icons/io5";
import {Icon} from "@chakra-ui/icons";
import TabItem from './TabItem';
import TextInputs from "@/components/Posts/PostForm/TextInputs";
import ImageUpload from './PostForm/ImageUpload';
import {Post} from "@/atoms/postsAtom";
import {User} from "@firebase/auth";
import {useRouter} from "next/router";
import {addDoc, collection, serverTimestamp, Timestamp, updateDoc} from "@firebase/firestore";
import {firestore, storage} from "@/firebase/clientApp";
import {getDownloadURL, ref, uploadString} from "@firebase/storage";
import useSelectFile from "@/hooks/useSelectFile";

type NewPostFormProps = {
    user: User;
    communityImageURL?: string
}

const formTabs: ITabItem[] = [
    {
        title: 'Post',
        icon: IoDocumentText,
    },
    {
        title: 'Ảnh & GIF',
        icon: IoImageOutline,
    },
    {
        title: 'Roll (đang nghĩ)',
        icon: BsLink45Deg,
    },
]

export type ITabItem = {
    title: string,
    icon: typeof Icon.arguments
}

const NewPostForm: React.FC<NewPostFormProps> = ({user, communityImageURL}) => {
    const router = useRouter();
    const [selectedTab, setSelectedTab] = useState(formTabs[0].title);
    const [textInputs, setTextInputs] = useState({
        title: '',
        body: ''
    });
    const {selectedFile, setSelectedFile, onSelectFile} = useSelectFile();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const handleCreatePost = async () => {
        const {communityId} = router.query;
        //Create Post object
        const newPost: Post = {
            communityId: communityId as string,
            communityImageURL: communityImageURL || '',
            creatorId: user?.uid,
            creatorDisplayName: user.email!.split('@')[0],
            title: textInputs.title,
            body: textInputs.body,
            numberOfComments: 0,
            voteStatus: 0,
            createdAt: serverTimestamp() as Timestamp,
        };

        setLoading(true);
        try {
            //Store Post in db
            const postDocRef = await addDoc(collection(firestore, 'posts'), newPost);

            //Update doc by adding imageURL
            //Check selected file
            if (selectedFile) {
                //Store in storage => getDownloadURL (return imageURL)
                const imageRef = ref(storage, `posts/${postDocRef.id}/image`);
                console.log(postDocRef.id)
                await uploadString(imageRef, selectedFile, 'data_url');
                const downloadURL = await getDownloadURL(imageRef);

                //Update postDoc by adding imageURL
                await updateDoc(postDocRef, {
                    imageURL: downloadURL,
                })
            }
            //Redirect back to community page
            router.back();
        } catch (error: any) {
            console.log('handleCreatePost error', error.message);
            setError(true);
        }
        setLoading(false);
    }

    const onTextChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {
            target: {name, value}
        } = event;
        setTextInputs((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    return (
        <Flex direction='column' bg='white' borderRadius={4} mt={2}>
            <Flex width='100%'>
                {formTabs.map((item, index) => (
                    <TabItem
                        item={item}
                        key={item.title}
                        selected={item.title === selectedTab}
                        setSelectedTab={setSelectedTab}
                    />
                ))}
            </Flex>
            <Flex p={4}>
                {selectedTab === 'Post' && (
                    <TextInputs
                        textInputs={textInputs}
                        handleCreatePost={handleCreatePost}
                        onChange={onTextChange}
                        loading={loading}
                    />
                )}
                {selectedTab === 'Ảnh & GIF' && (
                    <ImageUpload
                        setSelectedTab={setSelectedTab}
                        setSelectedFile={setSelectedFile}
                        selectedFile={selectedFile}
                        onSelectImage={onSelectFile}
                    />
                )}
            </Flex>
            {error && (
                <Alert status='error'>
                    <AlertIcon/>
                    <Text fontSize='10pt' color='gray.700'>Lỗi tạo bài viết, kiểm tra console log và báo lại cho Cafe
                        đẹptry</Text>
                </Alert>
            )}
        </Flex>
    )
}

export default NewPostForm;