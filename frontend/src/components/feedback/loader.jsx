const Loader = ({ fullPage = false }) => {
  const containerClasses = fullPage 
    ? 'fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50'
    : 'flex justify-center items-center py-12'
  
  return (
    <div className={containerClasses}>
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
        <p className="mt-2 text-sm text-gray-600">Loading...</p>
      </div>
    </div>
  )
}

export default Loader