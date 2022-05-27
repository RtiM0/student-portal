export default function Landing({ onClick }) {
    return <section class="text-gray-600 body-font md:m-16">
        <div class="container mx-auto flex p-5 shadow rounded-md items-center justify-center flex-col bg-white">
            <img class="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded" alt="hero" src="https://dummyimage.com/720x600" />
            <div class="text-center lg:w-2/3 w-full">
                <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Serverless Student Portal</h1>
                <div class="flex justify-center">
                    <button onClick={() => onClick()} class="inline-flex text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg">Sign In</button>
                </div>
            </div>
        </div>
    </section>
}