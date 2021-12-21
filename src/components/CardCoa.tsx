export type QueueStatus = 'ENQUEUED' | 'READY' | 'IN_CALL' | 'DONE'

export type CardCoaProps = {
  id: string
  status: QueueStatus
  position: string | null
  updatedAt: string
  attendanceId: string | null
}

export const CardCoaEnqueued = ({ position }: CardCoaProps) => (<>Você é o {position}º da fila</>)
export const CardCoaReady = (props: CardCoaProps) => (<>Você é o próximo </>)
export const CardCoaInCall = (props: CardCoaProps) => (<>Você está em consulta</>)

export const CardCoa = (props: CardCoaProps) => {
  const { status } = props
  const components: {
    [Property in Exclude<QueueStatus, 'DONE'>]: React.FC<CardCoaProps>
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
