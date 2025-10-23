import { uploadImage as uploadImageAPI } from '@shared/api'

const SIZE_LIMIT_MB = 5
const BYTES_IN_MEGABYTES = 1024 * 1024

const uploadImage = async (file: File) => {
  if (file.size > SIZE_LIMIT_MB * BYTES_IN_MEGABYTES) {
    alert('파일 사이즈가 너무 큽니다. 5MB 이하의 파일을 업로드해주세요.')
    return
  }
  const response = await uploadImageAPI(file)
  return response.imageUrl
}

export default uploadImage
