'use client';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import { Navigation, Pagination } from 'swiper/modules';

export default function Slider() {
    return (
        <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop
            pagination={{ clickable: true }}
            navigation
            modules={[Pagination, Navigation]}
            className="mySwiper"
        >
            <SwiperSlide>
                <div className="bg-yellow-100 border border-yellow-400 rounded-lg w-full min-h-[250px] p-10">
                    <div className="space-y-2 ">
                        <p>
                            <span className="font-semibold "> Mold Name:</span>
                            Muhammad Tanvir Hasan
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
            </SwiperSlide>
            <SwiperSlide>
                <div className="bg-yellow-100 border border-yellow-400 rounded-lg w-full min-h-[250px]">
                    Slide 2
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="bg-yellow-100 border border-yellow-400 rounded-lg w-full min-h-[250px]">
                    Slide 3
                </div>
            </SwiperSlide>
        </Swiper>
    );
}
