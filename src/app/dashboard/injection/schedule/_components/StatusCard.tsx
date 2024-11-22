import { useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';

export default function StatusCard({ title, data, isCarousel = false }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % data.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + data.length) % data.length);
    };

    const renderContent = (item) => (
        <div className="space-y-2">
            <p>
                <span className="font-semibold">Mold Name:</span> {item.moldName}
            </p>
            <p>
                <span className="font-semibold">Start Time:</span> {item.startTime}
            </p>
            <p>
                <span className="font-semibold">
                    {item.endTime ? 'End Time:' : 'Tentative End Time:'}
                </span>{' '}
                {item.endTime || item.tentativeEndTime}
            </p>
            <p>
                <span className="font-semibold">Output:</span> {item.output}
            </p>
            <p>
                <span className="font-semibold">Revised Target:</span> {item.revisedTarget}
            </p>
        </div>
    );

    return (
        <div
            className={`p-6 rounded-lg min-h-[250px] ${
                {
                    Previous: 'bg-gray-100 border border-gray-400',
                    Current: 'bg-green-100 shadow-2xl border border-green-400',
                }[title] || 'bg-yellow-100 border border-yellow-400'
            }`}
        >
            {isCarousel ? (
                <div className="relative">
                    {renderContent(data[currentSlide])}
                    <div className="flex justify-between mt-4">
                        <button
                            type="button"
                            onClick={prevSlide}
                            className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors duration-200"
                            aria-label="Previous slide"
                        >
                            <FaAngleLeft />
                        </button>
                        <button
                            type="button"
                            onClick={nextSlide}
                            className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors duration-200"
                            aria-label="Next slide"
                        >
                            <FaAngleRight />
                        </button>
                    </div>
                </div>
            ) : (
                renderContent(data)
            )}
        </div>
    );
}
