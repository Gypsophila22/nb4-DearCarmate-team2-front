import classNames from 'classnames/bind'
import styles from './ContractForm.module.scss'
import { FormProvider, useForm } from 'react-hook-form'
import { ContractFormInput, Meeting } from '@shared/types'
import FieldLabel from '@ui/shared/input/FieldLabel/FieldLabel'
import DropdownConncet from '@ui/shared/form-field/DropdownConncet'
import Button from '@ui/shared/button/Button'
import useCarsForContract from '../data-access-items-for-contract/useCarsForContract'
import useCustomersForContract from '../data-access-items-for-contract/useCustomersForContract'
import MeetingsConnect from '@ui/shared/form-field/MeetingsConnect/MeetingsConnect'
import { v4 as uuidv4 } from 'uuid'
import useUsersForContract from '../data-access-items-for-contract/useUsersForContract'

const cx = classNames.bind(styles)

type ContractFormProps = {
  onSubmit: (data: ContractFormInput) => void
  onCancel: () => void
  defaultValues?: Omit<ContractFormInput, 'meetings'> & { meetings: Omit<Meeting, 'id'>[] }
}

const ContractForm = ({ onSubmit, onCancel, defaultValues }: ContractFormProps) => {
  const methods = useForm<ContractFormInput>({
    defaultValues: {
      ...defaultValues,
      meetings: defaultValues?.meetings.map(meeting => ({ ...meeting, id: uuidv4() })) ?? [],
    },
  })
  const { handleSubmit } = methods

  const { data: carsForContractData = [] } = useCarsForContract(defaultValues?.carId)
  const { data: customersForContractData = [] } = useCustomersForContract()
  const { data: usersForContractData = [] } = useUsersForContract()

  return (
    <FormProvider {...methods}>
      <form className={cx('container')} onSubmit={handleSubmit(onSubmit)}>
        <div className={cx('inputs')}>
          <div>
            <FieldLabel label='차량 선택' required />
            <DropdownConncet
              name='carId'
              filters={carsForContractData.map(({ id, data }) => ({ text: data, data: id }))}
              label='차량 선택'
              rules={{
                required: '필수 입력사항입니다.',
              }}
              hasSearch
              searchInputPlaceholder='차량을 검색해주세요'
            />
          </div>
          <div>
            <FieldLabel label='고객 선택' required />
            <DropdownConncet
              name='customerId'
              filters={customersForContractData.map(({ id, data }) => ({ text: data, data: id }))}
              label='고객 선택'
              rules={{
                required: '필수 입력사항입니다.',
              }}
              hasSearch
              searchInputPlaceholder='고객을 검색해주세요'
            />
          </div>
          {defaultValues && (
            <div>
              <FieldLabel label='담당자 변경' required />
              <DropdownConncet
                name='userId'
                filters={usersForContractData.map(({ id, data }) => ({ text: data, data: id }))}
                label='담당자 선택'
                rules={{
                  required: '필수 입력사항입니다.',
                }}
                hasSearch
                searchInputPlaceholder='담당자를 검색해주세요'
              />
            </div>
          )}
          <div>
            <FieldLabel label='미팅 일정' />
            <MeetingsConnect />
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

export default ContractForm
