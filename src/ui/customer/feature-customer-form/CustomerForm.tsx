import classNames from 'classnames/bind'
import styles from './CustomerForm.module.scss'
import { FormProvider, useForm } from 'react-hook-form'
import { AgeGroup, CustomerFormInput, Region } from '@shared/types'
import FieldLabel from '@ui/shared/input/FieldLabel/FieldLabel'
import TextFieldConnect from '@ui/shared/form-field/TextFieldConnect'
import DropdownConncet from '@ui/shared/form-field/DropdownConncet'
import TextAreaConnect from '@ui/shared/form-field/TextAreaConnect'
import Button from '@ui/shared/button/Button'
import { EMAIL_VALIDATION_REGEXP, PHONE_NUMBER_VALIDATION_REGEXP } from '@ui/shared/util-constants/constants'
import RadioConnect from '@ui/shared/form-field/RadioConnect'
import { GENDER_OPTIONS } from '@ui/shared/input/RadioGroup/constants'

const cx = classNames.bind(styles)

type CustomerFormProps = {
  onSubmit: (data: CustomerFormInput) => void
  onCancel: () => void
  defaultValues?: CustomerFormInput
}

const CustomerForm = ({ onSubmit, onCancel, defaultValues }: CustomerFormProps) => {
  const methods = useForm<CustomerFormInput>({ defaultValues: { ageGroup: null, region: null, ...defaultValues } })
  const { handleSubmit } = methods

  return (
    <FormProvider {...methods}>
      <form className={cx('container')} onSubmit={handleSubmit(onSubmit)}>
        <div className={cx('inputs')}>
          <div>
            <FieldLabel label='고객명' required />
            <TextFieldConnect
              name='name'
              placeholder='고객명을 입력해 주세요'
              rules={{
                validate: value => value.trim() !== '' || '필수 입력사항입니다.',
                maxLength: { value: 10, message: '10자 이내로 입력해 주세요' },
              }}
            />
          </div>
          <div className={cx('radioField')}>
            <FieldLabel label='성별' required />
            <RadioConnect
              name='gender'
              options={GENDER_OPTIONS}
            />
          </div>
          <div>
            <FieldLabel label='연락처' required />
            <TextFieldConnect
              name='phoneNumber'
              placeholder='연락처를 입력해 주세요'
              rules={{
                validate: value => value.trim() !== '' || '필수 입력사항입니다.',
                pattern: {
                  value: PHONE_NUMBER_VALIDATION_REGEXP,
                  message: '전화번호 형식에 맞지 않습니다(하이픈 포함 필요)',
                },
              }}
            />
          </div>
          <div className={cx('halfWidthInputs')}>
            <div>
              <FieldLabel label='연령대' />
              <DropdownConncet
                name='ageGroup'
                filters={Object.values(AgeGroup).map((ageGroup) => ({ data: ageGroup, text: ageGroup }))}
                label='연령대 선택'
              />
            </div>
            <div>
              <FieldLabel label='지역' />
              <DropdownConncet
                name='region'
                filters={Object.values(Region).map((region) => ({ data: region, text: region }))}
                label='지역 선택'
              />
            </div>
          </div>
          <div>
            <FieldLabel label='이메일' required />
            <TextFieldConnect
              name='email'
              placeholder='이메일을 입력해 주세요'
              rules={{
                required: '필수 입력사항입니다',
                pattern: {
                  value: EMAIL_VALIDATION_REGEXP,
                  message: '이메일 형식에 맞지 않습니다',
                },
              }}
            />
          </div>
          <div>
            <FieldLabel label='메모' />
            <TextAreaConnect
              name='memo'
              placeholder='메모 사항을 입력해 주세요'
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

export default CustomerForm
