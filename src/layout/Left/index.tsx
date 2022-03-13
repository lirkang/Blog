export interface LeftInterface {
  className: string
}

const Left = ({ className }: LeftInterface) => {
  return (
    <div>
      <div className={className}></div>
    </div>
  )
}

export default Left
