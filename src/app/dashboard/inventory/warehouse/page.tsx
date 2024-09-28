import { RiFolderAddLine } from 'react-icons/ri';
import CRUDDataTable from '../../_components/crud-data-table/CRUDDataTable';
import AddWarehouseForm from './_components/AddWarehouseForm';

export default async function Warehouse() {
    return (
        <CRUDDataTable
            title="Warehouse"
            columns={['Warehouse Name']}
            rows={[['Mirpur DOHS'], ['Uttara']]}
            width={600}
            checkbox={false}
            actionField
            withAddNew
            optionsForAddNew={{
                modalOpenerTitle: {
                    text: 'New',
                    icon: <RiFolderAddLine />,
                    className:
                        'btn btn-sm bg-[#682FE6] text-white px-5 hover:border-purple-700 hover:text-purple-700 transition-all  duration-500',
                },
                modalTitle: 'Add Warehouse',
                modalBody: <AddWarehouseForm />,
            }}
        />
    );
}
