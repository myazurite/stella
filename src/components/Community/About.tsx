import React, {useRef, useState} from 'react';
import {Community, communityState} from "@/atoms/communitiesAtom";
import {Box, Button, Divider, Flex, Icon, Stack, Text, Image, Spinner, Input} from "@chakra-ui/react";
import {HiOutlineDotsHorizontal} from "react-icons/hi";
import {RiCakeLine} from "react-icons/ri";
import moment from "moment";
import Link from "next/link";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, firestore, storage} from "@/firebase/clientApp";
import useSelectFile from "@/hooks/useSelectFile";
import {getDownloadURL, ref, uploadString} from "@firebase/storage";
import {doc, updateDoc} from "@firebase/firestore";
import {useSetRecoilState} from "recoil";

type AboutProps = {
    communityData: Community;
}

const About:React.FC<AboutProps> = ({communityData}) => {
    const [user] = useAuthState(auth);
    const selectedFileRef = useRef<HTMLInputElement>(null);
    const {selectedFile, setSelectedFile, onSelectFile} = useSelectFile();
    const [uploadingImage, setUploadingImage] = useState(false);
    const setCommunityStateValue = useSetRecoilState(communityState);

    const onUpdateImage = async () => {
        if (!selectedFile) return;
        setUploadingImage(true);

        try {
            const imageRef = ref(storage, `communities/${communityData.id}/image`);
            await uploadString(imageRef, selectedFile, 'data_url');
            const downloadURL = await getDownloadURL(imageRef);
            await updateDoc(doc(firestore, 'communities', communityData.id), {
                imageURL: downloadURL,
            });

            setCommunityStateValue((prev) => ({
                ...prev,
                currentCommunity: {
                    ...prev.currentCommunity,
                    imageURL: downloadURL,
                } as Community,
            }));
        } catch (error) {
            console.log('onUpdateImage error', error);
        }
        setUploadingImage(false);
    }

    return(
        <Box position='sticky' top='14px'>
            <Flex
                justify='space-between'
                align='center'
                bg='blue.400'
                color='white'
                p={3}
                borderRadius='4px 4px 0 0'
            >
                <Text fontSize='10pt' fontWeight={700}>Thông tin nhóm</Text>
                <Icon as={HiOutlineDotsHorizontal}/>
            </Flex>
            <Flex
                direction='column'
                p={3}
                bg='white'
                borderRadius='0 0 4px 4px'
            >
                <Stack>
                    <Flex width='100%' p={2} fontSize='10pt' fontWeight={700}>
                        <Flex direction='column' flexGrow={1} >
                            <Text>{communityData.numberOfMembers.toLocaleString()}</Text>
                            <Text>Thành viên</Text>
                        </Flex>
                        <Flex direction='column' flexGrow={1}>
                            <Text>1</Text>
                            <Text>Online</Text>
                        </Flex>
                    </Flex>
                    <Divider/>
                    <Flex align='center' width='100%' p={1} fontWeight={500} fontSize='10pt'>
                        <Icon as={RiCakeLine} fontSize={18} mr={2}/>
                        {communityData.createdAt &&
                            <Text>
                                Tạo vào {''}
                                {moment(
                                    new Date(communityData.createdAt.seconds * 1000)
                                ).format('DD MM, YYYY')}
                            </Text>
                        }
                    </Flex>
                    <Link href={`/s/${communityData.id}/submit`}>
                        <Button mt={3} height='30px' width='100%'>Đăng bài</Button>
                    </Link>
                    {user?.uid === communityData.creatorId && (
                        <>
                            <Divider/>
                            <Stack spacing={1} fontSize='10pt'>
                                <Text fontWeight={600}>Admin</Text>
                                <Flex align='center' justify='space-between'>
                                    <Text
                                        color='blue.500'
                                        cursor='pointer'
                                        _hover={{textDecoration: 'underline'}}
                                        onClick={() => selectedFileRef.current?.click()}
                                    >
                                        Đổi ảnh nhóm
                                    </Text>
                                    {communityData.imageURL || selectedFile ? (
                                        <Image
                                            src={selectedFile || communityData.imageURL}
                                            borderRadius='full'
                                            boxSize='40px'
                                            border='4px solid white'
                                            alt='community image'
                                        />
                                    ) : (
                                        <Image
                                            src='/assets/communityDefault.png'
                                            boxSize='40px'
                                            alt='community default'
                                            position='relative'
                                            top={-3}
                                            border='4px solid white'
                                            borderRadius='full'
                                        />
                                    )}
                                </Flex>
                                {selectedFile && (
                                    (uploadingImage
                                        ? (<Spinner/>)
                                        : <Text cursor='pointer' onClick={onUpdateImage}>Lưu</Text>
                                    )
                                )}
                                <Input
                                    id='file-upload'
                                    type='file'
                                    accept='image/x-png,image/gif,image/jpeg,image/png,image/webp,image/webm'
                                    hidden
                                    ref={selectedFileRef}
                                    onChange={onSelectFile}
                                />
                            </Stack>
                        </>
                    )}
                </Stack>
            </Flex>
        </Box>
    )
}

export default About;