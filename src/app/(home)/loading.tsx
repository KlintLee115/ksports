import Footer from "@/components/Footer";
import BannerItems from "@/components/store/home/banner/BannerItems";
import { getProducts } from "@/global/general";
import Image from 'next/image'

export default async function HomeSkel() {

  const products = await getProducts(undefined, undefined, undefined, undefined, "LOW_TO_HIGH")

  function DisplayItemsGrid() {
    return <div className="
        h-min sm:mt-[10vh] items-start
        grid grid-cols-1 sm:grid-cols-2 sm:top-[15vh] lg:grid-cols-3 xl:grid-cols-4
        " style={{ gridRowGap: "12vh", gridColumnGap: "7%" }}>

      {Array.from(products.keys()).map(id => {

        const { itemName, price, imageSrc, authorLink, authorName, imageCredit } = products.get(id)!!;
        const quantity = 0

        return (
          <div key={id} className="sm:w-auto sm:flex sm:flex-col sm:justify-end mx-auto flex-grow">
            <div className="relative min-h-[30vh]">
              <Image quality={50} fill={true} sizes="100%" alt="product" src={`/products${imageSrc}`} />
            </div>
            <h4 className="mx-0 my-[2vh]">{itemName}</h4>

            <div className="flex justify-between items-center">
              <h5 className="m-0">${price}</h5>

              <div className="flex min-w-min max-w-[50%] justify-evenly items-center">

                <h2 className="m-0 cursor-pointer">-</h2>
                <input className="w-1/2 text-center" type="number" value={quantity}></input>
                <h2 className="m-0 cursor-pointer">+</h2>
              </div>

            </div>
            <div className="flex justify-between items-center">
              <h6 className="m-0">Image by: <a href={authorLink} style={{ textDecoration: "none", color: "rgb(0, 0, 238)" }}>{authorName}</a></h6>
              <a href={imageCredit} style={{ fontSize: "0.67em", fontWeight: "bold", textDecoration: "none", color: "rgb(0, 0, 238)" }}>Image source</a>
            </div>
          </div>
        )

      })}

    </div>
  }

  return <div className='relative z-10 mx-6'>
    <nav className="flex justify-between items-center py-4 px-0">
      <button className="bg-none border-none">
        <img className="navIcons" width={500} height={500} alt="menu-button" src={'/icons/hamburger.png'} /></button>
      <h3 className="cursor-pointer bg-blue-600 absolute left-1/2 px-4 py-2 text-white transform -translate-x-1/2">K Sports</h3>

      <div className="flex items-center" style={{ gap: "2vw" }}>
        <img alt='cart' className="navIcons" src='/icons/cart.png' />
      </div>

    </nav>

    <div className="flex sticky top-0 z-[1] px-[1rem] py-[0.5rem]"
      style={{
        borderRadius: "1rem",
        backgroundColor: "#F3F5F5"
      }}>
      <label>
        <img width={300} height={400} alt="search-icon" style={{ width: "1.5rem", aspectRatio: "1/1", height: "100%" }}
          src="/icons/search.png" /></label>
      <input
        style={{
          marginLeft: "1rem", fontSize: "1.1rem",
          outline: "none",
          border: "none",
          width: "100%",
          backgroundColor: "#F3F5F5"
        }} type="text" placeholder='Search for a product or a sport' />
    </div>

    <div className="overflow-hidden whitespace-nowrap mt-[2vh] h-[20vh] ssm:h-[25vh] sm:h-[35vh] md:h-[40vh]">
      <div
        className="inline-block h-full w-full my-0 mx-auto transition-transform duration-500 ease-in-out transform">
        <div className=":w-[90%] ssm:w-[80%] sm:w-[70%] lg:w-[60%] xl:w-[50%] h-full mx-auto relative">
          {BannerItems[0]}
          <div className="items-center flex absolute top-0 left-0 h-full max-w-[10%] text-7xl ssm:text-8xl">
            <h4></h4>
          </div>
          <div className="items-center flex absolute top-0 right-0 h-full max-w-[10%] text-7xl ssm:text-8xl">
            <h4 style={{ display: "block", cursor: "pointer" }}>&#8250;</h4>
          </div>
        </div>
      </div>
    </div>

    <DisplayItemsGrid />

    <Footer />
  </div>
}

