import classNames from 'classnames/bind'
import styles from './CompanyForm.module.scss'
import { FormProvider, useForm } from 'react-hook-form'
import { CompanyFormInput } from '@shared/types'
import FieldLabel from '@ui/shared/input/FieldLabel/FieldLabel'
import TextFieldConnect from '@ui/shared/form-field/TextFieldConnect'
import Button from '@ui/shared/button/Button'

const cx = classNames.bind(styles)

type CompanyFormProps = {
  onSubmit: (data: CompanyFormInput) => void
  onCancel: () => void
  defaultValues?: CompanyFormInput
}

const CompanyForm = ({ onSubmit, onCancel, defaultValues }: CompanyFormProps) => {
  const methods = useForm<CompanyFormInput>({ defaultValues })
  const { handleSubmit } = methods

  return (
    <FormProvider {...methods}>
      <form className={cx('container')} onSubmit={handleSubmit(onSubmit)}>
        <div className={cx('inputs')}>
          <div>
            <FieldLabel label='기업명' required />
            <TextFieldConnect
              name='companyName'
              placeholder='기업명을 입력해 주세요'
              rules={{
                validate: value => value.trim() !== '' || '필수 입력사항입니다.',
              }}
            />
          </div>
          <div>
            <FieldLabel label='기업코드' required />
            <TextFieldConnect
              name='companyCode'
              placeholder='기업 코드를 입력해 주세요'
              rules={{
                validate: value => value.trim() !== '' || '필수 입력사항입니다.',
              }}
            />
          </div>
        </div>
        <div className={cx('buttonContainer')}>
          <Button onClick={onCancel} type='button' size='small' theme='gray'>취소</Button>
          <Button type='submit' size='small' theme='red'>{defaultValues ? '수정' : '등록'}</Button>
        </div>
      </form>
    </FormProvider>
  )
}

export default CompanyForm
