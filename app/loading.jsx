'use client'
import ClipLoader from "react-spinners/ClipLoader";

const LoadingPage= ({loading}) => {
  const override={
    display:'block',
    margin:'100px auto'
  }
    return (
    <ClipLoader
    color='#a21caf'
    loading={loading}
    cssOverride={override}
    size={150}
    aria-label="Loading Spinner"
    data-testid="loader"
  />
  )
}

export default LoadingPage