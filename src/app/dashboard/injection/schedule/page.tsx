import { Suspense } from 'react';
import { createGenericServerActions } from '../../_lib/actions';

import SearchInTable from '../../_components/generic-crud/SearchInTable';
import { SearchParams } from '../../_lib/utils';
import { IMoldTimeSheet } from '../mold-time-sheet/_lib/utils';
import EmblaCarousel from './_components/Carousel';
import StatusCard from './_components/StatusCard';
import { getSearchFields, MAX_ITEMS_PER_CAROUSEL } from './_lib/utils';

export default async function Schedule({
    searchParams,
}: Readonly<{ searchParams?: SearchParams }>) {
    const { getItems } = await createGenericServerActions<IMoldTimeSheet>({
        endpoint: `${process.env.API_URL}/injection/mold-timesheet/`,
        revalidatePath: '/dashboard/injection/schedule',
    });

    const { results: completedItems } = await getItems({
        status: 'completed',
        machine__name__icontains: searchParams?.machine_name || '',
    });
    const { results: currentItems } = await getItems({
        status: 'running',
        machine__name__icontains: searchParams?.machine_name || '',
    });
    const { results: upcomingItems } = await getItems({
        status: 'upcoming',
        machine__name__icontains: searchParams?.machine_name || '',
    });

    const searchFields = getSearchFields();

    const groupItemsByMachine = (
        items: IMoldTimeSheet[]
    ): {
        [key: string]: {
            current: IMoldTimeSheet | null;
            upcoming: IMoldTimeSheet[];
            completed: IMoldTimeSheet[];
        };
    } => {
        const groupedItems: {
            [key: string]: {
                current: IMoldTimeSheet | null;
                upcoming: IMoldTimeSheet[];
                completed: IMoldTimeSheet[];
            };
        } = {};

        items.forEach((item) => {
            if (groupedItems[item.machine_name]) {
                if (
                    item.status === 'upcoming' &&
                    groupedItems[item.machine_name].upcoming.length < MAX_ITEMS_PER_CAROUSEL
                ) {
                    groupedItems[item.machine_name].upcoming.push(item);
                } else if (
                    item.status === 'completed' &&
                    groupedItems[item.machine_name].completed.length < MAX_ITEMS_PER_CAROUSEL
                ) {
                    groupedItems[item.machine_name].completed.push(item);
                } else {
                    groupedItems[item.machine_name].current = item;
                }
            } else {
                groupedItems[item.machine_name] = {
                    current: item.status === 'running' ? item : null,
                    upcoming: item.status === 'upcoming' ? [item] : [],
                    completed: item.status === 'completed' ? [item] : [],
                };
            }
        });

        return groupedItems;
    };

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div>
                <SearchInTable fields={searchFields} />

                <div className="mt-5 border-[3px] border-x-[1px] border-b-0 rounded-t-lg  rounded-b-none p-2 rounded-lg mb-12 ">
                    <h3 className="text-2xl text-purple-700  font-semibold text-center">
                        Schedule
                    </h3>
                </div>

                {Object.entries(
                    groupItemsByMachine([...completedItems, ...currentItems, ...upcomingItems])
                ).map(([machineName, items]) => (
                    <div key={machineName} className="mb-10 border p-5 max-w-full">
                        {/* Machine Name */}
                        <div className="text-center text-xl mb-4">
                            <h1>
                                <span className="font-bold">Machine Name:</span> {machineName}
                            </h1>
                            <hr className="mt-2 w-[0px] mx-auto" />
                        </div>

                        {/* Machine Status Cards */}
                        <div className="grid grid-cols-3 gap-10">
                            <div className="">
                                <h1 className="text-center text-xl font-semibold ">Previous</h1>
                                <hr className="mt-2 mb-6" />
                                <EmblaCarousel
                                    status="completed"
                                    machine_name={machineName}
                                    data={items.completed}
                                />
                            </div>

                            <div className="">
                                <h1 className="text-center text-xl font-semibold  ">Current</h1>
                                <hr className="mt-2 mb-6" />
                                <StatusCard title="Current" data={items.current} />
                            </div>

                            <div className="">
                                <h1 className="text-center text-xl font-semibold">Upcoming</h1>
                                <hr className="mt-2 mb-6" />
                                <EmblaCarousel
                                    status="upcoming"
                                    machine_name={machineName}
                                    data={items.upcoming}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Suspense>
    );
}
