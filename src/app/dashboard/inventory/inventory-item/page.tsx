import { LuImport } from 'react-icons/lu';
import { RiFolderAddLine } from 'react-icons/ri';
import CRUDDataTable from '../../_components/crud-data-table/CRUDDataTable';
import AddInventoryForm from './_components/AddInventoryForm';
import ImportInventoryFromFile from './_components/ImportInventoryFromFile';

export default async function InventoryItem() {
    return (
        <CRUDDataTable
            title="Inventory Item"
            columns={['Name', 'Units left', 'Code/SKU', 'Description', 'Active/Inactive']}
            rows={[
                [
                    'iPhone 16',
                    '20000000',
                    '1351DFA65',
                    'Any kind of description according to the product',
                    'True',
                ],
            ]}
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
                modalTitle: 'Add Inventory Item',
                modalBody: <AddInventoryForm />,
            }}
        />
    );
}
