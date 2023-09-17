import * as echarts from 'echarts';
import darkTheme from '@/themes/dark.json';
import vintageTheme from '@/themes/vintage.json';

echarts.registerTheme('dark2', darkTheme);
echarts.registerTheme('vintage', vintageTheme);

export default echarts;
