'use client';

import StatusCard from './_components/StatusCard';

export default function Schedule() {
    const mockData = {
        previous: [
            {
                moldName: 'Mold A',
                startTime: '2023-05-01 08:00',
                endTime: '2023-05-01 16:00',
                output: 500,
                revisedTarget: 550,
            },
            {
                moldName: 'Mold B',
                startTime: '2023-05-02 08:00',
                endTime: '2023-05-02 16:00',
                output: 480,
                revisedTarget: 500,
            },
        ],
        current: {
            moldName: 'Mold C',
            startTime: '2023-05-03 08:00',
            tentativeEndTime: '2023-05-03 16:00',
            output: 300,
            revisedTarget: 600,
        },
        upcoming: [
            {
                moldName: 'Mold D',
                startTime: '2023-05-04 08:00',
                tentativeEndTime: '2023-05-04 16:00',
                output: 0,
                revisedTarget: 550,
            },
            {
                moldName: 'Mold E',
                startTime: '2023-05-05 08:00',
                tentativeEndTime: '2023-05-05 16:00',
                output: 0,
                revisedTarget: 580,
            },
        ],
    };

    return (
        <div>
            <div className="border-[3px] border-x-[1px] border-b-0 rounded-t-lg  rounded-b-none p-2 rounded-lg ">
                <h3 className="text-2xl text-purple-700  font-semibold text-center">Schedule</h3>
            </div>

            <div className="flex justify-between gap-10 mt-20 mx-10">
                {/* Previous Status Card */}
                <div className="w-[32%] ">
                    <h1 className="text-center text-xl font-semibold ">Previous</h1>
                    <hr className="mt-2 mb-6" />
                    <StatusCard title="Previous" data={mockData.previous} isCarousel />
                </div>

                {/* Current Status Card */}
                <div className="w-[36%]">
                    <h1 className="text-center text-xl font-semibold  ">Current</h1>
                    <hr className="mt-2 mb-6" />
                    <StatusCard title="Current" data={mockData.current} />
                </div>

                {/* Upcoming Status Card */}
                <div className="w-[32%]">
                    <h1 className="text-center text-xl font-semibold">Upcoming</h1>
                    <hr className="mt-2 mb-6" />
                    <StatusCard title="Upcoming" data={mockData.upcoming} isCarousel />
                </div>
            </div>
        </div>
    );
}
