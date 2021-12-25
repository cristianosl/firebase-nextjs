import { CardCoa } from '../../components/CardCoa'
import { useAppSelector, useAppDispatch } from '../../store/hooks'
import { shallowEqual } from 'react-redux';
import { createQueue, updateQueuePosition, updateQueue, updateQueueStatusToReady, updateQueueStatusToInCall, updateQueueStatusToDone } from '../../store/queue';
import { IQueuePosition } from '../../types/QueuePosition';


const QueuePositions: React.FC = () => {
  const dispatch = useAppDispatch()

  const cardCoa = useAppSelector(state => state.queue, shallowEqual)

  return (
    <>
      <h3>Queue Position Card</h3>
      <div className='row pb-3'>
        <div className="col">
          <CardCoa {...cardCoa} />
        </div>
      </div>

      <div className="d-flex flex-row justify-content-between">
        <button
          className='btn btn-secondary'
          onClick={() => {
            const enqueued: IQueuePosition = {
              id: "84182",
              position: "10",
              status: "ENQUEUED",
              updatedAt: "2021-12-21T14:09:10.030Z",
              attendanceId: null
            }
            dispatch(createQueue(enqueued))
          }}
        >
          CREATE QUEUE
        </button>
        <button
          className='btn btn-secondary'
          onClick={() => {
            dispatch(updateQueue({
              id: "84182",
              position: "8",
              status: "ENQUEUED",
              updatedAt: "2021-12-21T14:02:10.030Z",
              attendanceId: null
            }))
          }}
        >
          UPDATE QUEUE
        </button>
        <button
          className='btn btn-secondary'
          onClick={() => {
            dispatch(updateQueuePosition({
              position: "1",
              updatedAt: "2021-12-21T14:09:19.030Z"
            }))
          }}
        >
          UPDATE POSITION [ENQUEUED]
        </button>
        <button
          className='btn btn-secondary'
          onClick={() => {
            dispatch(updateQueueStatusToReady({ attendanceId: "147608", updatedAt: "2021-12-21T14:09:31.135Z" }))
          }}
        >
          [READY]
        </button>
        <button
          className='btn btn-secondary'
          onClick={() => {
            dispatch(updateQueueStatusToInCall({ attendanceId: "147608", updatedAt: "2021-12-21T14:10:08.438Z" }))
          }}
        >
          [IN_CALL]
        </button>
        <button
          className='btn btn-secondary'
          onClick={() => {
            dispatch(updateQueueStatusToDone({ attendanceId: "147608", updatedAt: "2021-12-21T14:10:34.968Z" }))
          }}
        >
          [DONE]
        </button>
      </div>
    </>
  )
}

export default QueuePositions