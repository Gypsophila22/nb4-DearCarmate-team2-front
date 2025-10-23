import { ContractStatus, ContractType } from '@shared/types'
import { format, isAfter, parseISO } from 'date-fns'
import { ko } from 'date-fns/locale'

const formatDateField = (status: ContractStatus, resolutionDate: ContractType['resolutionDate'], meetings: ContractType['meetings']) => {
  const formatDate = (dateString: string) => {
    const date = parseISO(dateString)
    return format(date, 'yyyy년 MM월 dd일 HH시', { locale: ko })
  }

  let label = ''
  let value = ''
  switch (status) {
    case ContractStatus.contractSuccessful:
      label = '계약 체결일'
      value = resolutionDate ? formatDate(resolutionDate) : '-'
      break
    case ContractStatus.contractFailed:
      label = '계약 종료일'
      value = resolutionDate ? formatDate(resolutionDate) : '-'
      break
    default:
      label = '미팅 일정'
      if (meetings.length > 0) {
        const now = new Date()
        const sortedMeetings = meetings.sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime())
        const futureMeeting = sortedMeetings.find(meeting => isAfter(parseISO(meeting.date), now))
        const meetingToFormat = futureMeeting ? futureMeeting : sortedMeetings[sortedMeetings.length - 1]
        value = formatDate(meetingToFormat.date)
      } else {
        value = '-'
      }
  }

  return `${label} : ${value}`
}

export default formatDateField
