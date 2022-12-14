import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';
import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { HiOutlinePencil, HiOutlineX, HiX } from 'react-icons/hi';
import { KeyedMutator } from 'swr';

import axiosClient from '@/lib/axios';
import clsxm from '@/lib/clsxm';
import useDialog from '@/hooks/useDialog';

import Button from '@/components/buttons/Button';

import { DEFAULT_TOAST_MESSAGE } from '@/constant/toast';

import BuyerRegister from '../register/form/BuyerRegister';

import { ApiReturn, Buyer } from '@/types/api';

type BuyerActionProps = {
  data: Buyer;
  mutate: KeyedMutator<ApiReturn<Buyer[]>>;
};

type EditData = Pick<Buyer, 'name' | 'email' | 'phone_number'>;

const BuyerAction = ({ data, mutate }: BuyerActionProps) => {
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
    toast.promise(
      axiosClient
        .post('/buyer/update', {
          ...input,
          id: data.id,
        })
        .then(() => {
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
          Hapus Data Pembeli <span className='font-bold'>{data.name}</span>
        </>
      ),
      description:
        'Setelah Data Pembeli terhapus maka data tidak bisa dikembalikan, apakah Anda yakin?',
      submitText: 'Hapus',
      variant: 'danger',
    }).then(() => {
      toast.promise(
        axiosClient.delete('/buyer/delete').then(() => {
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
                      Edit Data Pembeli
                    </Dialog.Title>
                  </div>
                </div>
                <FormProvider {...methods}>
                  <form onSubmit={handleSubmit(onUpdate)} className='mt-8'>
                    <div className='space-y-6'>
                      <BuyerRegister />
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

export default BuyerAction;
