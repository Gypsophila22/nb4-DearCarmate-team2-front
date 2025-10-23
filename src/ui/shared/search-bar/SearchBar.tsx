import classNames from 'classnames/bind'
import styles from './SearchBar.module.scss'
import { Controller, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Dropdown from '@ui/shared/dropdown/Dropdown'
import useUpdateQueryURL from '@ui/shared/util-hook/useUpdateQueryURL'
import TextField from '../input/TextField/TextField'
import Icon from '../icon/Icon'

const cx = classNames.bind(styles)

type SearchBarProps<T> = {
  initialSearchBy: T
  initialKeyword: string
  searchByFilters: {
    data: T
    text: string
  }[]
  otherParams?: {
    name: string
    value: string | number
  }[]
}

const SearchBar = <T extends string>({ initialSearchBy, initialKeyword, searchByFilters, otherParams }: SearchBarProps<T>) => {
  const { control, handleSubmit, setValue } = useForm<{ keywordValue: string }>()
  const [searchByValue, setSearchByValue] = useState(initialSearchBy)
  const router = useRouter()
  const { updateQueryURL } = useUpdateQueryURL()

  const handleSearch = ({ keywordValue }: { keywordValue: string }) => {
    const updates: Record<string, string | number> = {
      'searchBy': searchByValue,
      'keyword': keywordValue,
    }
    if (otherParams) otherParams.forEach((param) => {
      updates[param.name] = param.value
    })

    router.push(
      updateQueryURL(updates),
      { scroll: false },
    )
  }

  useEffect(() => {
    setValue('keywordValue', initialKeyword)
  }, [initialKeyword, setValue])

  return (
    <form
      className={cx('container')}
      onSubmit={((e) => { handleSubmit(handleSearch)(e) })}
    >
      <div className={cx('dropdownWrapper')}>
        <Dropdown
          type='search'
          currentData={searchByValue}
          filters={searchByFilters}
          onSelect={(data) => { setSearchByValue(data) }}
        />
      </div>
      <div className={cx('inputWrapper')}>
        <Controller
          control={control}
          name='keywordValue'
          defaultValue={initialKeyword}
          render={({ field }) => (
            <TextField
              {...field}
              height='40px'
              leftIcon={(
                <button type='submit'>
                  <Icon name='search' width={16} height={16} />
                </button>
              )}
              placeholder='Search'
            />
          )}
        />
      </div>
    </form>
  )
}

export default SearchBar
