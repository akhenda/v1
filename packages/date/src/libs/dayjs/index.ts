import dayjs from 'dayjs';
import dayjsLocalizedFormat from 'dayjs/plugin/localizedFormat.js';
import dayjsUtc from 'dayjs/plugin/utc.js';

import type { DateFormats } from './types.js';

import 'dayjs/locale/en';
import 'dayjs/locale/sw';

/* Pluging config */
dayjs.extend(dayjsLocalizedFormat);
dayjs.extend(dayjsUtc);

/* Initialization */
export const initDateLocale = (locale: string) => dayjs.locale(locale);
export const getDateLocale = () => dayjs.locale();

/* Formatting */
export const formatDate = ({ date, format }: { date: dayjs.ConfigType; format: DateFormats }) =>
  dayjs.utc(date).format(format);

/* Getters */
export const getDateInfo = ({
  date,
  informationToGet,
}: { date: dayjs.ConfigType; informationToGet: dayjs.UnitType }) =>
  dayjs.utc(date).get(informationToGet);
