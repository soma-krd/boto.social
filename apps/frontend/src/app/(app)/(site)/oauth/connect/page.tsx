import { OauthConnect } from '@gitroom/frontend/components/layout/oauth-connect.component';
export const dynamic = 'force-dynamic';

export default async function Index({
  searchParams,
}: {
  searchParams: {
    callback: string;
  };
}) {
  return <OauthConnect callback={searchParams.callback} />;
}
