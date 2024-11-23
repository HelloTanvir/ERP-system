import { formatDateTimestamp } from '@/app/_lib/utils';
import { IMoldTimeSheet } from '../../mold-time-sheet/_lib/utils';

interface Props {
    title: 'Previous' | 'Current' | 'Upcoming';
    data: IMoldTimeSheet | null;
}

export default function StatusCard({ title, data }: Readonly<Props>) {
    const calculateProgress = (): number => {
        if (!data) return 0;
        const productionFrom = new Date(data.production_from).getTime();
        const productionEnd = new Date(data.production_end).getTime();
        const currentTime = new Date().getTime();

        const total = productionEnd - productionFrom;
        const current = currentTime - productionFrom;

        return Math.floor((current / total) * 100);
    };

    if (!data)
        return (
            <div className="rounded-lg min-h-[250px] bg-gray-100 border-gray-400 flex justify-center items-center text-xl text-muted-foreground border">
                No data available
            </div>
        );

    return (
        <div
            className={`p-6 rounded-lg min-h-[250px] transition duration-300 hover:scale-110 ${
                {
                    Previous: 'bg-gray-100 border border-gray-400',
                    Current: 'bg-green-100 shadow-2xl border border-green-400',
                }[title] || 'bg-yellow-100 border border-yellow-400'
            }`}
        >
            <div className="space-y-2">
                <p>
                    <span className="font-semibold">Mold Name: </span>
                    <span>{data?.mold_name}</span>
                </p>
                <p>
                    <span className="font-semibold">Start Time: </span>
                    <span>{formatDateTimestamp(data?.production_from)}</span>
                </p>
                <p>
                    <span className="font-semibold">End Time: </span>
                    <span>{formatDateTimestamp(data?.production_end)}</span>
                </p>
                {title === 'Current' && (
                    <p>
                        <span className="font-semibold">Progress (approx.): </span>
                        <span>{calculateProgress()}%</span>
                    </p>
                )}
            </div>
        </div>
    );
}
