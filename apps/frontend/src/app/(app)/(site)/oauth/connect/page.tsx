import { OauthConnect } from '@gitroom/frontend/components/layout/oauth-connect.component';
export const dynamic = 'force-dynamic';

export default async function Index(props: {
  searchParams: Promise<{
    callback?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  return (
    <OauthConnect callback={searchParams.callback ?? ''} />
  );
}
