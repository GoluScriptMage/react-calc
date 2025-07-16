import Header from './Header'

/**
 * Main layout component that wraps all pages
 * @param {ReactNode} children - Page content
 */
const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="relative">
        {children}
      </main>
    </div>
  )
}

export default Layout
