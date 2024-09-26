import { RiFolderAddLine } from 'react-icons/ri';
import CRUDDataTable from '../../_components/crud-data-table/CRUDDataTable';
import AddInventoryForm from './_components/AddInventoryForm';

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
            withImport
            handleExport={async () => {
                'use server';

                console.log('Exporting data');
            }}
            handleImport={async () => {
                'use server';

                console.log('Importing data');
            }}
            withAddNew
            modalOpenerTitle={
                <>
                    <RiFolderAddLine /> New
                </>
            }
            modalTitle="Add Inventory Item"
            modalBody={<AddInventoryForm />}
        />
    );
}
