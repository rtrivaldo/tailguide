"use client";

import SliderInput from "@/components/slider-input";
import { useRef, useState } from "react";

import { FaRegClipboard } from "react-icons/fa6";
import { TiTick } from "react-icons/ti";

export default function Transform() {
    const [rotateValue, setRotateValue] = useState(0);
    const [scaleValue, setScaleValue] = useState(1);
    const [skewValue, setSkewValue] = useState(0);
    const [translateXValue, setTranslateXValue] = useState(0);
    const [translateYValue, settranslateYValue] = useState(0);

    const [isTailwindCopied, setIsTailwindCopied] = useState(false);
    const [isCssCopied, setIsCssCopied] = useState(false);

    const handleSlider = (value, property) => {
        if (property === "rotate") {
            setRotateValue(value);
        } else if (property === "scale") {
            setScaleValue(value);
        } else if (property === "skew") {
            setSkewValue(value);
        } else if (property === "translateX") {
            setTranslateXValue(value);
        } else if (property === "translateY") {
            settranslateYValue(value);
        }
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

    return (
        <main className="flex flex-col md:flex-row gap-10 md:h-screen pt-24 pb-10 transition-colors duration-300 ease-out">
            <div className="md:w-1/2 lg:w-2/3 flex flex-col justify-between gap-10">
                <div className="h-full min-h-[20em] lg:h-2/3 flex justify-center items-center bg-slate-100 dark:bg-zinc-800 shadow-md p-6 rounded-lg">
                    <div
                        className="aspect-square w-1/2 lg:w-1/3 bg-zinc-900 dark:bg-slate-50"
                        style={{
                            transform: `rotate(${rotateValue}deg) scale(${scaleValue}) skew(${skewValue}deg) translate(${translateXValue}px,${translateYValue}px)`,
                        }}
                    ></div>
                </div>

                <div className="h-full lg:h-1/3 bg-slate-100 dark:bg-zinc-800 shadow-md p-6 rounded-lg">
                    <div className="">
                        <h2 className="lg:text-lg font-semibold">TailwindCSS</h2>
                        <div className="mt-2 flex items-center justify-between gap-6 bg-slate-50 dark:bg-zinc-900 p-4 rounded-lg shadow-md">
                            <input type="text" readOnly value={`${rotateValue > 0 ? `rotate-[${rotateValue}deg] ` : ""}` + `${scaleValue != 1 ? `scale-[${scaleValue}] ` : ""}` + `${skewValue > 0 ? `skew-x-[${skewValue}deg] ` : ""}` + `${translateXValue != 0 ? `translate-x-[${translateXValue}px] ` : ""}` + `${translateYValue != 0 ? `translate-y-[${translateYValue}px] ` : ""}`.trim() || "No transformation applied"} className="w-full bg-transparent focus:outline-none" ref={tailwindCode} />

                            <div className="cursor-pointer" onClick={() => handleCopyToClipboard("tailwind")}>
                                <FaRegClipboard className={`${isTailwindCopied ? "hidden" : ""}`} />
                                <TiTick className={`${isTailwindCopied ? "" : "hidden"}`} />
                            </div>
                        </div>
                    </div>

                    <div className="mt-4">
                        <h2 className="lg:text-lg font-semibold">CSS</h2>
                        <div className="mt-2 flex items-center justify-between gap-6 bg-slate-50 dark:bg-zinc-900 p-4 rounded-lg shadow-md">
                            <input
                                type="text"
                                readOnly
                                value={rotateValue == 0 && scaleValue == 1 && skewValue == 0 && translateXValue == 0 && translateYValue == 0 ? "No transformation applied" : `transform: ${rotateValue > 0 ? `rotate(${rotateValue}deg) ` : ""}${scaleValue != 1 ? `scale(${scaleValue}) ` : ""}${skewValue > 0 ? `skew(${skewValue}deg) ` : ""}${translateXValue != 0 ? `translateX(${translateXValue}px) ` : ""}${translateYValue != 0 ? `translateY(${translateYValue}px)` : ""};`.trim()}
                                className="w-full bg-transparent focus:outline-none"
                                ref={cssCode}
                            />

                            <div className="cursor-pointer" onClick={() => handleCopyToClipboard("css")}>
                                <FaRegClipboard className={`${isCssCopied ? "hidden" : ""}`} />
                                <TiTick className={`${isCssCopied ? "" : "hidden"}`} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="md:w-1/2 lg:w-1/3 bg-slate-100 dark:bg-zinc-800 shadow-md p-6 rounded-lg">
                <h1 className="text-xl lg:text-2xl font-semibold">Properties</h1>
                <p className="lg:mt-1 text-sm lg:text-base">Set the properties for the border radius.</p>

                <div className="mt-6">
                    <SliderInput state={rotateValue} handler={(value) => handleSlider(value, "rotate")} title={"Rotate"} defaultValue={0} value={[rotateValue]} max={360} min={0} unit="°" />
                    <SliderInput state={scaleValue} handler={(value) => handleSlider(value, "scale")} title={"Scale"} value={scaleValue} defaultValue={1} max={2} min={0} step={0.01} unit="" className="mt-2" />
                    <SliderInput state={skewValue} handler={(value) => handleSlider(value, "skew")} title={"Skew"} value={skewValue} defaultValue={0} max={180} min={0} unit="°" className="mt-2" />
                    <SliderInput state={translateXValue} handler={(value) => handleSlider(value, "translateX")} title={"Translate X"} value={translateXValue} defaultValue={0} max={200} min={0} className="mt-2" />
                    <SliderInput state={translateYValue} handler={(value) => handleSlider(value, "translateY")} title={"Translate Y"} value={translateYValue} defaultValue={0} max={200} min={0} className="mt-2" />
                </div>
            </div>
        </main>
    );
}
