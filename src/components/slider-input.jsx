import { Slider } from "@/components/ui/slider";

export default function SliderInput({ state, handler, title, defaultValue, max, min, unit = "px", className }) {
    return (
        <div className={className}>
            <h2 className="text-sm lg:text-base">{title}</h2>
            <div className="flex items-center gap-4">
                <Slider defaultValue={[defaultValue]} min={min} max={max} step={1} onValueChange={handler} />
                <p className="mb-1 text-sm lg:text-base">
                    {state}
                    {unit}
                </p>
            </div>
        </div>
    );
}
