import Icon from '@ui/shared/icon/Icon'
import useConfirmDeleteModal from '@ui/shared/modal/confirm-delete-modal/useConfirmDeleteModal'
import useDeleteUser from '../data-access-user-form/useDeleteUser'

type UserOptionButtonProps = {
  userId: number
  name: string
}

const UserOptionButton = ({ userId, name }: UserOptionButtonProps) => {
  const { openConfirmDeleteModal } = useConfirmDeleteModal()
  const { mutate: deleteUser } = useDeleteUser()

  return (
    <button
      onClick={() => {
        openConfirmDeleteModal({
          deleteType: '유저',
          itemName: `${name} 유저`,
          onSubmit: () => deleteUser(userId),
        })
      }}
    >
      <Icon name='delete' width={24} height={24} />
    </button>
  )
}

export default UserOptionButton
