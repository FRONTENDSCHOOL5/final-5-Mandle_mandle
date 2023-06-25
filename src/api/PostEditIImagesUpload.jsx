import axios from 'axios';

export async function PostEditIImagesUpload(file) {
  const url = 'https://api.mandarin.weniv.co.kr/';

  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await axios.post(url + 'image/uploadfile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // 응답 처리
    console.log('이미지 성공');
    return `https://api.mandarin.weniv.co.kr/${response.data.filename}`;
  } catch (error) {
    // 오류 처리
    console.error(error);
    throw error;
  }
}
