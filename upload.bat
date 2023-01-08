@REM # 首先检查文件夹是否存在
@REM ssh root@124.221.154.52 "[ -d /usr/local/vue/moneey ] && echo ok || mkdir -p /usr/local/vue/moneey"
scp -r ./dist/* root@124.221.154.52:/usr/local/vue/moneey