import React from 'react';
import {User} from "@firebase/auth";
import AuthButtons from "@/components/Navbar/RightContent/AuthButtons";
import {Button, Flex, Text, Textarea} from "@chakra-ui/react";
import {RecoilLoadable} from "recoil";
import loading = RecoilLoadable.loading;

type CommentInputProps = {
    commentText: string;
    setCommentText: (value: string) => void;
    user: User;
    createLoading: boolean;
    onCreateComment: (commentText: string) => void;
}

const CommentInput: React.FC<CommentInputProps> = ({
    onCreateComment,
    setCommentText,
    commentText,
    createLoading,
    user
}) => {
    return (
        <Flex direction="column" position="relative">
            {user ? (
                <>
                    <Text mb={1} color='gray.600'>
                        Comment as{" "}
                        <span style={{color: "#3182CE"}}>
                            {user?.displayName == null ? user.email?.split("@")[0] : user.displayName}
                        </span>
                    </Text>
                    <Textarea
                        value={commentText}
                        onChange={(event) => setCommentText(event.target.value)}
                        placeholder="Viết bình luận..."
                        fontSize="10pt"
                        borderRadius={4}
                        minHeight="130px"
                        pb={10}
                        _placeholder={{color: "gray.500"}}
                        _focus={{
                            outline: "none",
                            bg: "white",
                            border: "1px solid black",
                        }}
                    />
                    <Flex
                        left="1px"
                        right={0.1}
                        bottom="1px"
                        justify="flex-end"
                        bg="gray.100"
                        p="6px 8px"
                        borderRadius="0px 0px 4px 4px"
                    >
                        <Button
                            height="26px"
                            disabled={!commentText.length}
                            isLoading={createLoading}
                            onClick={() => onCreateComment(commentText)}
                        >
                            Đăng
                        </Button>
                    </Flex>
                </>
            ) : (
                <Flex
                    align="center"
                    justify="space-between"
                    borderRadius={2}
                    border="1px solid"
                    borderColor="gray.100"
                    p={4}
                >
                    <Text fontWeight={600}>Đăng nhập hoặc đăng kí để bình luận</Text>
                    <AuthButtons/>
                </Flex>
            )}
        </Flex>
    );
}

export default CommentInput;