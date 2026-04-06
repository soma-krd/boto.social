import { FC, useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import dayjs from 'dayjs';
import { Calendar, TimeInput } from '@mantine/dates';
import clsx from 'clsx';
import { useClickOutside } from '@mantine/hooks';
import { Button } from '@gitroom/react/form/button';
import { isUSCitizen } from './isuscitizen.utils';
import { useT } from '@gitroom/react/translation/get.transation.service.client';
import { newDayjs } from '@gitroom/frontend/components/layout/set.timezone';
import { CalendarIcon } from '@gitroom/frontend/components/ui/icons';
export const DatePicker: FC<{
  date: dayjs.Dayjs;
  onChange: (day: dayjs.Dayjs) => void;
  className?: string;
}> = (props) => {
  const { date, onChange, className } = props;
  const [open, setOpen] = useState(false);
  const t = useT();

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 1025px)');
    const handler = () => setIsMobile(mql.matches);
    handler();
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  const changeShow = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);
  const ref = useClickOutside<HTMLDivElement>(() => {
    if (!isMobile) {
      setOpen(false);
    }
  });
  const changeDate = useCallback(
    (type: 'date' | 'time') => (day: Date) => {
      onChange(
        newDayjs(
          type === 'time'
            ? date.format('YYYY-MM-DD') + ' ' + newDayjs(day).format('HH:mm:ss')
            : newDayjs(day).format('YYYY-MM-DD') + ' ' + date.format('HH:mm:ss')
        )
      );
    },
    [date]
  );

  const calendarContent = (
    <>
      <Calendar
        onChange={changeDate('date')}
        value={date.toDate()}
        dayClassName={(date, modifiers) => {
          if (modifiers.weekend) {
            return '!text-customColor28';
          }
          if (modifiers.outside) {
            return '!text-gray';
          }
          if (modifiers.selected) {
            return '!text-white !bg-seventh !outline-none';
          }
          return '!text-textColor';
        }}
        classNames={{
          day: 'hover:bg-seventh',
          calendarHeaderControl: 'text-textColor hover:bg-third',
          calendarHeaderLevel: 'text-textColor hover:bg-third',
        }}
      />
      <TimeInput
        onChange={changeDate('time')}
        label={t('label_pick_time', 'Pick time')}
        classNames={{
          label: 'text-textColor py-[12px]',
          input:
            'bg-sixth h-[40px] border border-tableBorder text-textColor rounded-[4px] outline-none',
        }}
        defaultValue={date.toDate()}
      />
      <Button className="mt-[12px]" onClick={changeShow}>
        {t('close', 'Close')}
      </Button>
    </>
  );

  return (
    <div
      className={clsx(
        "px-[16px] border border-newTextColor/10 rounded-[8px] justify-center flex gap-[8px] items-center relative h-[44px] text-[15px] font-[600] ml-[7px] select-none flex-1",
        className
      )}
      onClick={changeShow}
      ref={ref}
    >
      <div className="cursor-pointer">
        <CalendarIcon />
      </div>
      <div className="cursor-pointer">
        {date.format(isUSCitizen() ? 'MM/DD/YYYY hh:mm A' : 'DD/MM/YYYY HH:mm')}
      </div>
      {open && !isMobile && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="animate-fadeIn absolute bottom-[100%] mb-[16px] start-[50%] -translate-x-[50%] bg-sixth border border-tableBorder text-textColor rounded-[16px] z-[300] p-[16px] flex flex-col"
        >
          {calendarContent}
        </div>
      )}
      {open && isMobile && createPortal(
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 animate-fadeIn"
          onClick={changeShow}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-sixth border border-tableBorder text-textColor rounded-[16px] p-[16px] flex flex-col max-w-[calc(100vw-32px)] max-h-[calc(100dvh-32px)] overflow-y-auto"
          >
            {calendarContent}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
