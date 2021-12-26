/* eslint-disable unused-imports/no-unused-vars */
import { IQueuePosition, QueueStatus } from "../../types/QueuePosition"

export const CardCoaEnqueued = ({ position }: IQueuePosition) => (<>Você é o {position}º da fila</>)
export const CardCoaReady = (props: IQueuePosition) => (<>Você é o próximo </>)
export const CardCoaInCall = (props: IQueuePosition) => (<>Você está em consulta</>)

export const CardCoa = (props: IQueuePosition) => {
  const { status } = props
  const components: {
    [Property in Exclude<QueueStatus, 'DONE'>]: React.FC<IQueuePosition>
  } = {
    ENQUEUED: CardCoaEnqueued,
    READY: CardCoaReady,
    IN_CALL: CardCoaInCall
  }
  if (status != 'DONE') {
    const CurrentComponent = components[status]
    return (<div className="card">
      <div className="card-body">
        <CurrentComponent {...props} />
      </div>
    </div>)
  }
  return null
}
