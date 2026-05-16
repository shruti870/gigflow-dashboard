const LeadsTableSkeleton = () => {
  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
      <div className="animate-pulse">
        {/* HEADER */}
        <div className="bg-gray-100 p-5 grid grid-cols-5 gap-4">
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
        </div>

        {/* ROWS */}
        {Array.from({ length: 5 }).map(
          (_, i) => (
            <div
              key={i}
              className="grid grid-cols-5 gap-4 p-5 border-t"
            >
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default LeadsTableSkeleton;