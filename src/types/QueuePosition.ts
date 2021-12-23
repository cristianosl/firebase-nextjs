export type QueueStatus = 'ENQUEUED' | 'READY' | 'IN_CALL' | 'DONE'

export type IQueuePosition = {
  id: string
  status: QueueStatus
  position: string | null
  updatedAt: string
  attendanceId: string | null
}