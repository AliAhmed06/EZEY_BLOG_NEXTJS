import React from 'react'

import ServiceItem from './ServiceItem';



const servicesData = [
    {
      img: "https://www.themealdb.com/images/category/beef.png",
      title: "Professonal Kitchen",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, odio.",
    },
    {
      img: "https://www.themealdb.com/images/category/chicken.png",
      title: "Delivery",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, odio.",
    },
    {
      img: "https://www.themealdb.com/images/category/dessert.png",
      title: "Wine List",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, odio.",
    },
    {
      img: "https://www.themealdb.com/images/category/lamb.png",
      title: "Free Wifi",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, odio.",
    },
  ];


const MominaPage = () => {
  return (
    <div className='grid grid-cols-4 px-[100px] gap-5'>
        <ServiceItem 
            image={"https://www.themealdb.com/images/category/beef.png"} 
            title={"Delivery"} 
            desc={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, odio."} 
        />
        <ServiceItem 
            image={"https://www.themealdb.com/images/category/beef.png"} 
            title={"Delivery"} 
            desc={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, odio."} 
        />
        <ServiceItem 
            image={"https://www.themealdb.com/images/category/beef.png"} 
            title={"Delivery"} 
            desc={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, odio."} 
        />
        <ServiceItem 
            image={"https://www.themealdb.com/images/category/beef.png"} 
            title={"Delivery"} 
            desc={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, odio."} 
        />
    </div>
  )
}

export default MominaPage