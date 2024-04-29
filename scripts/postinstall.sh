# 환경 변수 제거
unset TIPTAP_PRO_TOKEN

# typegen
pnpm run typegen

# .npmrc 파일에 환경 변수 설정
echo "legacy-peer-deps=true" > .npmrc

# 종료
exit 0