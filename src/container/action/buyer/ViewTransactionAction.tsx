import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import {
  HiCheck,
  HiOutlinePencil,
  HiOutlineX,
  HiTrash,
  HiX,
} from 'react-icons/hi';
import { KeyedMutator } from 'swr';

import axiosClient from '@/lib/axios';
import clsxm from '@/lib/clsxm';
import useDialog from '@/hooks/useDialog';

import Button from '@/components/buttons/Button';
import NextImage from '@/components/NextImage';

import { DEFAULT_TOAST_MESSAGE } from '@/constant/toast';
import useAuthStore from '@/store/useAuthStore';

import { ApiReturn, Payment } from '@/types/api';

type ViewTransactionActionProps = {
  data: Payment;

  mutate: KeyedMutator<ApiReturn<Payment[]>>;
};

type EditData = Pick<Payment, 'paymentImage'>;

const ViewTransactionAction = ({
  data,
  mutate,
}: ViewTransactionActionProps) => {
  const dialog = useDialog();
  const user = useAuthStore.useUser();

  // edit modal state
  const [isEdit, setIsEdit] = React.useState(false);

  //#region  //*=========== Form ===========
  const methods = useForm<EditData>({
    mode: 'onTouched',
    defaultValues: data,
  });

  const { reset } = methods;
  //#endregion  //*======== Form ===========

  //#region  //*=========== API Calls ===========

  const onCancel = () => {
    dialog({
      title: (
        <>
          Batalkan Transaksi <span className='font-bold'>{data.id}</span>
        </>
      ),
      description:
        'Setelah Transaksi terbatalkan maka data tidak bisa dikembalikan, apakah Anda yakin?',
      submitText: 'Batalkan',
      variant: 'warning',
    }).then(() => {
      toast.promise(
        axiosClient
          .post('/transaction/update', {
            idTransaction: data.id,
            idStock: data.idStock,
            statusPayment: 'cancelled',
            paymentMethod: data.paymentMethod,
            paymentImage: data.paymentImage,
            purchasedStock: data.purchasedStock,
          })
          .then(() => {
            mutate();
          }),
        {
          ...DEFAULT_TOAST_MESSAGE,
          loading: 'Membatalkan transaksi',
          success: 'Data berhasil dibatalkan',
        }
      );
    });
  };

  const onDelete = () => {
    dialog({
      title: (
        <>
          Hapus Transaksi <span className='font-bold'>{data.id}</span>
        </>
      ),
      description:
        'Setelah Transaksi terhapus maka data tidak bisa dikembalikan, apakah Anda yakin?',
      submitText: 'Hapus Transaksi',
      variant: 'danger',
    }).then(() => {
      toast.promise(
        axiosClient
          .post('/transaction/delete', {
            id: data.id,
          })
          .then(() => {
            mutate();
          }),
        {
          ...DEFAULT_TOAST_MESSAGE,
          loading: 'Menghapus transaksi',
          success: 'Data berhasil dihapus',
        }
      );
    });
  };

  const onConfirm = () => {
    dialog({
      title: (
        <>
          Konfirmasi Transaksi <span className='font-bold'>{data.id}</span>
        </>
      ),
      description:
        'Setelah Transaksi konfirmasi maka data tidak bisa dikembalikan, apakah Anda yakin?',
      submitText: 'Konfirmasi Pembayaran',
      variant: 'success',
    }).then(() => {
      toast.promise(
        axiosClient
          .post('/transaction/update', {
            idTransaction: data.id,
            idStock: data.idStock,
            statusPayment: 'confirmed',
            paymentMethod: data.paymentMethod,
            paymentImage: data.paymentImage,
            purchasedStock: data.purchasedStock,
          })
          .then(() => {
            mutate();
          }),
        {
          ...DEFAULT_TOAST_MESSAGE,
          loading: 'Mengonfirmasi transaksi',
          success: 'Data berhasil dikonfirmasi',
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
  const showConfirmationButton =
    data.statusPayment === 'pending' && user?.role !== 'buyer';

  const showCancelButton = data.statusPayment === 'pending';

  const showDeleteButton = user?.role === 'admin';
  return (
    <>
      <div className='flex gap-2 justify-end'>
        {/* Edit Button */}
        <Button variant='ghost' onClick={() => setIsEdit(true)}>
          Detail
        </Button>
        {/* Confirm Button */}
        {showConfirmationButton && (
          <Button
            variant='ghost'
            className={clsx()}
            onClick={() => onConfirm()}
          >
            <HiCheck size={16} />
          </Button>
        )}
        {/* Close Button */}
        {showCancelButton && (
          <Button variant='ghost' className={clsx()} onClick={() => onCancel()}>
            <HiX size={16} />
          </Button>
        )}
        {showDeleteButton && (
          <Button variant='ghost' className={clsx()} onClick={() => onDelete()}>
            <HiTrash size={16} />
          </Button>
        )}
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
              <div className='inline-block overflow-hidden z-auto px-4 pt-5 pb-4 w-full text-left align-bottom bg-white rounded-lg shadow-xl transition-all transform sm:p-6 sm:my-8 sm:max-w-6xl sm:align-middle'>
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
                      Detail Transaksi
                    </Dialog.Title>
                  </div>
                </div>
                <FormProvider {...methods}>
                  <div className='mt-8'>
                    <div className='grid grid-cols-2 gap-8'>
                      <div className='h-fit grid grid-cols-2 gap-4 p-4 bg-primary-50 rounded-md shadow-inner'>
                        <div className='space-y-4'>
                          <div>
                            <p className='text-xs tracking-wider text-gray-500 uppercase'>
                              Nama Barang
                            </p>
                            <p>data.name</p>
                          </div>
                          <div>
                            <p className='text-xs tracking-wider text-gray-500 uppercase'>
                              Harga/pcs
                            </p>
                            <p>{`Rp ${
                              +data.totalPayment / +data.purchasedStock
                            }`}</p>
                          </div>
                        </div>
                        <div className='space-y-4'>
                          <div>
                            <p className='text-xs tracking-wider text-gray-500 uppercase'>
                              Banyak
                            </p>
                            <p>{data.purchasedStock} pcs</p>
                          </div>
                          <div>
                            <p className='text-xs tracking-wider text-gray-500 uppercase'>
                              Metode Pembayaran
                            </p>
                            <p>{data.paymentMethod}</p>
                          </div>
                        </div>
                        <hr className='col-span-2' />
                        <p>Total</p>
                        <p className='px-4 py-2 bg-white rounded-md'>{`Rp ${data.totalPayment}`}</p>
                      </div>

                      <div className=''>
                        <p className='text-xs tracking-wider text-gray-500 uppercase'>
                          Bukti Transfer
                        </p>
                        <div className='aspect-video overflow-hidden relative w-full rounded-md border border-gray-100'>
                          <NextImage
                            useSkeleton
                            src={data.paymentImage as unknown as string}
                            layout='fill'
                            objectFit='cover'
                            alt='Bukti Pembayaran'
                            className='object-cover absolute inset-0 w-full h-full'
                          />
                        </div>
                      </div>
                    </div>

                    <div className='mt-2'></div>
                    <div className='mt-12 sm:flex sm:flex-row-reverse sm:mt-8'>
                      <Button
                        type='button'
                        variant='outline'
                        onClick={closeModal}
                        className={clsx(
                          '!font-medium justify-center items-center mt-3 w-full sm:mt-0 sm:w-auto sm:text-sm'
                        )}
                      >
                        Tutup
                      </Button>
                    </div>
                  </div>
                </FormProvider>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default ViewTransactionAction;
