'use client';

import Input from '@/app/_components/Input';
import { formatDateTimestamp, FormState, InputField } from '@/app/_lib/utils';
import { differenceInSeconds } from 'date-fns';
import { useCallback, useState } from 'react';
import { useFormState } from 'react-dom';
import SelectProductionEnd from '../../mold-time-sheet/_components/SelectProductionEnd';
import { IMoldTimeSheet } from '../../mold-time-sheet/_lib/utils';
import { IInputProduction } from '../_lib/utils';
import ResinInput from './ResinInput';
import SelectMoldTimeSheet from './SelectMoldTimeSheet';

interface ItemFormProps {
    fields: InputField[];
    currentItem: IInputProduction | null;
    handleSubmit: (
        item: IInputProduction,
        endpoint?: string
    ) => Promise<{
        success: boolean;
        errors: {
            [key: string]: string;
        };
    }>;
    closeModal: () => void;
}

function InputProductionForm({
    fields,
    currentItem,
    handleSubmit,
    closeModal,
}: Readonly<ItemFormProps>) {
    const [selectedMoldTimeSheet, setSelectedMoldTimeSheet] = useState<IMoldTimeSheet | null>(null);
    const [productionEnd, setProductionEnd] = useState<Date | null>(null);
    const [trackedInputs, setTrackedInputs] = useState<{
        total_counter: number;
        rejected_counter: number;
        avg_pushing_weight: number;
    }>({
        total_counter: 0,
        rejected_counter: 0,
        avg_pushing_weight: 0,
    });

    const calculateConsumptionVariance = useCallback(() => {
        if (!selectedMoldTimeSheet) return '';

        const qcPassedCounter = trackedInputs.total_counter - trackedInputs.rejected_counter;

        return (
            (selectedMoldTimeSheet.total_cavity_weight - trackedInputs.avg_pushing_weight) *
            qcPassedCounter
        );
    }, [
        selectedMoldTimeSheet,
        trackedInputs.avg_pushing_weight,
        trackedInputs.total_counter,
        trackedInputs.rejected_counter,
    ]);

    const calculateRevisedTarget = useCallback(() => {
        if (!selectedMoldTimeSheet || !productionEnd) return '';

        const productionDuration = differenceInSeconds(
            new Date(productionEnd),
            new Date(selectedMoldTimeSheet.production_from)
        );

        return Math.floor(productionDuration / selectedMoldTimeSheet.average_cycle_time);
    }, [selectedMoldTimeSheet, productionEnd]);

    const initialState: FormState = {
        errors: null,
        success: false,
    };

    const [itemFormState, formSubmitAction] = useFormState(
        async (prevState: FormState, formData: FormData) => {
            const inputProduction = {} as IInputProduction;
            if (currentItem?.id) inputProduction.id = currentItem.id;

            [...formData.entries()].forEach(([key, value]) => {
                if (!key.includes('$ACTION_ID_')) inputProduction[key] = value;
            });

            inputProduction.consumption_variance = calculateConsumptionVariance();
            inputProduction.revised_target = calculateRevisedTarget();
            inputProduction.pushing_weight = selectedMoldTimeSheet?.total_cavity_weight;

            const timeSheetId = inputProduction.mold_time_sheet as string;

            const endpoint = `/injection/mold-timesheet/${timeSheetId}/production/`;

            delete inputProduction.mold_time_sheet;
            delete inputProduction.production_end;

            // console.log({
            //     inputProduction,
            //     timeSheetId,
            //     endpoint,
            // });
            // return { success: false, errors: null };

            const currentFormState = await handleSubmit(inputProduction, endpoint);

            if (currentFormState?.errors) {
                return { errors: currentFormState.errors, success: false };
            }

            if (currentFormState.success) closeModal();

            return { success: !!currentFormState?.success, errors: null };
        },
        initialState
    );

    const renderInput = (field: InputField) => {
        if (['mold_time_sheet'].includes(field.name))
            return <SelectMoldTimeSheet field={field} setItem={setSelectedMoldTimeSheet} />;

        if (['production_end'].includes(field.name))
            return (
                <SelectProductionEnd
                    field={field}
                    error={itemFormState.errors?.[field.name]}
                    productionEnd={productionEnd}
                    setProductionEnd={setProductionEnd}
                />
            );

        if (['total_counter', 'rejected_counter', 'avg_pushing_weight'].includes(field.name))
            return (
                <div>
                    <label className="font-medium text-gray-600" htmlFor={field.name}>
                        {field.label}
                    </label>

                    <input
                        id={field.name}
                        placeholder={field.placeholder}
                        type={field.type}
                        name={field.name}
                        minLength={field.minLength}
                        required={field.required}
                        disabled={field.disabled}
                        defaultValue={field.defaultValue}
                        className="border placeholder-gray-400 focus:outline-none focus:border-blue-500  w-full p-2 text-sm border-gray-300 rounded-input-radius text-black autofill:text-black"
                        value={trackedInputs[field.name as keyof typeof trackedInputs] || ''}
                        onChange={(e) =>
                            setTrackedInputs((prev) => ({
                                ...prev,
                                [field.name]: Number(e.target.value),
                            }))
                        }
                    />
                </div>
            );

        return (
            <Input
                field={{
                    ...field,
                    ...(currentItem?.[field.name as keyof IInputProduction]
                        ? {
                              defaultValue: currentItem[field.name as keyof IInputProduction],
                          }
                        : {}),
                    ...(field.name === 'mold_item_number'
                        ? {
                              defaultValue: selectedMoldTimeSheet?.mold_item_number,
                          }
                        : {}),
                    ...(field.name === 'mold_name'
                        ? {
                              defaultValue: selectedMoldTimeSheet?.mold_name,
                          }
                        : {}),
                    ...(field.name === 'machine'
                        ? {
                              defaultValue: selectedMoldTimeSheet?.machine_name,
                          }
                        : {}),
                    ...(field.name === 'start_time'
                        ? {
                              defaultValue: formatDateTimestamp(
                                  selectedMoldTimeSheet?.production_from
                              ),
                          }
                        : {}),
                    ...(field.name === 'consumption_variance'
                        ? {
                              defaultValue: calculateConsumptionVariance(),
                          }
                        : {}),
                    ...(field.name === 'revised_target'
                        ? {
                              defaultValue: calculateRevisedTarget(),
                          }
                        : {}),
                    ...(field.name === 'qc_passed_counter'
                        ? {
                              defaultValue:
                                  trackedInputs.total_counter - trackedInputs.rejected_counter ||
                                  '',
                          }
                        : {}),
                    ...(field.name === 'pushing_weight'
                        ? {
                              defaultValue: selectedMoldTimeSheet?.total_cavity_weight,
                          }
                        : {}),
                }}
                error={itemFormState.errors?.[field.name]}
            />
        );
    };

    return (
        <form action={formSubmitAction} className="flex flex-col gap-6">
            <div className="max-h-[40rem] grid grid-cols-3 gap-x-5 gap-y-4">
                {fields.map((field) => (
                    <div key={field.name} className={field.fullWidth ? 'col-span-3' : ''}>
                        {renderInput(field)}
                    </div>
                ))}

                <div className="col-span-3">
                    <ResinInput />
                </div>
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

export default InputProductionForm;
