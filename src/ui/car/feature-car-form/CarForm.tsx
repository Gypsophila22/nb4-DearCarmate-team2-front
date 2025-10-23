import classNames from 'classnames/bind'
import styles from './CarForm.module.scss'
import { Controller, FormProvider, useForm, useWatch } from 'react-hook-form'
import { CarFormInput } from '@shared/types'
import FieldLabel from '@ui/shared/input/FieldLabel/FieldLabel'
import TextFieldConnect from '@ui/shared/form-field/TextFieldConnect'
import DropdownConncet from '@ui/shared/form-field/DropdownConncet'
import { CAR_MANUFACTURING_YEAR_FILTERS } from '@ui/shared/dropdown/constants'
import TextAreaConnect from '@ui/shared/form-field/TextAreaConnect'
import Button from '@ui/shared/button/Button'
import useCarModels from '../data-access-car-models/useCarModels'
import { useEffect, useRef } from 'react'
import TextField from '@ui/shared/input/TextField/TextField'

const cx = classNames.bind(styles)

type CarFormProps = {
  onSubmit: (data: CarFormInput) => void
  onCancel: () => void
  defaultValues?: CarFormInput
}

const CarForm = ({ onSubmit, onCancel, defaultValues }: CarFormProps) => {
  const methods = useForm<CarFormInput>({ defaultValues })
  const { setValue, handleSubmit } = methods

  const { data: carModelsData = [] } = useCarModels()
  const selectedManufacturer = useWatch({ control: methods.control, name: 'manufacturer' })
  const prevManufacturerRef = useRef(defaultValues?.manufacturer)
  const carModel = carModelsData.find(({ manufacturer }) => manufacturer === selectedManufacturer)?.model ?? []

  useEffect(() => {
    const prevManufacturer = prevManufacturerRef.current
    if (prevManufacturer !== selectedManufacturer) {
      setValue('model', '')
    }
    prevManufacturerRef.current = selectedManufacturer
  }, [selectedManufacturer, setValue])

  return (
    <FormProvider {...methods}>
      <form className={cx('container')} onSubmit={handleSubmit(onSubmit)}>
        <div className={cx('inputs')}>
          <div>
            <FieldLabel label='차량 번호' required />
            <TextFieldConnect
              name='carNumber'
              placeholder='차량 번호를 입력해 주세요'
              rules={{
                validate: value => value.trim() !== '' || '필수 입력사항입니다.',
                maxLength: { value: 20, message: '20자 이내로 입력해 주세요' },
              }}
            />
          </div>
          <div className={cx('halfWidthInputs')}>
            <div>
              <FieldLabel label='제조사' required />
              <DropdownConncet
                name='manufacturer'
                filters={carModelsData.map(({ manufacturer }) => ({ text: manufacturer, data: manufacturer }))}
                label='제조사 선택'
                rules={{
                  required: '필수 입력사항입니다.',
                }}
              />
            </div>
            <div>
              <FieldLabel label='차종' required />
              <DropdownConncet
                name='model'
                filters={carModel.map((model) => ({ text: model, data: model }))}
                label='차종 선택'
                rules={{
                  required: '필수 입력사항입니다.',
                }}
              />
            </div>
          </div>
          <div>
            <FieldLabel label='제조연도(년)' required />
            <DropdownConncet
              name='manufacturingYear'
              filters={CAR_MANUFACTURING_YEAR_FILTERS}
              label='제조연도(년) 선택'
              rules={{
                required: '필수 입력사항입니다.',
              }}
            />
          </div>
          <div className={cx('halfWidthInputs')}>
            <div>
              <FieldLabel label='주행거리(km)' required />
              <Controller
                name='mileage'
                defaultValue=""
                rules={{
                  required: '필수 입력사항입니다.',
                  validate: value => parseInt(value, 10) >= 0 || '유효하지 않은 값입니다.',
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    type='number'
                    placeholder='주행거리를 입력해 주세요'
                    onChange={(e) => {
                      const value = parseInt(e.target.value, 10)
                      setValue('mileage', isNaN(value) ? 0 : value)
                    }}
                    error={Boolean(fieldState.error)}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </div>
            <div>
              <FieldLabel label='가격(원)' required />
              <Controller
                name='price'
                defaultValue=""
                rules={{
                  required: '필수 입력사항입니다.',
                  validate: value => parseInt(value, 10) >= 0 || '유효하지 않은 값입니다.',
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    type='number'
                    placeholder='가격을 입력해 주세요'
                    onChange={(e) => {
                      const value = parseInt(e.target.value, 10)
                      setValue('price', isNaN(value) ? 0 : value)
                    }}
                    error={Boolean(fieldState.error)}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </div>
          </div>
          <div>
            <FieldLabel label='사고횟수(회)' required />
            <Controller
              name='accidentCount'
              defaultValue=""
              rules={{
                required: '필수 입력사항입니다.',
                validate: value => parseInt(value, 10) >= 0 || '유효하지 않은 값입니다.',
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  type='number'
                  placeholder='사고 횟수를 입력해 주세요'
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10)
                    setValue('accidentCount', isNaN(value) ? 0 : value)
                  }}
                  error={Boolean(fieldState.error)}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </div>
          <div>
            <FieldLabel label='차량 설명' />
            <TextAreaConnect
              name='explanation'
              placeholder='차량 설명 내용을 입력해 주세요'
            />
          </div>
          <div>
            <FieldLabel label='사고상세' />
            <TextFieldConnect
              name='accidentDetails'
              placeholder='사고상세 내용을 입력해 주세요'
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

export default CarForm
