import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';
import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { HiOutlinePencil, HiOutlineX, HiX } from 'react-icons/hi';
import { KeyedMutator } from 'swr';

import axiosClient from '@/lib/axios';
import clsxm from '@/lib/clsxm';
import { formatDateForAPI } from '@/lib/date';
import useDialog from '@/hooks/useDialog';

import Button from '@/components/buttons/Button';
import DatePicker from '@/components/forms/DatePicker';
import Input from '@/components/forms/Input';
import SelectInput from '@/components/forms/SelectInput';
import TextArea from '@/components/forms/TextArea';

import { genderOption, positionOption } from '@/constant/form';
import { DEFAULT_TOAST_MESSAGE } from '@/constant/toast';

import { ApiReturn, Employee } from '@/types/api';

type EmployeeActionProps = {
  data: Employee;
  mutate: KeyedMutator<ApiReturn<Employee[]>>;
};

type EditData = Pick<
  Employee,
  | 'name'
  | 'email'
  | 'gender'
  | 'address'
  | 'date_of_birth'
  | 'place_of_birth'
  | 'position'
  | 'phone_number'
>;

const EmployeeAction = ({ data, mutate }: EmployeeActionProps) => {
  const dialog = useDialog();

  // edit modal state
  const [isEdit, setIsEdit] = React.useState(false);

  //#region  //*=========== Form ===========
  const methods = useForm<EditData>({
    mode: 'onTouched',
    defaultValues: data,
  });

  const {
    handleSubmit,
    reset,
    formState: { isDirty },
  } = methods;
  //#endregion  //*======== Form ===========

  //#region  //*=========== API Calls ===========
  const onUpdate: SubmitHandler<EditData> = (input) => {
    const mappedData = {
      employeId: data.id,
      name: input.name,
      email: input.email,
      gender: input.gender,
      address: input.address,
      place_of_birth: input.place_of_birth,
      date_of_birth: formatDateForAPI(new Date(input.date_of_birth)),
      position: input.position,
      phone_number: input.phone_number,
    };

    toast.promise(
      axiosClient.post('/employee/update', mappedData).then(() => {
        mutate();
        closeModal();
      }),
      {
        ...DEFAULT_TOAST_MESSAGE,
        loading: 'Mengubah data',
        success: 'Data berhasil diubah',
      }
    );
  };

  const onDelete = () => {
    dialog({
      title: (
        <>
          Hapus Data Karyawan <span className='font-bold'>{data.name}</span>
        </>
      ),
      description:
        'Setelah Data Karyawan terhapus maka data tidak bisa dikembalikan, apakah Anda yakin?',
      submitText: 'Hapus',
      variant: 'danger',
    }).then(() => {
      toast.promise(
        axiosClient
          .post('/employee/delete', {
            id: data.id,
          })
          .then(() => {
            mutate();
          }),
        {
          ...DEFAULT_TOAST_MESSAGE,
          loading: 'Menghapus data',
          success: 'Data berhasil dihapus',
        }
      );
    });
  };

  //#endregion  //*======== API Calls ===========

  //#region  //*=========== Modal ===========
  const closeModal = () => {
    setIsEdit(false);
    reset();
  };
  //#endregion  //*======== Modal ===========

  return (
    <>
      <div className='flex gap-2 justify-end'>
        {/* Edit Button */}
        <Button variant='ghost' onClick={() => setIsEdit(true)}>
          <span className='inline-flex gap-2'>
            <HiOutlinePencil size={16} /> <p>Ubah</p>
          </span>
        </Button>
        {/* Close Button */}
        <Button variant='ghost' className={clsx()} onClick={() => onDelete()}>
          <HiX size={16} />
        </Button>
      </div>
      {/* Edit Modal */}
      <Transition.Root show={isEdit} as={React.Fragment}>
        <Dialog
          as='div'
          static
          className='overflow-y-auto fixed inset-0 z-40'
          onClose={setIsEdit}
        >
          <div className='flex justify-center items-end px-4 pt-4 pb-20 min-h-screen text-center sm:block sm:p-0'>
            <Transition.Child
              as={React.Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity' />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className='hidden sm:inline-block sm:h-screen sm:align-middle'
              aria-hidden='true'
            >
              &#8203;
            </span>
            <Transition.Child
              as={React.Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <div className='inline-block overflow-hidden z-auto px-4 pt-5 pb-4 w-full text-left align-bottom bg-white rounded-lg shadow-xl transition-all transform sm:p-6 sm:my-8 sm:max-w-lg sm:align-middle'>
                <div className='hidden absolute top-0 right-0 pt-4 pr-4 sm:block'>
                  <button
                    type='button'
                    className={clsxm(
                      'text-gray-400 bg-white rounded-md hover:text-gray-500',
                      'focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:outline-none',
                      'disabled:filter disabled:brightness-90 disabled:cursor-wait'
                    )}
                    onClick={closeModal}
                  >
                    <span className='sr-only'>Close</span>
                    <HiOutlineX className='w-6 h-6' aria-hidden='true' />
                  </button>
                </div>
                <div className='sm:flex sm:items-center'>
                  <div
                    className={clsxm(
                      'flex flex-shrink-0 justify-center items-center rounded-full',
                      'mx-auto w-12 h-12 sm:mx-0 sm:w-10 sm:h-10',
                      'bg-yellow-100'
                    )}
                  >
                    <HiOutlinePencil
                      className={clsxm('w-6 h-6', 'text-yellow-500')}
                      aria-hidden='true'
                    />
                  </div>
                  <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                    <Dialog.Title
                      as='h3'
                      className='text-lg font-medium leading-6 text-gray-900'
                    >
                      Edit Data Karyawan
                    </Dialog.Title>
                  </div>
                </div>
                <FormProvider {...methods}>
                  <form onSubmit={handleSubmit(onUpdate)} className='mt-8'>
                    <div className='space-y-6'>
                      <Input
                        id='name'
                        label='Nama'
                        validation={{ required: 'Nama harus diisi' }}
                      />
                      <Input
                        id='email'
                        label='Email'
                        validation={{ required: 'Email harus diisi' }}
                      />
                      <Input
                        id='phone_number'
                        label='Nomor Telepon'
                        helperText='contoh : 081234567890'
                        validation={{ required: 'Nomor Telepon harus diisi' }}
                      />

                      <SelectInput
                        id='gender'
                        label='Jenis Kelamin'
                        validation={{
                          required: 'Jenis Kelamin harus diisi',
                        }}
                      >
                        {genderOption.map((item) => (
                          <option key={item.value} value={item.value}>
                            {item.name}
                          </option>
                        ))}
                      </SelectInput>

                      <SelectInput
                        id='position'
                        label='Jabatan'
                        validation={{
                          required: 'Jabatan harus diisi',
                        }}
                      >
                        {positionOption.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </SelectInput>

                      <div className='grid grid-cols-2 gap-4'>
                        <DatePicker
                          id='date_of_birth'
                          label='Tanggal Lahir'
                          placeholder='dd/mm/yyyy'
                          maxDate={new Date()}
                          validation={{ required: 'Tanggal lahir harus diisi' }}
                        />
                        <Input
                          id='place_of_birth'
                          label='Tempat Lahir'
                          validation={{ required: 'Tempat lahir harus diisi' }}
                        />
                      </div>
                      <TextArea
                        id='address'
                        label='Alamat'
                        validation={{ required: 'Alamat harus diisi' }}
                      />
                    </div>

                    <div className='mt-12 sm:flex sm:flex-row-reverse sm:mt-8'>
                      <Button
                        disabled={!isDirty}
                        type='submit'
                        className={clsxm(
                          '!font-medium justify-center items-center w-full sm:ml-3 sm:w-auto sm:text-sm'
                        )}
                      >
                        Simpan
                      </Button>
                      <Button
                        type='button'
                        variant='outline'
                        onClick={closeModal}
                        className={clsx(
                          '!font-medium justify-center items-center mt-3 w-full sm:mt-0 sm:w-auto sm:text-sm'
                        )}
                      >
                        Batal
                      </Button>
                    </div>
                  </form>
                </FormProvider>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default EmployeeAction;
