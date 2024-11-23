'use client';

import { formatDateTimestamp } from '@/app/_lib/utils';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { IMoldTimeSheet } from '../../mold-time-sheet/_lib/utils';

interface Props {
    status: IMoldTimeSheet['status'];
    data: IMoldTimeSheet[];
    machine_name: string;
}

export default function EmblaCarousel({ status, data, machine_name }: Readonly<Props>) {
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

    if (!data.length)
        return (
            <div className="rounded-lg min-h-[250px] bg-gray-100 border-gray-400 flex justify-center items-center text-xl text-muted-foreground border">
                No data available
            </div>
        );

    return (
        <div className="embla">
            <div
                className={`embla__viewport border rounded-lg min-h-[250px] ${status === 'upcoming' ? 'bg-yellow-100 border-yellow-400' : 'bg-gray-100 border-gray-400 '}`}
                ref={emblaRef}
            >
                <div className="embla__container">
                    {/* Slide 1 */}
                    {data?.map((item) => (
                        <div key={item.id} className="embla__slide  p-10 ">
                            <div className="space-y-2 ">
                                <p>
                                    <span className="font-semibold"> Mold Name: </span>
                                    {item.mold_name}
                                </p>
                                <p>
                                    <span className="font-semibold ">Start Time: </span>
                                    {formatDateTimestamp(item.production_from)}
                                </p>
                                <p>
                                    <span className="font-semibold "> End Time: </span>
                                    {formatDateTimestamp(item.production_end)}
                                </p>

                                {status === 'completed' && (
                                    <>
                                        <p>
                                            <span className="font-semibold ">Output: </span>
                                            {item.total_counter}
                                        </p>
                                        <p>
                                            <span className="font-semibold ">Revised Target: </span>
                                            {item.revised_target}
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
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
                    {Array.from({
                        length: Math.min(slidesCount, 5),
                    }).map((_, index) => (
                        <button
                            // eslint-disable-next-line react/no-array-index-key
                            key={`${machine_name}-${status}-${index}`}
                            type="button"
                            onClick={() => scrollTo(index)}
                            className={`w-4 h-4 flex justify-center items-center text-xs rounded-full transition ${
                                // eslint-disable-next-line no-nested-ternary
                                index === activeIndex && status === 'upcoming'
                                    ? 'bg-yellow-500'
                                    : index === activeIndex
                                      ? 'bg-gray-500'
                                      : 'bg-gray-300'
                            }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
