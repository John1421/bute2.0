import Link from "next/link"

const NavBar = () => {
  return (
    <nav className="flex flex-row items-center justify-between p-4 w-full h-[8vh] bg-surface-600 dark:bg-surface-dark-100 shadow-md text-primary-100 dark:text-primary-300">
        <Link href="/songs">
          <h1 className="font-extrabold text-3xl md:text-5xl">B</h1>
        </Link>
        <h1>Bute la cantar</h1>
    </nav>
  )
}

export default NavBar