'use client';

import Modal from '@/app/dashboard/_components/Modal';
import useModal from '@/app/dashboard/_hooks/useModal';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function Report() {
    const { modalRef, openModal } = useModal();

    return (
        <>
            <button
                type="button"
                className="btn btn-sm border border-[#682FE6] rounded-btn text-principal px-5 hover:border-purple-700 hover:text-purple-700 transition-all  duration-500"
                onClick={openModal}
            >
                Report
            </button>

            <Modal ref={modalRef} maxWidth={1000}>
                <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold">Dhaka Style</h1>
                        <p className="text-sm text-gray-600">Uttara Branch 20, Road 17, House 58</p>
                        <p className="text-sm text-gray-600">
                            <span className="mr-4">dhakastyle2020@gmail.com</span>
                            <span>01988899334</span>
                        </p>
                    </div>

                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-xl font-semibold">Stock Journal</h2>
                            <p className="text-sm text-gray-600">Stock Journal No: SJN</p>
                        </div>
                        <p className="text-sm text-gray-600">Date: 01/27/2024</p>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">Source (Consumption)</h3>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[50px]">S. No.</TableHead>
                                    <TableHead>Description of Goods</TableHead>
                                    <TableHead>Warehouse</TableHead>
                                    <TableHead>Batch</TableHead>
                                    <TableHead>Brand</TableHead>
                                    <TableHead>Mfg Date</TableHead>
                                    <TableHead>Exp Date</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Rate</TableHead>
                                    <TableHead>Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>1</TableCell>
                                    <TableCell>Cake</TableCell>
                                    <TableCell>Main Location</TableCell>
                                    <TableCell />
                                    <TableCell />
                                    <TableCell />
                                    <TableCell />
                                    <TableCell>10</TableCell>
                                    <TableCell>50</TableCell>
                                    <TableCell>500</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={7} className="text-right font-semibold">
                                        Total
                                    </TableCell>
                                    <TableCell>10</TableCell>
                                    <TableCell />
                                    <TableCell>500</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>

                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2">Destination (Production)</h3>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[50px]">S. No.</TableHead>
                                    <TableHead>Description of Goods</TableHead>
                                    <TableHead>Warehouse</TableHead>
                                    <TableHead>Batch</TableHead>
                                    <TableHead>Brand</TableHead>
                                    <TableHead>Mfg Date</TableHead>
                                    <TableHead>Exp Date</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Rate</TableHead>
                                    <TableHead>Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>1</TableCell>
                                    <TableCell>Cake</TableCell>
                                    <TableCell>Uttara Outlet Factory</TableCell>
                                    <TableCell />
                                    <TableCell />
                                    <TableCell />
                                    <TableCell />
                                    <TableCell>10</TableCell>
                                    <TableCell>50</TableCell>
                                    <TableCell>500</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={7} className="text-right font-semibold">
                                        Total
                                    </TableCell>
                                    <TableCell>10</TableCell>
                                    <TableCell />
                                    <TableCell>500</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>

                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-2">Remarks:</h3>
                        <p className="text-sm text-gray-600">
                            We declare that this invoice shows the actual price of the goods
                            described and that all particulars are true & correct.
                        </p>
                    </div>
                </div>
            </Modal>
        </>
    );
}
