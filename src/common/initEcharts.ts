import * as echarts from 'echarts';
import darkTheme from '@/themes/dark.json';
import vintageTheme from '@/themes/vintage.json';

echarts.registerTheme('vintage', vintageTheme);
echarts.registerTheme('dark', darkTheme);

export default echarts;
