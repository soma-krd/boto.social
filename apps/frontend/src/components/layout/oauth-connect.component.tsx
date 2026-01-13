'use client';

import { useT } from '@gitroom/react/translation/get.transation.service.client';
import Image from 'next/image';
import { FC, Ref, useEffect } from 'react';
import { Button } from '../../../../../libraries/react-shared-libraries/src/form/button';
import { useUser } from './user.context';
import { useRouter } from 'next/navigation';
export const OauthConnect: FC<{
  getRef?: Ref<any>;
  callback: string;
}> = (props) => {
  const user = useUser();
  const t = useT();
  const router = useRouter()

  useEffect(()=>{
    if(props.callback?.length === 0){
      router.replace('/launches')
    }
  }, [])


  return (
    <div className="bg-newBgColorInner p-[20px] flex flex-1 flex-col gap-[15px] transition-all items-center justify-center">
      <div>
        <Image alt="oauth-connect" src="/boto.svg" width={100} height={100} />
      </div>
      <div className="text-[48px]">
        {t('grant_access_title', 'Do you want allow to access to your profile?')}
      </div>

      <div className="flex gap-[10px] mt-[20px]">
        <Button
          className="flex-2 bg-green-800"
          onClick={() =>
            (window.location.href = `${props.callback}?accessToken=${user.publicApi}`)
          }
        >
          {t('grant_access', { defaultValue: 'Grant Access' })}
        </Button>
        <Button
          className="flex-2 bg-red-800"
          onClick={() => (window.location.href = `${props.callback}`)}
        >
          {t('deny_access', { defaultValue: 'Deny Access' })}
        </Button>
      </div>
    </div>
  );
};
