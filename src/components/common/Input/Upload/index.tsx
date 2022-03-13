import request from 'api/request'
import Button from 'components/common/Button'
import { ReactElement } from 'react'

import './index.scss'

export interface UploadInterface {
  render?: () => ReactElement
  showIcon?: boolean
  text?: string
  accept?: string
  onChange?: (files: FileList | string) => void
  uploadPath?: string
  loading?: boolean
}

const Upload = ({
  render = () => <></>,
  showIcon = true,
  text = '上传',
  accept = '',
  loading = false,
  uploadPath = '',
  onChange = () => {}
}: UploadInterface) => {
  const getFile = async (files: FileList) => {
    if (!uploadPath) return onChange(files!)

    const formData = new FormData()

    formData.append('file', files[0])

    const { result } = await request(uploadPath, 'POST', formData)

    onChange(result.file!)
  }

  return (
    <div className='upload'>
      <label form='file'>
        {typeof render().type !== 'symbol' ? (
          render()
        ) : (
          <Button text={text} loading={loading} />
        )}

        <input
          onChange={({ target }) => getFile(target.files || new FileList())}
          name='file'
          type='file'
          accept={accept}
          style={{ display: 'none' }}
        />
      </label>
    </div>
  )
}

export default Upload
