export const Logo = () => {
    return(
        <div className="w-full lg:w-1/2 bg-cyan-100 lg:bg-white flex items-center justify-center p-6">
        <div className="text-center">
          <img
            src="/logo.png"
            alt="Logo"
            className="mx-auto w-20 sm:w-30 md:w-40 lg:w-70 mb-6"
          />
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
            <span className="text-cyan-500">Apotek</span>
            <span className="text-orange-500">Pelangi</span>
          </h1>
        </div>
      </div>
    )
}