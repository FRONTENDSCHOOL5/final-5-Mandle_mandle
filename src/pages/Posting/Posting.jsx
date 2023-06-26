import React, { useState, useEffect, useRef } from 'react';

import styled from 'styled-components';

import {
  DisabledUploadBtnNav,
  ProfileContainer,
  ProfileImage,
  FileUploadButton,
  ImgWrapStyle,
  PreviewImgWrapStyle,
  DeleteImgBtn,
  PostFormStyle,
} from './PostingStyle';
import { useRecoilValue } from 'recoil';
import { UserAtom } from '../../Store/userInfoAtoms';
import { PostImagesUpload } from '../../api/PostImagesUpload';
import { useNavigate } from 'react-router-dom';
import PostUploadPost from '../../api/PostUploadPost';
import { GetUserProfileImage } from '../../api/GetUserProfileImage';
import ImageHandleHook from '../../Hooks/ImageHandleHook';
import useTextareaResize from '../../Hooks/useTextareaResizeHook';
export default function Posting() {
  const [inputValue, setInputValue] = useState('');
  const [buttonStyle, setButtonStyle] = useState(false);
  const [userImage, setUserImage] = useState('');

  const userInfo = useRecoilValue(UserAtom);
  const token = userInfo.token;

  const navigate = useNavigate();
  console.log(token);

  useEffect(() => {
    GetUserProfileImage(token, setUserImage);
  }, [token]);

  const {
    selectedImages,
    setSelectedImages,
    handleImageChange,
    handleDeleteImage,
  } = ImageHandleHook();

  const { textarea, handleTextareaChange } = useTextareaResize(
    inputValue,
    setInputValue
  );

  useEffect(() => {
    if (inputValue || selectedImages.length > 0) {
      setButtonStyle(true);
    } else {
      setButtonStyle(false);
    }
  }, [inputValue, selectedImages]);

  const handleUploadPost = async () => {
    const images = await PostImagesUpload(selectedImages);

    const response = await PostUploadPost(token, inputValue, images);
    console.log(response);
    if (response) {
      setInputValue('');
      setSelectedImages([]);
      navigate(`/post/${response.post.id}`, {
        state: response.post.id,
      });
    }
  };

  return (
    <div>
      <DisabledUploadBtnNav
        handleUploadPost={handleUploadPost}
        buttonStyle={buttonStyle}
      />
      <ProfileContainer>
        <ProfileImage src={userImage} alt='User Profile Image' />
        <FileUploadButton handleImageChange={handleImageChange} />
      </ProfileContainer>
      <PostFormStyle>
        <TextInputContainer
          placeholder='게시글 입력...'
          onChange={handleTextareaChange}
          ref={textarea}
        ></TextInputContainer>
        <ImgWrapStyle>
          {selectedImages.map((image, index) => (
            <PreviewImgWrapStyle key={index}>
              <ImagePreview
                src={URL.createObjectURL(image)}
                alt={`게시글 이미지 ${index + 1}`}
              />
              <DeleteImgBtn
                onClick={() => handleDeleteImage(index)}
                type='button'
              />
            </PreviewImgWrapStyle>
          ))}
        </ImgWrapStyle>
        {/* <FileUploadButton handleImageChange={handleImageChange} /> */}
      </PostFormStyle>
    </div>
  );
}

export const ImagePreview = styled.img`
  width: 304px;
  border-radius: 20px;
  max-height: 228px;
  object-fit: cover;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
  top: 20px;
  left: 50px;
`;

export const TextInputContainer = styled.textarea`
  margin: 30px 0 50px 0;
  width: 100%;
  overflow-y: hidden;
  display: block;
  /* min-height: 80px; */
  height: 100%;
  padding-left: 71px;
  resize: none;
  outline: none;
  border: none;
`;
