'use client';

import SliderInput from '@/components/slider-input';

import { useRef, useState } from 'react';

import { FaRegClipboard } from 'react-icons/fa6';
import { TiTick } from 'react-icons/ti';

export default function Glassmorphism() {
  const [opacityValue, setOpacityValue] = useState(0.6);
  const [blurValue, setBlurValue] = useState(12);
  const [saturationValue, setSaturationValue] = useState(1.8);
  const [contrastValue, setContrastValue] = useState(1);
  const [colorValue, setColorValue] = useState('#D1D5DB');

  const [isTailwindCopied, setIsTailwindCopied] = useState(false);
  const [isCssCopied, setIsCssCopied] = useState(false);

  const handleSlider = (value, property) => {
    if (property === 'opacity') {
      setOpacityValue(value);
    } else if (property === 'blur') {
      setBlurValue(value);
    } else if (property === 'saturation') {
      setSaturationValue(value);
    } else if (property === 'contrast') {
      setContrastValue(value);
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

  const handleColorChange = e => {
    const newColorValue = e.target.value;
    setColorValue(newColorValue);
  };

  const getColorDisplay = () => {
    if (colorValue.startsWith('#')) {
      const { r, g, b } = hexToRgb(colorValue);
      return `rgba(${r},${g},${b},${opacityValue})`; // Include opacity
    } else if (colorValue.startsWith('rgb')) {
      return rgbToRgba(colorValue, opacityValue); // Include opacity
    }
    return colorValue;
  };

  // Utility functions to handle color format conversions
  const hexToRgb = hex => {
    let r = 0,
      g = 0,
      b = 0;

    // 3 digits
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
      r = parseInt(hex[1] + hex[2], 16);
      g = parseInt(hex[3] + hex[4], 16);
      b = parseInt(hex[5] + hex[6], 16);
    }

    return { r, g, b };
  };

  const rgbToRgba = (rgb, alpha) => {
    const { r, g, b } = rgbToRgbObject(rgb);
    return `rgba(${r},${g},${b},${alpha})`;
  };

  const rgbToRgbObject = rgb => {
    // Remove `rgb(` and `)` and spaces
    const color = rgb.replace(/^rgb\(|\s+|\)$/g, '');
    const [r, g, b] = color.split(',').map(Number);
    return { r, g, b };
  };

  return (
    <main className='flex flex-col md:flex-row gap-10 md:h-screen pt-24 pb-10 transition-colors duration-300 ease-out'>
      <div className='md:w-1/2 lg:w-2/3 flex flex-col justify-between gap-10'>
        <div className='h-full min-h-[20em] lg:h-2/3 flex justify-center items-center bg-[url("https://images.unsplash.com/photo-1519681393784-d120267933ba?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1124&q=100")] bg-cover shadow-md p-6 rounded-lg'>
          <div
            className='aspect-video w-2/3 lg:w-3/5 rounded-xl'
            style={{
              backdropFilter: `blur(${blurValue}px) saturate(${saturationValue}) contrast(${contrastValue})`,
              WebkitBackdropFilter: `blur(${blurValue}px) saturate(${saturationValue}) contrast(${contrastValue})`,
              backgroundColor: `${getColorDisplay()}`,
              border: '1px solid rgba(255, 255, 255, 0.2)',
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
                value={`bg-[${colorValue}]/[${opacityValue}] backdrop-blur-[${blurValue}px] saturate-[${saturationValue}] contrast-[${contrastValue}]`}
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
                value={`background-color: ${getColorDisplay()}; backdrop-filter: blur(${blurValue}px) saturate(${saturationValue}) contrast(${contrastValue});`}
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
          Set the properties for the glassmorphism effect.
        </p>

        <div className='mt-6'>
          <SliderInput
            state={opacityValue}
            handler={value => handleSlider(value, 'opacity')}
            title={'Opacity'}
            defaultValue={0.6}
            value={[opacityValue]}
            max={1}
            min={0}
            step={0.01}
            unit=''
          />

          <SliderInput
            state={blurValue}
            handler={value => handleSlider(value, 'blur')}
            title={'Blur'}
            value={blurValue}
            defaultValue={12}
            max={20}
            min={0}
            className='mt-2'
          />

          <SliderInput
            state={saturationValue}
            handler={value => handleSlider(value, 'saturation')}
            title={'Saturation'}
            value={saturationValue}
            defaultValue={1.8}
            max={2}
            min={0}
            step={0.01}
            unit=''
            className='mt-2'
          />

          <SliderInput
            state={contrastValue}
            handler={value => handleSlider(value, 'contrast')}
            title={'Contrast'}
            value={contrastValue}
            defaultValue={1}
            max={2}
            min={0}
            step={0.01}
            unit=''
            className='mt-2'
          />

          <div className='mt-2'>
            <h2 className='text-sm lg:text-base'>Shadow Color</h2>

            <div className='flex gap-4 items-center mt-2'>
              <input
                type='text'
                className='bg-transparent border rounded p-2 w-full text-sm lg:text-base'
                value={colorValue}
                onChange={handleColorChange}
                placeholder='Enter color (Hex or RGB)'
              />
              <input
                type='color'
                value={colorValue}
                onChange={handleColorChange}
                className='w-8 h-8 outline-none bg-transparent'
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
