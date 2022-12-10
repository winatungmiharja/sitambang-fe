/* eslint-disable unused-imports/no-unused-vars */
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next';
import { ParsedUrlQuery } from 'querystring';
import * as React from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import axiosClient from '@/lib/axios';
import useLoadingToast from '@/hooks/toast/useLoadingToast';

import Button from '@/components/buttons/Button';
import Input from '@/components/forms/Input';
import PasswordInput from '@/components/forms/PasswordInput';
import withAuth, { WithAuthProps } from '@/components/hoc/withAuth';
import Layout from '@/components/layout/Layout';
import CustomLink from '@/components/links/CustomLink';
import PrimaryLink from '@/components/links/PrimaryLink';
import Logo from '@/components/Logo';
import NextImage from '@/components/NextImage';
import Seo from '@/components/Seo';

import { ROLES } from '@/constant/roles';
import { DEFAULT_TOAST_MESSAGE } from '@/constant/toast';
import useAuthStore from '@/store/useAuthStore';

import { ApiUserDataReturn } from '@/types/api';
import { User } from '@/types/auth';

type LoginData = {
  email: string;
  password: string;
};

type LoginPageProps = InferGetStaticPropsType<typeof getStaticProps> &
  WithAuthProps;

function LoginPage({ role }: LoginPageProps) {
  const roles = ROLES.map((role) => role);
  const isLoading = useLoadingToast();

  //#region  //*=========== Store ===========
  const login = useAuthStore.useLogin();
  //#endregion  //*======== Store ===========

  //#region  //*============== Form
  const methods = useForm<LoginData>({
    mode: 'onTouched',
  });
  const { handleSubmit } = methods;
  //#endregion  //*============== Form

  //#region //*============== Form Submit
  const onSubmit: SubmitHandler<LoginData> = (data) => {
    toast.promise(
      axiosClient
        .post<ApiUserDataReturn<User>>(`/${role}/login`, data)
        .then((res) => {
          const data = res.data.data;
          login(data);
        }),
      {
        ...DEFAULT_TOAST_MESSAGE,
        success: 'Berhasil! Anda bisa masuk ke akun anda',
      }
    );

    return;
  };
  //#endregion //*============== Form Submit

  return (
    <Layout withDashboardShell={false}>
      <Seo templateTitle='Login' />

      <main>
        <div className='flex flex-col-reverse min-h-screen bg-white sm:flex-row'>
          <div className='flex flex-col flex-1 justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
            <div className='mx-auto w-full max-w-sm lg:w-96'>
              <div>
                <Logo />
                <h2 className='mt-6 text-3xl font-extrabold text-gray-900'>
                  Masuk sebagai {role}
                </h2>
                <p className='mt-2 text-sm text-gray-600'>
                  Anda juga bisa masuk sebagai{' '}
                  {roles
                    .filter((r) => r !== role)
                    .map((role, i) => (
                      <React.Fragment key={role}>
                        <CustomLink href={`/login/${role}`}>{role}</CustomLink>
                        {i === 0 && <span> atau </span>}
                      </React.Fragment>
                    ))}
                </p>
              </div>

              <div className='mt-8'>
                <div className='mt-6'>
                  <FormProvider {...methods}>
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className='space-y-6'
                    >
                      <Input
                        id='email'
                        label='Email'
                        validation={{ required: 'Email harus diisi' }}
                      />

                      <PasswordInput
                        id='password'
                        label='Password'
                        validation={{ required: 'Password harus diisi' }}
                      />

                      <div className='flex justify-between items-center'>
                        <div className='text-sm'>
                          <PrimaryLink href='#'>
                            Forgot your password?
                          </PrimaryLink>
                        </div>
                      </div>

                      <div>
                        <Button
                          isLoading={isLoading}
                          className='justify-center w-full'
                          type='submit'
                        >
                          Login
                        </Button>
                      </div>
                    </form>
                  </FormProvider>
                </div>
              </div>
            </div>
          </div>
          <div className='relative flex-1 lg:block'>
            <NextImage
              className='object-cover absolute inset-0 w-full h-full'
              src={`/images/illustration/${role}.svg`}
              layout='fill'
              objectFit='cover'
              alt='login background image'
            />
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default withAuth(LoginPage, 'auth');

interface IParams extends ParsedUrlQuery {
  role: typeof ROLES[number];
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: ROLES.map((role) => ({ params: { role } })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const { role } = params as IParams;
  return {
    props: { role },
  };
};
