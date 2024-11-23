import { Suspense } from 'react';
import { createGenericServerActions } from '../../_lib/actions';

import EmblaCarousel from './_components/Carousel';
import StatusCard from './_components/StatusCard';
import { ISchedule } from './_lib/utils';

export default async function Schedule() {
    const { getItems } = await createGenericServerActions<ISchedule>({
        endpoint: `${process.env.API_URL}/injection/mold-timesheet/`,
        revalidatePath: '/dashboard/injection/schedule',
    });

    const { results: allData } = await getItems();

    const { results: completedItems } = await getItems({
        status: 'completed',
    });
    const { results: currentItems } = await getItems({
        status: 'running',
    });
    const { results: upcomingItems } = await getItems({
        status: 'upcoming',
    });

    console.log('All Data:', allData);

    console.log('Status Card:', { completedItems, currentItems, upcomingItems });

    // const mockData = {
    //     previous: [
    //         {
    //             moldName: 'Mold A',
    //             startTime: '2023-05-01 08:00',
    //             endTime: '2023-05-01 16:00',
    //             output: 500,
    //             revisedTarget: 550,
    //         },
    //         {
    //             moldName: 'Mold B',
    //             startTime: '2023-05-02 08:00',
    //             endTime: '2023-05-02 16:00',
    //             output: 480,
    //             revisedTarget: 500,
    //         },
    //     ],
    //     current: {
    //         moldName: 'Mold C',
    //         startTime: '2023-05-03 08:00',
    //         tentativeEndTime: '2023-05-03 16:00',
    //         output: 300,
    //         revisedTarget: 600,
    //     },
    //     upcoming: [
    //         {
    //             moldName: 'Mold D',
    //             startTime: '2023-05-04 08:00',
    //             tentativeEndTime: '2023-05-04 16:00',
    //             output: 0,
    //             revisedTarget: 550,
    //         },
    //         {
    //             moldName: 'Mold E',
    //             startTime: '2023-05-05 08:00',
    //             tentativeEndTime: '2023-05-05 16:00',
    //             output: 0,
    //             revisedTarget: 580,
    //         },
    //     ],
    // };

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div>
                <div className="border-[3px] border-x-[1px] border-b-0 rounded-t-lg  rounded-b-none p-2 rounded-lg mb-12 ">
                    <h3 className="text-2xl text-purple-700  font-semibold text-center">
                        Schedule
                    </h3>
                </div>

                <div className="mb-10 border p-5">
                    {/* Machine Name */}
                    <div className="text-center text-xl mb-4">
                        <h1>
                            <span className="font-bold">Machine Name:</span> Toy Machine
                        </h1>
                        <hr className="mt-2 w-[0px] mx-auto" />
                    </div>

                    {/* Machine Status Cards */}
                    <div className="flex justify-between gap-10  w-[80%] mx-auto">
                        <div className="w-[32%] ">
                            <h1 className="text-center text-xl font-semibold ">Previous</h1>
                            <hr className="mt-2 mb-6" />
                            {/* <StatusCard title="Previous" data={completedItems} isCarousel /> */}
                            <EmblaCarousel />
                        </div>

                        <div className="w-[36%]">
                            <h1 className="text-center text-xl font-semibold  ">Current</h1>
                            <hr className="mt-2 mb-6" />
                            <StatusCard title="Current" data={currentItems?.[0]} />
                        </div>

                        <div className="w-[32%]">
                            <h1 className="text-center text-xl font-semibold">Upcoming</h1>
                            <hr className="mt-2 mb-6" />
                            {/* <div className="max-w-[500px] relative">
                            <Slider />
                        </div> */}
                            <EmblaCarousel status="upcoming" />
                        </div>
                    </div>
                </div>
            </div>
        </Suspense>
    );
}
