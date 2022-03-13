export interface RightInterface {
  className: string
}

const Right = ({ className }: RightInterface) => {
  return (
    <div>
      <div className={className}>123</div>
    </div>
  )
}

export default Right
