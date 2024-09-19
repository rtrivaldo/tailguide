'use client';

import SliderInput from '@/components/slider-input';
import { useRef, useState } from 'react';

import { FaRegClipboard } from 'react-icons/fa6';
import { TiTick } from 'react-icons/ti';

export default function BorderRadius() {
  const [allValue, setAllValue] = useState(20);
  const [topLeftValue, setTopLeftValue] = useState(20);
  const [topRightValue, setTopRightValue] = useState(20);
  const [bottomRightValue, setBottomRightValue] = useState(20);
  const [bottomLeftValue, setBottomLeftValue] = useState(20);

  const [isTailwindCopied, setIsTailwindCopied] = useState(false);
  const [isCssCopied, setIsCssCopied] = useState(false);

  const handleSlider = (value, property) => {
    if (property === 'all') {
      setAllValue(value);
      setTopLeftValue(value);
      setTopRightValue(value);
      setBottomRightValue(value);
      setBottomLeftValue(value);
    } else if (property === 'topLeft') {
      setTopLeftValue(value);
    } else if (property === 'topRight') {
      setTopRightValue(value);
    } else if (property === 'bottomRight') {
      setBottomRightValue(value);
    } else if (property === 'bottomLeft') {
      setBottomLeftValue(value);
    }
  };

  const tailwindCode = useRef(null);
  const cssCode = useRef(null);

  const handleCopyToClipboard = target => {
    if (target === 'tailwind') {
      setIsTailwindCopied(true);

      copyToClipboard(tailwindCode);

      setTimeout(() => {
        setIsTailwindCopied(false);
      }, 3000);
    } else {
      setIsCssCopied(true);

      copyToClipboard(cssCode);

      setTimeout(() => {
        setIsCssCopied(false);
      }, 3000);
    }
  };

  const copyToClipboard = ref => {
    navigator.clipboard.writeText(ref.current.value).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  const optimizedTailwind = (
    topLeftValue,
    topRightValue,
    bottomRightValue,
    bottomLeftValue
  ) => {
    if (
      topLeftValue[0] == topRightValue[0] &&
      topRightValue[0] == bottomRightValue[0] &&
      bottomRightValue[0] == bottomLeftValue[0]
    ) {
      return topLeftValue + 'px';
    } else if (
      topLeftValue[0] == bottomRightValue[0] &&
      topRightValue[0] == bottomLeftValue[0]
    ) {
      return topLeftValue + 'px' + '_' + topRightValue + 'px';
    } else {
      return (
        topLeftValue +
        'px' +
        '_' +
        topRightValue +
        'px' +
        '_' +
        bottomRightValue +
        'px' +
        '_' +
        bottomLeftValue +
        'px'
      );
    }
  };

  const optimizedCss = (
    topLeftValue,
    topRightValue,
    bottomRightValue,
    bottomLeftValue
  ) => {
    if (
      topLeftValue[0] == topRightValue[0] &&
      topRightValue[0] == bottomRightValue[0] &&
      bottomRightValue[0] == bottomLeftValue[0]
    ) {
      return topLeftValue + 'px';
    } else if (
      topLeftValue[0] == bottomRightValue[0] &&
      topRightValue[0] == bottomLeftValue[0]
    ) {
      return topLeftValue + 'px' + ' ' + topRightValue + 'px';
    } else {
      return (
        topLeftValue +
        'px' +
        ' ' +
        topRightValue +
        'px' +
        ' ' +
        bottomRightValue +
        'px' +
        ' ' +
        bottomLeftValue +
        'px'
      );
    }
  };

  return (
    <main className='flex flex-col md:flex-row gap-10 md:h-screen pt-24 pb-10 transition-colors duration-300 ease-out'>
      <div className='md:w-1/2 lg:w-2/3 flex flex-col justify-between gap-10'>
        <div className='h-full min-h-[20em] lg:h-2/3 flex justify-center items-center bg-slate-100 dark:bg-zinc-800 shadow-md p-6 rounded-lg'>
          <div
            className='aspect-square w-1/2 lg:w-1/3 bg-zinc-900 dark:bg-slate-50'
            style={{
              borderRadius: `${topLeftValue}px ${topRightValue}px ${bottomRightValue}px ${bottomLeftValue}px`,
            }}
          ></div>
        </div>

        <div className='h-full lg:h-1/3 bg-slate-100 dark:bg-zinc-800 shadow-md p-6 rounded-lg'>
          <div className=''>
            <h2 className='lg:text-lg font-semibold'>TailwindCSS</h2>
            <div className='mt-2 flex items-center justify-between gap-6 bg-slate-50 dark:bg-zinc-900 p-4 rounded-lg shadow-md'>
              <input
                type='text'
                readOnly
                /* value={`${topLeftValue > 0 || topRightValue > 0 || bottomRightValue > 0 || bottomLeftValue > 0 ? `rounded-[${topLeftValue}px_${topRightValue}px_${bottomRightValue}px_${bottomLeftValue}px]` : "No border radius applied"}`} */ value={`rounded-[${optimizedTailwind(
                  topLeftValue,
                  topRightValue,
                  bottomRightValue,
                  bottomLeftValue
                )}]`}
                className='w-full bg-transparent focus:outline-none'
                ref={tailwindCode}
              />

              <div
                className='cursor-pointer'
                onClick={() => handleCopyToClipboard('tailwind')}
              >
                <FaRegClipboard
                  className={`${isTailwindCopied ? 'hidden' : ''}`}
                />
                <TiTick className={`${isTailwindCopied ? '' : 'hidden'}`} />
              </div>
            </div>
          </div>

          <div className='mt-4'>
            <h2 className='lg:text-lg font-semibold'>CSS</h2>
            <div className='mt-2 flex items-center justify-between gap-6 bg-slate-50 dark:bg-zinc-900 p-4 rounded-lg shadow-md'>
              <input
                type='text'
                readOnly
                /* value={`${topLeftValue > 0 || topRightValue > 0 || bottomRightValue > 0 || bottomLeftValue > 0 ? `border-radius: ${topLeftValue}px ${topRightValue}px ${bottomRightValue}px ${bottomLeftValue}px;` : "No border radius applied"}`} */ value={`border-radius: ${optimizedCss(
                  topLeftValue,
                  topRightValue,
                  bottomRightValue,
                  bottomLeftValue
                )};`}
                className='w-full bg-transparent focus:outline-none'
                ref={cssCode}
              />

              <div
                className='cursor-pointer'
                onClick={() => handleCopyToClipboard('css')}
              >
                <FaRegClipboard className={`${isCssCopied ? 'hidden' : ''}`} />
                <TiTick className={`${isCssCopied ? '' : 'hidden'}`} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='md:w-1/2 lg:w-1/3 bg-slate-100 dark:bg-zinc-800 shadow-md p-6 rounded-lg'>
        <h1 className='text-xl lg:text-2xl font-semibold'>Properties</h1>
        <p className='lg:mt-1 text-sm lg:text-base'>
          Set the properties for the border radius.
        </p>

        <div className='mt-6'>
          <SliderInput
            state={allValue}
            handler={value => handleSlider(value, 'all')}
            title={'All Corner Radius'}
            defaultValue={33}
            value={[allValue]}
            max={500}
            min={0}
          />
          <SliderInput
            state={topLeftValue}
            handler={value => handleSlider(value, 'topLeft')}
            title={'Top Left Radius'}
            value={topLeftValue}
            defaultValue={20}
            max={500}
            min={0}
            className='mt-2'
          />
          <SliderInput
            state={topRightValue}
            handler={value => handleSlider(value, 'topRight')}
            title={'Top Right Radius'}
            value={topRightValue}
            defaultValue={20}
            max={500}
            min={0}
            className='mt-2'
          />
          <SliderInput
            state={bottomRightValue}
            handler={value => handleSlider(value, 'bottomRight')}
            title={'Bottom Right Radius'}
            value={bottomRightValue}
            defaultValue={5}
            max={500}
            min={0}
            className='mt-2'
          />
          <SliderInput
            state={bottomLeftValue}
            handler={value => handleSlider(value, 'bottomLeft')}
            title={'Bottom Left Radius'}
            value={bottomLeftValue}
            defaultValue={5}
            max={500}
            min={0}
            className='mt-2'
          />
        </div>
      </div>
    </main>
  );
}
