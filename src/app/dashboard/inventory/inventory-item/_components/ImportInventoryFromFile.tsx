import Input from '@/app/_components/Input';
import { importInventoryFromFile } from '../_lib/actions';

function ImportInventoryFromFile() {
    return (
        <form action={importInventoryFromFile} className="flex flex-col gap-6">
            <div className="overflow-y-auto max-h-[40rem]">
                <Input
                    field={{
                        label: 'Upload file here',
                        name: 'file',
                        type: 'multiple-drag-drop-file',
                        required: true,
                        accept: {
                            'text/csv': ['.csv'],
                            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
                                '.xlsx',
                            ],
                            'application/vnd.ms-excel': ['.xls'],
                        },
                    }}
                />
            </div>

            <div className="flex gap-2 justify-end text-center">
                <button
                    type="button"
                    data-modal-close
                    className="btn btn-sm transition duration-500 text-purple-600 hover:bg-purple-500 hover:text-white hover:purple-cyan-300 btn-outline font-bold  px-6 rounded-md"
                >
                    Cancel
                </button>

                <button
                    type="button"
                    className="btn btn-sm transition duration-500 bg-purple-500  text-white hover:bg-white hover:text-purple-500 hover:border-purple-500 btn-outline font-bold rounded-md  px-8"
                >
                    Save
                </button>
            </div>
        </form>
    );
}

export default ImportInventoryFromFile;
