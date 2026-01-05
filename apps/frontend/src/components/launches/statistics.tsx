import React, { FC, Fragment, useCallback } from 'react';
import { useModals } from '@gitroom/frontend/components/layout/new-modal';
import useSWR from 'swr';
import { useFetch } from '@gitroom/helpers/utils/custom.fetch';
import { useT } from '@gitroom/react/translation/get.transation.service.client';
import dayjs from 'dayjs';

export const StatisticsModal: FC<{
  postId: string;
}> = (props) => {
  const { postId } = props;
  const modals = useModals();
  const t = useT();
  const fetch = useFetch();
  const loadStatistics = useCallback(async () => {
    return (await fetch(`/posts/${postId}/statistics`)).json();
  }, [postId]);
  const closeAll = useCallback(() => {
    modals.closeAll();
  }, []);
  const { data, isLoading } = useSWR(
    `/posts/${postId}/statistics`,
    loadStatistics
  );

  const hasClicks = data?.clicks?.length > 0;
  const hasEngagement = data?.engagement !== null;
  const hasResults = hasClicks || hasEngagement;

  return (
    <div className="relative">
      {isLoading ? (
        <div>{t('loading', 'Loading')}</div>
      ) : (
        <>
          {!hasResults ? (
            'No Results'
          ) : (
            <div className="space-y-6">
              {/* Facebook Engagement Section */}
              {hasEngagement && (
                <div>
                  <h3 className="text-lg font-semibold mb-3 capitalize">
                    {data.provider} {t('engagement', 'Engagement')}
                  </h3>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="bg-forth rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold">
                        {data.engagement.reactions?.total || 0}
                      </div>
                      <div className="text-sm text-gray-400">
                        {t('reactions', 'Reactions')}
                      </div>
                    </div>
                    <div className="bg-forth rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold">
                        {data.engagement.comments?.total || 0}
                      </div>
                      <div className="text-sm text-gray-400">
                        {t('comments', 'Comments')}
                      </div>
                    </div>
                    <div className="bg-forth rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold">
                        {data.engagement.shares?.count || 0}
                      </div>
                      <div className="text-sm text-gray-400">
                        {t('shares', 'Shares')}
                      </div>
                    </div>
                  </div>

                  {/* Recent Comments */}
                  {data.engagement.comments?.data?.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2 text-gray-400">
                        {t('recent_comments', 'Recent Comments')}
                      </h4>
                      <div className="space-y-2 max-h-[200px] overflow-y-auto">
                        {data.engagement.comments.data.map(
                          (comment: any, idx: number) => (
                            <div
                              key={idx}
                              className="bg-customColor6 rounded-lg p-3"
                            >
                              <div className="flex justify-between items-start mb-1">
                                <span className="font-medium text-sm">
                                  {comment.from?.name || 'Unknown'}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {dayjs(comment.created_time).format(
                                    'MMM D, YYYY h:mm A'
                                  )}
                                </span>
                              </div>
                              <p className="text-sm text-gray-300">
                                {comment.message}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Link Clicks Section */}
              {hasClicks && (
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    {t('link_clicks', 'Link Clicks')}
                  </h3>
                  <div className="grid grid-cols-3">
                    <div className="bg-forth p-[4px] rounded-tl-lg">
                      {t('short_link', 'Short Link')}
                    </div>
                    <div className="bg-forth p-[4px]">
                      {t('original_link', 'Original Link')}
                    </div>
                    <div className="bg-forth p-[4px] rounded-tr-lg">
                      {t('clicks', 'Clicks')}
                    </div>
                    {data.clicks.map((p: any) => (
                      <Fragment key={p.short}>
                        <div className="p-[4px] py-[10px] bg-customColor6">
                          {p.short}
                        </div>
                        <div className="p-[4px] py-[10px] bg-customColor6">
                          {p.original}
                        </div>
                        <div className="p-[4px] py-[10px] bg-customColor6">
                          {p.clicks}
                        </div>
                      </Fragment>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};
