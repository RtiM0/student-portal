export default function Header({ onClick }) {

    return <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <nav className="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
                {/* <a className="mr-5 hover:text-gray-900">First Link</a>
            <a className="mr-5 hover:text-gray-900">Second Link</a>
            <a className="mr-5 hover:text-gray-900">Third Link</a>
            <a className="hover:text-gray-900">Fourth Link</a> */}
            </nav>
            <button className="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
                <span className="ml-3 text-xl">Student Portal</span>
            </button>
            <div className="lg:w-2/5 inline-flex lg:justify-end ml-5 lg:ml-0">
                <button onClick={() => onClick()} className="py-2 px-4 border border-transparent text-sm font-medium rounded-md bg-white text-blue-900 hover:bg-blue-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Sign Out
                </button>
            </div>
        </div>
    </header>
}