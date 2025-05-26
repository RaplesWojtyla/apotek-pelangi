import React from 'react'

const NavbarKasir = () => {
  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-3 bg-white shadow">
        <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <img
                src="/logo.png"
                alt="Logo"
                className="h-8 w-8"
              />
              <span className="text-xl font-bold text-orange-500">
                Apotek<span className="text-cyan-500">Pelangi</span>
              </span>
            </div>
        </div>
      </header>
      <div className="pt-12">
      </div>
    </>)
}

export default NavbarKasir