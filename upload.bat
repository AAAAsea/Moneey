@REM # 首先检查文件夹是否存在
ssh root@124.221.154.52 "[ -d /usr/local/vue/moneey ] && echo ok || mkdir -p /usr/local/vue/moneey"
scp -r ./dist/* root@124.222.44.34:/usr/local/vue/new_moneey