'use client';

import Input from '@/app/_components/Input';
import { addMinutesToDateTimestamp, FormState, InputField } from '@/app/_lib/utils';
import { differenceInHours, format } from 'date-fns';
import { useCallback, useState } from 'react';
import { useFormState } from 'react-dom';
import { IMachine } from '../../machine/_lib/utils';
import { IMoldRegister } from '../../mold-register/_lib/utils';
import { INonProductionTimeRecord } from '../../non-production-time-record/_lib/utils';
import { IMoldTimeSheet } from '../_lib/utils';
import SelectMoldOrMachineOrInactiveFrom from './SelectMoldOrMachineOrInactiveFrom';
import SelectProductionEnd from './SelectProductionEnd';

interface ItemFormProps {
    fields: InputField[];
    currentItem: IMoldTimeSheet | null;
    status?: IMoldTimeSheet['status'];
    handleSubmit: (item: IMoldTimeSheet) => Promise<{
        success: boolean;
        errors: {
            [key: string]: string;
        };
    }>;
    closeModal: () => void;
}

function MoldTimeSheetForm({
    fields,
    currentItem,
    status,
    handleSubmit,
    closeModal,
}: Readonly<ItemFormProps>) {
    const [selectedMold, setSelectedMold] = useState<IMoldRegister | null>(null);
    const [selectedMachine, setSelectedMachine] = useState<IMachine | null>(null);
    const [selectedDownTime, setSelectedDownTime] = useState<INonProductionTimeRecord | null>(null);
    const [productionEnd, setProductionEnd] = useState<Date | null>(null);

    const calculateTargetProduction = useCallback(() => {
        if (!selectedMold || !selectedDownTime) return null;

        const productionDuration = differenceInHours(
            new Date(productionEnd),
            new Date(selectedDownTime.inactive_to)
        );

        return selectedMold.hourly_production_rate * productionDuration;
    }, [selectedMold, selectedDownTime, productionEnd]);

    const initialState: FormState = {
        errors: null,
        success: false,
    };

    const [itemFormState, formSubmitAction] = useFormState(
        async (prevState: FormState, formData: FormData) => {
            const moldTimeSheet = {} as IMoldTimeSheet;
            if (currentItem?.id) moldTimeSheet.id = currentItem.id;

            [...formData.entries()].forEach((entry) => {
                const [key, value] = entry;
                if (!key.includes('$ACTION_ID_')) moldTimeSheet[key] = value;
            });

            moldTimeSheet.downtime_from = selectedDownTime?.inactive_from;
            moldTimeSheet.production_from = format(
                addMinutesToDateTimestamp(selectedDownTime?.inactive_to || '', 1),
                'yyyy-MM-dd HH:mm:ss'
            );
            moldTimeSheet.production_end = format(
                productionEnd || new Date(),
                'yyyy-MM-dd HH:mm:ss'
            );
            moldTimeSheet.target_production = calculateTargetProduction() || 0;

            if (status) moldTimeSheet.status = status;

            const currentFormState = await handleSubmit(moldTimeSheet);

            if (currentFormState?.errors) {
                return { errors: currentFormState.errors, success: false };
            }

            if (currentFormState.success) closeModal();

            return { success: !!currentFormState?.success, errors: null };
        },
        initialState
    );

    const getSetter = (field: InputField) => {
        switch (field.name) {
            case 'mold_register':
                return setSelectedMold;
            case 'machine':
                return setSelectedMachine;
            case 'downtime':
                return setSelectedDownTime;
            default:
                return () => {};
        }
    };

    const renderInput = (field: InputField) => {
        if (['mold_register', 'machine', 'downtime'].includes(field.name))
            return (
                <SelectMoldOrMachineOrInactiveFrom
                    key={field.name === 'downtime' ? selectedMachine?.id : field.name}
                    field={{
                        ...field,
                        ...(field.name === 'downtime'
                            ? {
                                  optionsGetUrl: `${
                                      field.optionsGetUrl
                                  }?machine__name=${selectedMachine?.name}`,
                                  disabled: !selectedMachine?.name,
                              }
                            : {}),
                    }}
                    setItem={getSetter(field)}
                />
            );

        if (field.name === 'production_end')
            return (
                <SelectProductionEnd
                    field={field}
                    error={itemFormState.errors?.[field.name]}
                    productionEnd={productionEnd}
                    setProductionEnd={setProductionEnd}
                />
            );

        return (
            <Input
                field={{
                    ...field,
                    placeholder: field.label,
                    ...(field.name === 'mold_item_number'
                        ? {
                              defaultValue: selectedMold?.item_number,
                          }
                        : {}),
                    ...(field.name === 'production_from'
                        ? {
                              defaultValue: addMinutesToDateTimestamp(
                                  selectedDownTime?.inactive_to,
                                  1
                              ),
                          }
                        : {}),
                    ...(field.name === 'target_production'
                        ? {
                              defaultValue: calculateTargetProduction(),
                          }
                        : {}),
                }}
                error={itemFormState.errors?.[field.name]}
            />
        );
    };

    return (
        <form action={formSubmitAction} className="flex flex-col gap-6">
            <div className=" max-h-[40rem] grid grid-cols-2 gap-x-5 gap-y-4">
                {fields.map((field) => (
                    <div key={field.name} className={field.fullWidth ? 'col-span-2' : ''}>
                        {renderInput(field)}
                    </div>
                ))}
            </div>

            <div className="flex gap-2 justify-end text-center">
                <button
                    type="button"
                    onClick={closeModal}
                    className="btn btn-sm text-purple-600 hover:bg-purple-500 hover:text-white btn-outline font-bold px-6 rounded-md"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="btn btn-sm bg-purple-500 text-white hover:bg-white hover:text-purple-500 hover:border-purple-500 btn-outline font-bold rounded-md px-8"
                >
                    Save
                </button>
            </div>
        </form>
    );
}

export default MoldTimeSheetForm;
