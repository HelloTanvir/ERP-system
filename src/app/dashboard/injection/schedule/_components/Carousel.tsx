'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';

export default function EmblaCarousel({ status }) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
    const [activeIndex, setActiveIndex] = useState(0);
    const [slidesCount, setSlidesCount] = useState(0);

    // Update active index when slide changes
    const onSelect = useCallback(() => {
        if (emblaApi) {
            setActiveIndex(emblaApi.selectedScrollSnap());
        }
    }, [emblaApi]);

    // Initialize Embla events
    useEffect(() => {
        if (emblaApi) {
            emblaApi.on('select', onSelect);
            setSlidesCount(emblaApi.scrollSnapList().length);
        }
    }, [emblaApi, onSelect, slidesCount]);

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const scrollTo = useCallback(
        (index: number) => {
            if (emblaApi) emblaApi.scrollTo(index);
        },
        [emblaApi]
    );

    return (
        <div className="embla">
            <div
                className={`embla__viewport border rounded-lg min-h-[250px] ${status === 'upcoming' ? 'bg-yellow-100 border-yellow-400' : 'bg-gray-100 border-gray-400 '}`}
                ref={emblaRef}
            >
                <div className="embla__container">
                    {/* Slide 1 */}
                    <div className="embla__slide  p-10 ">
                        <div className="space-y-2 ">
                            <p>
                                <span className="font-semibold "> Mold Name:</span>
                                Muhammad
                            </p>
                            <p>
                                <span className="font-semibold ">Start Time:</span>
                                {' Muhammad Tanvir Hasan'}
                            </p>
                            <p>
                                <span className="font-semibold "> End Time:</span>
                                {'Muhammad Tanvir Hasan '}
                            </p>
                            <p>
                                <span className="font-semibold "> Output:</span>
                                {'Muhammad Tanvir Hasan '}
                            </p>
                            <p>
                                <span className="font-semibold "> Revised Target:</span>
                                {' Muhammad Tanvir Hasan'}
                            </p>
                        </div>
                    </div>
                    {/* Slide 2 */}
                    <div className="embla__slide p-10 ">
                        <div className="space-y-2 ">
                            <p>
                                <span className="font-semibold "> Mold Name:</span>
                                Tanvir
                            </p>
                            <p>
                                <span className="font-semibold ">Start Time:</span>
                                {' Muhammad Tanvir Hasan'}
                            </p>
                            <p>
                                <span className="font-semibold "> End Time:</span>
                                {'Muhammad Tanvir Hasan '}
                            </p>
                            <p>
                                <span className="font-semibold "> Output:</span>
                                {'Muhammad Tanvir Hasan '}
                            </p>
                            <p>
                                <span className="font-semibold "> Revised Target:</span>
                                {' Muhammad Tanvir Hasan'}
                            </p>
                        </div>
                    </div>
                    {/* Slide 3 */}
                    <div className="embla__slide p-10 ">
                        <div className="space-y-2 ">
                            <p>
                                <span className="font-semibold "> Mold Name:</span>
                                Hasan
                            </p>
                            <p>
                                <span className="font-semibold ">Start Time:</span>
                                {' Muhammad Tanvir Hasan'}
                            </p>
                            <p>
                                <span className="font-semibold "> End Time:</span>
                                {'Muhammad Tanvir Hasan '}
                            </p>
                            <p>
                                <span className="font-semibold "> Output:</span>
                                {'Muhammad Tanvir Hasan '}
                            </p>
                            <p>
                                <span className="font-semibold "> Revised Target:</span>
                                {' Muhammad Tanvir Hasan'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Section */}
            <div className="flex justify-between items-center mt-2">
                {/* Sliding Buttons */}
                <div className="flex gap-5 ">
                    <button onClick={scrollPrev} type="button" className="embla__prev">
                        <p
                            className={`p-3 transition duration-500 rounded-full  text-lg shadow-lg ${status === 'upcoming' ? 'bg-yellow-100 hover:bg-yellow-200' : 'bg-gray-200 hover:bg-gray-300 '}`}
                        >
                            <FaAngleLeft />
                        </p>
                    </button>
                    <button onClick={scrollNext} type="button" className="embla__next">
                        <p
                            className={`p-3 transition duration-500 rounded-full  text-lg shadow-lg ${status === 'upcoming' ? 'bg-yellow-100 hover:bg-yellow-200' : 'bg-gray-200 hover:bg-gray-300 '}`}
                        >
                            <FaAngleRight />
                        </p>
                    </button>
                </div>

                {/* Dot Navigation */}
                <div className="flex justify-center gap-2 ">
                    {Array.from({ length: slidesCount }).map((_, index) => (
                        <button
                            type="button"
                            onClick={() => scrollTo(index)}
                            className={`w-3 h-3 rounded-full transition ${
                                index === activeIndex && status === 'upcoming'
                                    ? 'bg-yellow-500'
                                    : index === activeIndex
                                      ? 'bg-gray-500'
                                      : 'bg-gray-300'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
