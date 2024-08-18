import Link from "next/link"

const NavBar = () => {
  return (
    <nav className="flex flex-row items-center justify-between p-4 w-full h-16 bg-bg-strong shadow-md">
        <Link href="/">
          <h1 className="text-primary font-extrabold text-3xl md:text-5xl">B</h1>
        </Link>
        <h1>Bute la cantar</h1>
    </nav>
  )
}

export default NavBar