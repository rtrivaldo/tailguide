import { Slider } from "@/components/ui/slider";

export default function SliderInput({ state, handler, title, defaultValue, value, max, min, step = 1, unit = "px", className }) {
    return (
        <div className={className}>
            <h2 className="text-sm lg:text-base">{title}</h2>
            <div className="flex items-center gap-4">
                <Slider defaultValue={[defaultValue]} min={min} max={max} step={step} onValueChange={handler} value={[value]} />
                <p className="mb-1 text-sm lg:text-base">
                    {state}
                    {unit}
                </p>
            </div>
        </div>
    );
}
