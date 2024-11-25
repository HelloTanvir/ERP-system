/* eslint-disable react/no-array-index-key */
import { GenericItem } from '../../_lib/utils';

interface ItemDetailViewProps<T extends GenericItem> {
    currentItem: T | null;
}

interface PropertyViewProps {
    name: string;
    value: any;
    depth?: number;
}

function PropertyView({ name, value, depth = 0 }: Readonly<PropertyViewProps>) {
    const renderValue = () => {
        if (typeof value === 'string') {
            return <span className="text-gray-800">{value}</span>;
        }

        if (Array.isArray(value)) {
            if (value.length === 0) {
                return <span className="text-gray-500 italic">Empty array</span>;
            }

            if (typeof value[0] === 'string') {
                return (
                    <ul className="list-disc list-inside text-gray-800">
                        {value.map((item, index) => (
                            <li key={`property-view-${index}`}>{item}</li>
                        ))}
                    </ul>
                );
            }

            return (
                <div className="space-y-2">
                    {value.map((item, index) => (
                        <div
                            key={`property-view-${index}`}
                            className="border-l-2 border-gray-300 pl-4"
                        >
                            <h4 className="font-semibold text-sm text-gray-600">
                                Item {index + 1}
                            </h4>
                            {Object.entries(item).map(([key, val]) => (
                                <PropertyView key={key} name={key} value={val} depth={depth + 1} />
                            ))}
                        </div>
                    ))}
                </div>
            );
        }

        if (typeof value === 'object' && value !== null) {
            return (
                <div className="space-y-2">
                    {Object.entries(value).map(([key, val]) => (
                        <PropertyView key={key} name={key} value={val} depth={depth + 1} />
                    ))}
                </div>
            );
        }

        return <span className="text-gray-800">{String(value)}</span>;
    };

    const indentClass = depth > 0 ? 'ml-4' : '';

    return (
        <div className={`${indentClass}`}>
            <div className="flex">
                <span className="font-semibold text-gray-600 min-w-[120px]">{name}:</span>
                <div className="flex-1">{renderValue()}</div>
            </div>
        </div>
    );
}

function ItemDetailView<T extends GenericItem>({ currentItem }: Readonly<ItemDetailViewProps<T>>) {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Item Details</h1>
            <div className="space-y-4">
                {Object.entries(currentItem).map(([key, value]) => (
                    <PropertyView key={key} name={key} value={value} />
                ))}
            </div>
        </div>
    );
}

export default ItemDetailView;
