'use client';

import { InputField, ListResponse } from '@/app/_lib/utils';
import GenericCRUD from '@/app/dashboard/_components/generic-crud/GenericCRUD';
import { Dispatch, SetStateAction, Suspense, useEffect, useState } from 'react';
import { InventoryItem } from '../../inventory-item/_lib/utils';
import { IWarehouse } from '../_lib/utils';

interface Props {
    warehouseItems: IWarehouse[];
    itemFields: InputField[];
    createItem: (item: Omit<IWarehouse, 'id'>) => Promise<{
        success: boolean;
        errors: {
            [key: string]: string;
        } | null;
    }>;
    updateItem: (item: IWarehouse) => Promise<{
        success: boolean;
        errors: {
            [key: string]: string;
        } | null;
    }>;
    deleteItem: (id: IWarehouse['id']) => Promise<void>;
    getInventoryItems: (query?: { [key: string]: string }) => Promise<ListResponse<InventoryItem>>;
}

function ItemName({
    item,
    currentItem,
    setCurrentItem,
}: Readonly<{
    item: IWarehouse;
    currentItem: IWarehouse | null;
    setCurrentItem: Dispatch<SetStateAction<IWarehouse | null>>;
}>) {
    return (
        <button
            type="button"
            onClick={() => setCurrentItem(item)}
            className={`${currentItem?.id === item.id ? 'text-link underline italic' : ''} hover:text-link duration-75`}
        >
            {item.name}
        </button>
    );
}

function TableWrapper({
    warehouseItems,
    itemFields,
    createItem,
    updateItem,
    deleteItem,
    getInventoryItems,
}: Readonly<Props>) {
    const [currentItem, setCurrentItem] = useState<IWarehouse | null>(null);
    const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);

    useEffect(() => {
        const fetchInventoryItems = async () => {
            if (currentItem?.name) {
                const filteredInventoryItems = await getInventoryItems({
                    warehouse: currentItem?.name,
                });
                setInventoryItems(filteredInventoryItems?.results || []);
            }
        };
        fetchInventoryItems();
    }, [currentItem?.name, getInventoryItems]);

    return (
        <div className="flex justify-between gap-10">
            <Suspense fallback={<div>Loading...</div>}>
                <GenericCRUD
                    pageTitle="Warehouse"
                    width={700}
                    tableConfig={{
                        tableColumns: ['Name', 'Location', 'Description'],
                        tableRows: warehouseItems.map((item) => [
                            <ItemName
                                key={item.id}
                                item={item}
                                currentItem={currentItem}
                                setCurrentItem={setCurrentItem}
                            />,
                            item.location,
                            item.description,
                        ]),
                        items: warehouseItems,
                        updateItem,
                        deleteItem,
                    }}
                    formConfig={{
                        createItem,
                        fields: itemFields,
                    }}
                    modalTitles={{
                        create: 'Create service',
                        edit: 'Edit service',
                    }}
                />
            </Suspense>

            {currentItem && (
                <Suspense fallback={<div>Loading...</div>}>
                    <GenericCRUD
                        pageTitle="Inventory Item"
                        width={800}
                        tableConfig={{
                            tableColumns: [
                                'Name',
                                'Units left',
                                'Code/SKU',
                                'Description',
                                'Active/Inactive',
                            ],
                            tableRows: inventoryItems.map((item) => [
                                item.name,
                                item.quantity_on_warehouse,
                                item.code,
                                item.description,
                                item.quantity_on_warehouse > 0 ? (
                                    <span className="text-[#038F65]">True</span>
                                ) : (
                                    <span className="text-[#E9000E]">False</span>
                                ),
                            ]),
                            items: inventoryItems,
                            noTableAction: true,
                        }}
                        formConfig={{
                            noAction: true,
                        }}
                    />
                </Suspense>
            )}
        </div>
    );
}

export default TableWrapper;
