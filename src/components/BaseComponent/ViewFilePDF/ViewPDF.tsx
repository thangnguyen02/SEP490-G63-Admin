type IProps = {
    src: any
  }
  const ViewPDF = ({ src }: IProps) => {
    return <iframe src={src} width='100%' height='100%' />
  }
  export default ViewPDF
  