import { LuImport } from 'react-icons/lu';
import { RiFolderAddLine } from 'react-icons/ri';
import CRUDDataTable from '../../_components/crud-data-table/CRUDDataTable';
import AddInventoryForm from './_components/AddInventoryForm';
import ImportInventoryFromFile from './_components/ImportInventoryFromFile';
import { getInventoryItems } from './_lib/actions';

export default async function InventoryItem() {
    const inventoryItems = await getInventoryItems();

    return (
        <CRUDDataTable
            title="Inventory Item"
            columns={['Name', 'Units left', 'Code/SKU', 'Description', 'Active/Inactive']}
            rows={inventoryItems.map((item) => [
                item.name,
                item.quantity_on_warehouse,
                item.code,
                item.description,
                item.quantity_on_warehouse > 0 ? 'True' : 'False',
            ])}
            withCheckbox
            withActionField
            withExport
            handleExport={async () => {
                'use server';

                console.log('Exporting data');
            }}
            withImport
            withImportOptions={{
                modalOpenerTitle: {
                    text: 'Import',
                    icon: <LuImport />,
                    className:
                        'btn btn-sm  rounded-md  border-purple-700 text-purple-700 transition-all  duration-500 hover:border-yellow-600 hover:text-yellow-600',
                },
                modalTitle: 'Import csv, xls document',
                modalBody: <ImportInventoryFromFile />,
            }}
            withAddNew
            optionsForAddNew={{
                modalOpenerTitle: {
                    text: 'New',
                    icon: <RiFolderAddLine />,
                    className:
                        'btn btn-sm bg-[#682FE6] text-white px-5 hover:border-purple-700 hover:text-purple-700 transition-all  duration-500',
                },
                modalTitle: 'Add Item',
                modalBody: <AddInventoryForm />,
            }}
        />
    );
}
