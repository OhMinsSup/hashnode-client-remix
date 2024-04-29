# 환경 변수 제거
unset TIPTAP_PRO_TOKEN

# typegen
pnpm run typegen

# .npmrc 제거
rm -f .npmrc

# 종료
exit 0