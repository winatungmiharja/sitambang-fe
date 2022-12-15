import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useRouter } from 'next/router';
import React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { HiOutlinePencil, HiOutlineX, HiPlus } from 'react-icons/hi';
import { KeyedMutator } from 'swr';

import axiosClient from '@/lib/axios';
import clsxm from '@/lib/clsxm';

import Button from '@/components/buttons/Button';
import DropzoneInput from '@/components/forms/DropzoneInput';
import ScaleInput from '@/components/forms/ScaleInput';
import SelectInput from '@/components/forms/SelectInput';

import { storage } from '@/../firebase/initFirebase';
import { paymentMethodOption } from '@/constant/form';
import { DEFAULT_TOAST_MESSAGE } from '@/constant/toast';
import useAuthStore from '@/store/useAuthStore';

import { ApiReturn, Payment, Stocks } from '@/types/api';
import { FileWithPreview } from '@/types/dropzone';

type AddTransactionActionProps = {
  data: Stocks;
  mutate: KeyedMutator<ApiReturn<Stocks[]>>;
};

type EditData = Pick<Stocks, 'name' | 'totalStocks'> &
  Pick<Payment, 'paymentMethod' | 'paymentImage' | 'purchasedStock'> & {
    category: number;
  };

const AddTransactionAction = ({ data, mutate }: AddTransactionActionProps) => {
  const router = useRouter();
  // edit modal state
  const [isEdit, setIsEdit] = React.useState(false);
  const user = useAuthStore.useUser();

  //#region  //*=========== Form ===========
  const methods = useForm<EditData>({
    mode: 'onTouched',
    defaultValues: {
      name: data.name,
      purchasedStock: 1,
      category: 0,
    },
  });

  const { handleSubmit, reset, getValues } = methods;
  //#endregion  //*======== Form ===========

  //#region  //*=========== Firebase ===========
  const uploadToFirebase = async (
    file: FileWithPreview,
    folderName: string,
    fileName: string
  ) => {
    toast.loading(`Mengupload Berkas...`);
    const uploadTask = ref(storage, `${folderName}/${fileName}`);
    const uploadImage = uploadBytes(uploadTask, file);
    const url = await uploadImage.then((snapshot) =>
      getDownloadURL(snapshot.ref)
    );

    return url;
  };
  const uploadAllFile = async (data: EditData) => {
    if (!data.paymentImage) {
      toast.error('Harap mengupload ulang gambar anda');
      return { url: '', success: false, message: 'File didnt exist' };
    }
    try {
      const proof = await uploadToFirebase(
        data.paymentImage[0],
        user?.email as string,
        `${data.paymentMethod}_${JSON.stringify(Date.now())}_proof`
      );

      const fileUrl = await Promise.all([proof]);
      return {
        url: await fileUrl,
        success: true,
        message: 'Success Upload File',
      };
    } catch (error) {
      return { url: '', success: false, message: JSON.stringify(error) };
    }
  };
  //#endregion  //*======== Firebase ===========

  //#region  //*=========== API Calls ===========
  const onUpdate: SubmitHandler<EditData> = async (input) => {
    //#region  //*=========== Upload file to firebase ===========
    const resUploadFile = await uploadAllFile(input as EditData);
    if (!resUploadFile?.success) {
      toast.dismiss();
      toast.error(DEFAULT_TOAST_MESSAGE.error);
      toast.error(JSON.stringify(resUploadFile.message));
      return;
    }
    toast.dismiss();
    //#endregion  //*======== Upload file to firebase ===========

    toast.promise(
      axiosClient
        .post('/transaction/create', {
          paymentMethod: input.paymentMethod,
          idStock: data.id,
          purchasedStock: input.purchasedStock,
          paymentImage: resUploadFile.url[0],
        })
        .then(() => {
          mutate();
          router.push('/buyer/riwayat-transaksi');
          closeModal();
        }),
      {
        ...DEFAULT_TOAST_MESSAGE,
        loading: 'Mengupload Data Pesanan',
        success:
          'Berhasil membuat pesanan, Silahkan menyelesaikan pembayaran Anda',
      }
    );
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
        {/* Add Button */}
        <Button variant='ghost' onClick={() => setIsEdit(true)}>
          <span className='inline-flex gap-2'>
            <HiPlus size={16} /> <p>Pesan</p>
          </span>
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
                      Buat Pesanan
                    </Dialog.Title>
                  </div>
                </div>
                <FormProvider {...methods}>
                  <form onSubmit={handleSubmit(onUpdate)} className='mt-8'>
                    <div className='grid grid-cols-2 gap-8'>
                      <div className='h-fit grid grid-cols-2 gap-4 p-4 bg-primary-50 rounded-md shadow-inner'>
                        <div className='space-y-4'>
                          <div>
                            <p className='text-xs tracking-wider text-gray-500 uppercase'>
                              Nama Barang
                            </p>
                            <p>{data.name}</p>
                          </div>
                          <div>
                            <p className='text-xs tracking-wider text-gray-500 uppercase'>
                              Harga/pcs
                            </p>
                            <p>{`Rp ${data.priceStock}`}</p>
                          </div>
                        </div>
                        <ScaleInput
                          step={1}
                          range={{ min: 0, max: data.totalStocks }}
                          unit=''
                          label='Jumlah '
                          id='purchasedStock'
                          type='number'
                          validation={{
                            required: 'Stok harus diisi',
                          }}
                        />
                        <hr className='col-span-2' />
                        <p>Total</p>
                        <p className='px-4 py-2 bg-white rounded-md'>{`Rp ${
                          getValues('purchasedStock') * data.priceStock
                        }`}</p>
                      </div>
                      <div className=''>
                        <div className='grid grid-cols-2 gap-4'>
                          <SelectInput
                            id='category'
                            label='Sumber'
                            validation={{
                              required: 'Jenis Kelamin harus diisi',
                            }}
                          >
                            {paymentMethodOption.map((item, i) => (
                              <option key={item.name} value={i}>
                                {item.name}
                              </option>
                            ))}
                          </SelectInput>
                          <SelectInput
                            id='paymentMethod'
                            label='Metode Pembayaran'
                            validation={{
                              required: 'Jenis Kelamin harus diisi',
                            }}
                          >
                            {paymentMethodOption[
                              +getValues('category')
                            ].options.map((item, i) => (
                              <option key={i} value={item}>
                                {item}
                              </option>
                            ))}
                          </SelectInput>
                        </div>
                        <DropzoneInput
                          label='Bukti Pembayaran'
                          id='paymentImage'
                          accept='image/png, image/jpg, image/jpeg, application/pdf'
                          helperText='File yang dapat diupload berupa .png, .jpg, .jpeg, atau .pdf'
                          validation={{
                            required: 'Bukti Pembayaran harus diupload',
                          }}
                        />
                      </div>
                    </div>

                    <div className='mt-2'></div>
                    <div className='mt-12 sm:flex sm:flex-row-reverse sm:mt-8'>
                      <Button
                        type='submit'
                        className={clsxm(
                          '!font-medium justify-center items-center w-full sm:ml-3 sm:w-auto sm:text-sm'
                        )}
                      >
                        <span className='inline-flex gap-2 items-center'>
                          <HiPlus size={16} /> <p>Pesan</p>
                        </span>
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

export default AddTransactionAction;
