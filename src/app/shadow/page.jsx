"use client";

import SliderInput from "@/components/slider-input";
import { Switch } from "@/components/ui/switch";
import { useRef, useState } from "react";

import { FaRegClipboard } from "react-icons/fa6";
import { TiTick } from "react-icons/ti";

// Utility functions to handle color format conversions
const hexToRgb = (hex) => {
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

const rgbToRgbObject = (rgb) => {
    // Remove `rgb(` and `)` and spaces
    const color = rgb.replace(/^rgb\(|\s+|\)$/g, "");
    const [r, g, b] = color.split(",").map(Number);
    return { r, g, b };
};

export default function Shadow() {
    const [xValue, setXValue] = useState(33);
    const [yValue, setYValue] = useState(20);
    const [blurValue, setBlurValue] = useState(20);
    const [spreadValue, setSpreadValue] = useState(5);
    const [opacityValue, setOpacityValue] = useState(1); // Opacity as a fraction (0 to 1)

    const [colorValue, setColorValue] = useState("#000000");

    const [isTailwindCopied, setIsTailwindCopied] = useState(false);
    const [isCssCopied, setIsCssCopied] = useState(false);

    const [isInset, setIsInset] = useState(false);

    const handleSlider = (value, property) => {
        if (property === "x") {
            setXValue(value);
        } else if (property === "y") {
            setYValue(value);
        } else if (property === "blur") {
            setBlurValue(value);
        } else if (property === "spread") {
            setSpreadValue(value);
        } else if (property === "opacity") {
            setOpacityValue(value / 100); // Convert percentage to fraction (0 to 1)
        }
    };

    const handleColorChange = (e) => {
        const newColorValue = e.target.value;
        setColorValue(newColorValue);
    };

    const getColorDisplay = () => {
        if (colorValue.startsWith("#")) {
            const { r, g, b } = hexToRgb(colorValue);
            return `rgba(${r},${g},${b},${opacityValue})`; // Include opacity
        } else if (colorValue.startsWith("rgb")) {
            return rgbToRgba(colorValue, opacityValue); // Include opacity
        }
        return colorValue;
    };

    const tailwindCode = useRef(null);
    const cssCode = useRef(null);

    const handleCopyToClipboard = (target) => {
        if (target === "tailwind") {
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

    const copyToClipboard = (ref) => {
        navigator.clipboard.writeText(ref.current.value).catch((err) => {
            console.error("Failed to copy: ", err);
        });
    };

    const handleSwitch = () => {
        setIsInset(!isInset);
    };

    return (
        <main className="flex flex-col md:flex-row gap-10 h-screen pt-24 pb-10">
            <div className="md:-1/2 lg:w-2/3 flex flex-col justify-between gap-10">
                <div className="h-full min-h-[20em] lg:h-2/3 flex justify-center items-center bg-slate-100 dark:bg-slate-800 shadow-md p-6 rounded-lg">
                    <div
                        className="max-w-xl bg-slate-50 dark:bg-slate-950 dark:text-slate-100 p-6 rounded-lg"
                        style={{
                            boxShadow: `${xValue}px ${yValue}px ${blurValue}px ${spreadValue}px ${getColorDisplay()} ${isInset ? "inset" : ""}`,
                        }}
                    >
                        <p className="text-sm lg:text-base">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio consequuntur, nihil voluptatibus deleniti accusamus cum quam explicabo tenetur commodi quo!</p>
                    </div>
                </div>

                <div className="h-full lg:h-1/3 bg-slate-100 dark:bg-slate-800 shadow-md p-6 rounded-lg">
                    <div className="">
                        <h2 className="lg:text-lg font-semibold">TailwindCSS</h2>
                        <div className="mt-2 flex items-center justify-between bg-slate-50 dark:bg-slate-950 p-4 rounded-lg shadow-md">
                            <input type="text" readOnly value={`shadow-[${isInset ? "inset_" : ""}${xValue}px_${yValue}px_${blurValue}px_${spreadValue}px_${getColorDisplay()}]`} className="w-full bg-transparent focus:outline-none" ref={tailwindCode} />

                            <div className="cursor-pointer" onClick={() => handleCopyToClipboard("tailwind")}>
                                <FaRegClipboard className={`${isTailwindCopied ? "hidden" : ""}`} />
                                <TiTick className={`${isTailwindCopied ? "" : "hidden"}`} />
                            </div>
                        </div>
                    </div>

                    <div className="mt-4">
                        <h2 className="lg:text-lg font-semibold">CSS</h2>
                        <div className="mt-2 flex items-center justify-between bg-slate-50 dark:bg-slate-950 p-4 rounded-lg shadow-md">
                            <input type="text" readOnly value={`box-shadow: ${xValue}px ${yValue}px ${blurValue}px ${spreadValue}px ${getColorDisplay()}${isInset ? " inset" : ""};`} className="w-full bg-transparent focus:outline-none" ref={cssCode} />

                            <div className="cursor-pointer" onClick={() => handleCopyToClipboard("css")}>
                                <FaRegClipboard className={`${isCssCopied ? "hidden" : ""}`} />
                                <TiTick className={`${isCssCopied ? "" : "hidden"}`} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="md:w-1/2 lg:w-1/3 bg-slate-100 dark:bg-slate-800 shadow-md p-6 rounded-lg">
                <h1 className="text-xl lg:text-2xl font-semibold">Properties</h1>
                <p className="lg:mt-1 text-sm lg:text-base">Set the properties for the shadow.</p>

                <div className="mt-6">
                    <SliderInput state={xValue} handler={(value) => handleSlider(value, "x")} title={"Horizontal Shadow Length"} defaultValue={33} max={100} min={-100} />
                    <SliderInput state={yValue} handler={(value) => handleSlider(value, "y")} title={"Vertical Shadow Length"} defaultValue={20} max={100} min={-100} className="mt-2" />
                    <SliderInput state={blurValue} handler={(value) => handleSlider(value, "blur")} title={"Blur Radius"} defaultValue={20} max={200} min={0} className="mt-2" />
                    <SliderInput state={spreadValue} handler={(value) => handleSlider(value, "spread")} title={"Spread Radius"} defaultValue={5} max={150} min={-100} className="mt-2" />

                    <SliderInput state={opacityValue} handler={(value) => handleSlider(value, "opacity")} title={"Shadow Opacity"} defaultValue={100} max={100} min={0} unit="" className="mt-2" />

                    <div className="mt-2">
                        <h2 className="text-sm lg:text-base">Shadow Color</h2>

                        <div className="flex gap-4 items-center mt-2">
                            <input type="text" className="bg-transparent border rounded p-2 w-full text-sm lg:text-base" value={colorValue} onChange={handleColorChange} placeholder="Enter color (Hex or RGB)" />
                            <input type="color" value={colorValue} onChange={handleColorChange} />
                        </div>
                    </div>

                    <div className="mt-4 flex justify-between items-center">
                        <h2 className="text-sm lg:text-base">Inset</h2>

                        <Switch onClick={handleSwitch} />
                    </div>
                </div>
            </div>
        </main>
    );
}
