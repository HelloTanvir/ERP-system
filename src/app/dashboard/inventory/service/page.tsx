import { LuImport } from 'react-icons/lu';
import { RiFolderAddLine } from 'react-icons/ri';
import CRUDDataTable from '../../_components/crud-data-table/CRUDDataTable';

export default async function UnitOfMeasure() {
    return (
        <CRUDDataTable
            title="Services"
            columns={['Service Name', 'Service Description']}
            rows={[
                ['Packaging', 'There will be a short description'],
                ['Call rate', 'There will be a short description'],
            ]}
            width={600}
            checkbox={false}
            actionField={false}
            withImport
            withImportOptions={{
                modalOpenerTitle: {
                    text: 'Import',
                    icon: <LuImport />,
                    className:
                        'btn btn-sm  rounded-md  border-purple-700 text-purple-700 transition-all  duration-500 hover:border-yellow-600 hover:text-yellow-600',
                },
                modalTitle: 'Import csv, xls document',
                modalBody: null,
            }}
            withAddNew
            optionsForAddNew={{
                modalOpenerTitle: {
                    text: 'New',
                    icon: <RiFolderAddLine />,
                    className:
                        'btn btn-sm bg-[#682FE6] text-white px-5 hover:border-purple-700 hover:text-purple-700 transition-all  duration-500',
                },
                modalTitle: 'Add Service',
                modalBody: null,
            }}
        />
    );
}
