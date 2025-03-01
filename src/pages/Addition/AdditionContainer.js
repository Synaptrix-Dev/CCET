import React, { useState } from 'react';
import logo from "../../assets/Logo.png";
import eraser from "../../assets/eraser.png";
import nq from "../../assets/next-question.png";

function AdditionContainer() {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const numbers = [
    ['١', '٠'],
    ['٣', '٢'],
    ['٥', '٤'],
    ['٧', '٦'],
    ['٩', '٨'],
    ['١١', '١٠'],
    ['١٣', '١٢'],
    ['١٥', '١٤'],
    ['١٧', '١٦'],
    ['١٩', '١٨'],
  ];
  return (
    <div>
      <header className="mt-8 w-full z-[99] transition-all duration-300 flex flex-wrap md:justify-start md:flex-nowrap text-gray-300">
        <nav className="relative bg-[#F5F5F5] h-10 max-w-8xl w-full md:flex md:items-center md:justify-between md:gap-3 mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between w-full text-black">
            <a
              href="/"
              className="flex-none font-semibold text-xl focus:outline-none focus:opacity-80"
            >
              <img src={logo} alt="logo" className="w-28" />
            </a>

            <div className="flex items-center justify-center  list-none space-x-8">
              <div className='flex'>
                <div className='bg-colPrime w-6 h-8 border-l-2 border-colSec'></div>
                <div className='bg-colPrime w-6 h-8 border-l-2 border-colSec'></div>
                <div className='bg-colPrime w-6 h-8 border-l-2 border-colSec'></div>
              </div>
              <li> Student Name :اسم الطالب</li>
              <li className='border-r-2 border-l-2 border-black px-4 '>اختبار العمليات الإساسية | الجمع</li>
              <li>اختبار فرز عسر الحساب</li>
            </div>
          </div>
        </nav>
      </header>

      <div className="max-w-8xl mx-auto mt-4 flex items-center justify-between">

        <div className='flex flex-col justify-between items-start'>
          <button><img src={eraser} alt="er" className='w-32' /></button>
        </div>

        <div className='w-1/2'>
          <div className='h-full w-full border-2 border-yellow-400 rounded-lg p-8 text-5xl font-semibold flex justify-center items-center'>
            {/* Question 1  */}
            {/* <div className='flex justify-center space-x-4 items-center'>
              <div className='h-16 w-16 border-2 border-black'></div>
              <div className='flex justify-center space-x-4 items-center h-full -mt-4'>
                <h1>=</h1>
                <h1>٥</h1>
                <h1>+</h1>
                <h1>٤</h1>
              </div>
            </div> */}

            {/* Question 2  */}
            {/* <div className='flex justify-center h-16 space-x-4 items-center'>
              <div className='h-16 w-16 border-2 border-black'></div>
              <div className='flex justify-center space-x-4 items-center h-full -mt-4'>
                <h1>=</h1>
                <h1>٣</h1>
                <h1>+</h1>
                <h1>٧</h1>
              </div>
            </div> */}

            {/* Question 3  */}
            {/* <div className='flex justify-center h-16 space-x-4 items-center'>
              <div className='h-16 w-16 border-2 border-black'></div>
              <div className='flex justify-center space-x-4 items-center h-full -mt-4'>
                <h1>=</h1>
                <h1>٨</h1>
                <h1>+</h1>
                <h1>٦</h1>
              </div>
            </div> */}


            {/* Question 4  */}
            {/* <div className='flex justify-center h-16 space-x-4 items-center'>
              <div className='h-16 w-16 border-2 border-black'></div>
              <div className='flex justify-center space-x-4 items-center h-full -mt-4'>
                <h1>=</h1>
                <h1>٧</h1>
                <h1>+</h1>
                <h1>٩</h1>
              </div>
            </div> */}

            {/* Question 5  */}
            {/* <div className="grid grid-cols-3 grid-rows-5 gap-x-4 items-center justify-center text-center">
              <div className="row-start-1 border-2 text-2xl border-colPrime rounded-full text-green-700">٢</div>
              <div className="row-start-2">٢</div>
              <div className="row-start-2">٣</div>
              <div className="row-start-3">٣</div>
              <div className="row-start-3">٥</div>
              <div className="row-start-3">+</div>
              <div className="row-start-4 border-b-2 border-black col-span-3"></div>
              <div className="row-start-5 border-2 border-black h-12 w-12"></div>
              <div className="row-start-5 border-2 border-black h-12 w-12"></div>
            </div> */}


            {/* Question 6  */}
            {/* <div className="grid grid-cols-3 grid-rows-5 gap-x-4 items-center justify-center text-center">
              <div className="row-start-1 border-2 text-2xl border-colPrime rounded-full text-green-700">٢</div>
              <div className="row-start-2">٣</div>
              <div className="row-start-2">٦</div>
              <div className="row-start-3">٤</div>
              <div className="row-start-3">٨</div>
              <div className="row-start-3">+</div>
              <div className="row-start-4 border-b-2 border-black col-span-3"></div>
              <div className="row-start-5 border-2 border-black h-12 w-12"></div>
              <div className="row-start-5 border-2 border-black h-12 w-12"></div>
            </div> */}

            {/* Question 7  */}
            {/* <div className="grid grid-cols-3 grid-rows-5 gap-x-4 items-center justify-center text-center">
              <div className="row-start-1 border-2 text-2xl border-colPrime rounded-full text-green-700">٢</div>
              <div className="row-start-2">٦</div>
              <div className="row-start-2">٨</div>
              <div className="row-start-3">٩</div>
              <div className="row-start-3">٧</div>
              <div className="row-start-3">+</div>
              <div className="row-start-4 border-b-2 border-black col-span-3"></div>
              <div className="row-start-5 border-2 border-black h-12 w-12"></div>
              <div className="row-start-5 border-2 border-black h-12 w-12"></div>
            </div> */}

            {/* Question 7  */}
            {/* <div className="grid grid-cols-4 grid-rows-5 gap-x-4 items-center justify-center text-center">
              <div className="row-start-1 border-2 text-2xl border-colPrime rounded-full text-green-700">٢</div>
              <div className="row-start-2">٤</div>
              <div className="row-start-2">٣</div>
              <div className="row-start-2">٧</div>
              <div className="row-start-3">٨</div>
              <div className="row-start-3">٩</div>
              <div className="row-start-3"></div>
              <div className="row-start-3">+</div>
              <div className="row-start-4 border-b-2 border-black col-span-4"></div>
              <div className="row-start-5 border-2 border-black h-12 w-12"></div>
              <div className="row-start-5 border-2 border-black h-12 w-12"></div>
              <div className="row-start-5 border-2 border-black h-12 w-12"></div>
            </div> */}

            {/* Question 7  */}
            <div className="grid grid-cols-6 grid-rows-5 gap-x-4 items-center justify-center text-center">
              <div className="row-start-1 border-2 text-2xl border-colPrime rounded-full text-green-700">٢</div>
              <div className="row-start-2">٦</div>
              <div className="row-start-2">٥</div>
              <div className="row-start-2">٣</div>
              <div className="row-start-2">٨</div>
              <div className="row-start-3">٢</div>
              <div className="row-start-3">٦</div>
              <div className="row-start-3">٧</div>
              <div className="row-start-3">٦</div>
              <div className="row-start-3"></div>
              <div className="row-start-3">+</div>
              <div className="row-start-4 border-b-2 border-black col-span-6"></div>
              <div className="row-start-5 border-2 border-black h-12 w-12"></div>
              <div className="row-start-5 border-2 border-black h-12 w-12"></div>
              <div className="row-start-5 border-2 border-black h-12 w-12"></div>
              <div className="row-start-5 border-2 border-black h-12 w-12"></div>
            </div>

          </div>

          {/* next qustion button */}
          <button><img src={nq} alt="er" className='w-52 mt-8' /></button>
        </div>

        <div className="flex-none w-64 p-4 border-2 border-yellow-400 rounded-lg bg-yellow-50">
          <div className="grid grid-cols-2 gap-2 mt-4">
            {numbers.map((row, rowIndex) => (
              <React.Fragment key={rowIndex}>
                {row.map((num, colIndex) => (
                  <button
                    key={`${rowIndex}-${colIndex}`}
                    className="border border-yellow-400 rounded-md bg-gray-100 p-2 text-center text-2xl font-semibold hover:bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-300"
                    onClick={() => setSelectedAnswer(num)}
                  >
                    {num}
                  </button>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>

      </div>

    </div>
  )
}

export default AdditionContainer